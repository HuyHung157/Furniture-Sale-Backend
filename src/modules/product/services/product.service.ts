import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseResponseDto } from "src/infrastructure/models/base-response.dto";
import { BaseService } from "src/infrastructure/services/base.service";
import { Connection, EntityManager, QueryRunner, Repository } from "typeorm";
import { Product } from "../models/product.entity";
import { ProductListRequestDto } from "../dto/product-list-request";
import { ProductResponseDto } from "../dto/product-item-response";
import { ProductCreateRequestDto } from "../dto/product-create-resquest";
import { CategoryService } from "src/modules/category/services/category.service";
import { ProductCategory } from "@modules/category/models/product-category.entity";
import { UserInputError } from "apollo-server-errors";

@Injectable()
export class ProductService extends BaseService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoryService: CategoryService,
    protected readonly connection: Connection,
  ) {
    super(connection);
  }

  async getProductList(input: ProductListRequestDto): Promise<any> {
    const query = this.productRepository
      .createQueryBuilder('product')
      .where('product.isActive = true')
      .andWhere('product.isArchived = false');
    
    if (input.paging) {
      query.take(input.paging.pageSize)
        .skip(input.paging.pageSize * Math.max(0, input.paging.pageIndex - 1));
    }

    if(input.keyword){
      query.andWhere('product.name ilike :key', {key: input.keyword})
    }

    if (input.sorting) {
      query.addOrderBy(
        `product.${input.sorting.sortFieldName}`,
        this.getOrder(input.sorting.descending)
      );
    }else{
      query.orderBy('product.index', 'ASC')
    }

    const [items, count] = await query.getManyAndCount();
    return { items, count };
  }

  public async getListProductByCategory(input) {
    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect(
        'product.categories',
        'categories',
        'categories.isArchived = false AND categories.isActive = true',
      )
      // .leftJoinAndSelect(
      //   'product.pictures',
      //   'pictures',
      //   'pictures.isArchived = false AND pictures.isActive = true',
      // )
      .leftJoinAndSelect('categories.category', 'category')
      .where('categories.category = :id', { id: input.id })
      .andWhere('categories.isActive = true')
      .andWhere('product.isActive = true')
      .andWhere('product.isArchived = false')
      .take(input.paging.pageSize)
      .skip(input.paging.pageSize * Math.max(0, input.paging.pageIndex - 1))
      .orderBy('product.index', 'ASC');

    const totalItems = await query.getCount();
    const items = await query.getMany();
    return {
      items,
      totalItems,
    };
  }

  async getProductById(id: string): Promise<ProductResponseDto> {
    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect(
        'product.categories',
        'categories',
        'categories.isArchived = false',
      )
      .leftJoinAndSelect('categories.category', 'category')
      .where('product.id = :id', { id: id, })
      .andWhere('categories.isActive = true')
      .andWhere('product.isActive = true')
      .andWhere('product.isArchived = false');
    const result = await query.getOne();
    return result;
  }

  async createProduct(input: ProductCreateRequestDto): Promise<BaseResponseDto> {
    let createdItem = undefined;
    const createItemHandler = async (queryRunner: QueryRunner) => {
      const manager = queryRunner.manager;
      createdItem = await manager.save(Product, input);

      await this.internalCreateItemRelationInfo(
        manager,
        input,
        createdItem.id,
        // user.id,
        //TODO create User Auth
      );
    };
    await this.performActionInTransaction(createItemHandler);
    return new BaseResponseDto('Created success !', 200);
  }

  async updateProduct(input): Promise<BaseResponseDto> {
    const a = input;
    if (input.index) {
      const query = await this.productRepository
        .createQueryBuilder('product')
        .where('product.index >= :currentIndex', { currentIndex: input.index })
        .andWhere('product.isActive = true')
        .andWhere('product.isArchived = false')

      const product = query.getMany();
    }

    const item = await this.getProductById(input.id)
    if (!item.id) {
      return new UserInputError('product not found');
    }

    const handler = async (queryRunner: QueryRunner) => {
      const manager = queryRunner.manager;
      const categories = input.categoryIds;
      delete input.categoryIds;

      if (!input.index || item.index === input.index) {
        await manager.save(Product, input);
      }
      //TODO create and update product with index (order)

      if (categories) {
        const categoriesOld = item.categories.map(e => {
          if (categories.includes(e.category.id)) {
            categories.splice(categories.indexOf(e.category.id), 1);
            return {
              id: e.id,
              isArchived: false,
              // updatedBy: user.id,
            };
          } else {
            return {
              id: e.id,
              isArchived: true,
              // updatedBy: user.id,
            };
          }
        });

        const newCategory = categories.map(e => {
          return {
            product: input.id,
            category: e,
          };
        });

        const inputCategories = categoriesOld.concat(newCategory);
        await manager.save(ProductCategory, inputCategories);
      }

    };
    await this.performActionInTransaction(handler);
    return new BaseResponseDto('Updated success !', 200);
  }

  async deleteProduct(id: string) {
    const handler = async (queryRunner) => {
      const manager = queryRunner.manager;
      const archivedPartialEntity = {
        isActive: false,
        isArchived: true,
      }
      await manager.update(Product, { id }, archivedPartialEntity);

    };
    return this.performActionInTransaction(handler)
  }

  private async internalCreateItemRelationInfo(
    manager: EntityManager,
    input: ProductCreateRequestDto,
    itemId: string,
    createById?: string,
  ) {
    await this.internalCreateItemCategories(
      manager,
      input.categoryIds,
      itemId,
      createById,
    );

    // const inputItemPictures = input.pictureUrls.map(picture => ({
    //   pictureUrl: picture.pictureUrl,
    //   itemId: itemId,
    // }));
    // await this.internalCreateItemPictures(manager, inputItemPictures);
    // await this.internalCreateShopItems(manager, itemId);
  }

  private async internalCreateItemCategories(
    manager: EntityManager,
    categories: string[],
    itemId: string,
    createById?: string,
  ) {
    if (categories) {
      const isCategoriesExist = await this.categoryService.isCategoriesExist(categories);
      if (!isCategoriesExist) {
        throw new NotFoundException({
          message: 'Categories not found',
          code: 'CATEGORIES_NOT_FOUND'
        });
      }
    }

    if (categories && categories.length > 0) {
      const inputs = categories.map(categoryId => ({
        product: { id: itemId },
        createBy: createById,
        category: { id: categoryId },
      }));
      await manager.save(ProductCategory, inputs);
    }
  }


  private getOrder(desc: boolean) {
    return desc ? 'DESC' : 'ASC';
  }
}