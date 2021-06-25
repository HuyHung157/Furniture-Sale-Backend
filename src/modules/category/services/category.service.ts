import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserInputError } from "apollo-server-errors";
import { BaseResponseDto } from "src/infrastructure/models/base-response.dto";
import { BaseSearchRequestDto } from "src/infrastructure/models/search/base-search-request";
import { BaseService } from "src/infrastructure/services/base.service";
import { Connection, Repository, SelectQueryBuilder } from "typeorm";
import { Category } from "../models/category.entity";

@Injectable()
export class CategoryService extends BaseService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    protected readonly connection: Connection,
  ) {
    super(connection);
  }

  public async isCategoriesExist(categoriesId: string[]) {
    const categoriesCount = await this.categoryRepository
      .createQueryBuilder('category')
      .andWhere('category.isActive = TRUE')
      .andWhere('category.isArchived = FALSE')
      .andWhere('category.id IN (:...ids)', {
        ids: categoriesId,
      })
      .getCount();
    return categoriesCount > 0;;
  }

  public async createCategory(input) {
    if (input.index) {
      const queryCategory = await this.categoryRepository.createQueryBuilder('category');

      const data = await this.formatDataWithIndexFieldName(input, queryCategory, 'index');
      if (input.indexHome) {
        await this.categoryRepository.save(data);
        const dataIndexHome = await this.formatDataWithIndexFieldName(input, queryCategory, 'indexHome');
        const query = await this.categoryRepository.save(dataIndexHome);
        return query;
      }
      const query = await this.categoryRepository.save(data);
      return query;

    } else {
      const query = await this.categoryRepository.save(input);
      return query;
    }
  }

  public async getListCategory(input: BaseSearchRequestDto = undefined) {
    const query = this.categoryRepository
      .createQueryBuilder('category')
      .where('category.isActive = true')
      .andWhere('category.isArchived = false')
      .orderBy('category.index', 'ASC');

    if (input && input.paging) {
      query
        .take(input.paging.pageSize)
        .skip(input.paging.pageSize * Math.max(0, input.paging.pageIndex - 1));
    }

    if (input?.sorting) {
      query.
        addOrderBy(
          `category.${input.sorting.sortFieldName}`,
          this.getOrder(input.sorting.descending)
        )
    }

    const [items, count] = await query.getManyAndCount();
    return {
      totalItems: count,
      items,
    };
  }


  public async getListCategoryShowHome() {
    const queryCategoryHome = this.categoryRepository
    .createQueryBuilder('category')
    .where('category.isShowHome = true')
    .andWhere('category.indexHome >= 0')
    .andWhere('category.isActive = true')
    .andWhere('category.isArchived = false')
    .orderBy('category.indexHome', 'ASC')
    .leftJoinAndSelect(
      'category.products',
      'products',
      'products.isArchived = false AND products.isActive = true',
    )
    .leftJoinAndSelect( 'products.product', 'product')
    .addOrderBy('product.index', 'ASC')
    .addOrderBy('product.createdAt', 'ASC');
    
    const [items, count] = await queryCategoryHome.getManyAndCount();
    return {
      totalItems: count,
      items,
    };
  }

  public async getCategoryById(id: string) {
    const query = this.categoryRepository
      .createQueryBuilder('category')
      .where('category.id = :id', { id: id })
      .andWhere('category.isActive = true')
      .andWhere('category.isArchived = false');
    const result = await query.getOne();
    return result;
  }


  public async deleteCategory(id: string) {
    const query = await this.categoryRepository.update(id, {
      isArchived: true,
      isActive: false,
    });
    return query;
  }

  public async updateCategory(input) {
    const queryCategory = this.categoryRepository.createQueryBuilder('category')
    let category = await queryCategory
      .where('category.id = :id', { id: input.id })
      .andWhere('category.isActive = true')
      .andWhere('category.isArchived = false')
      .getOne();

    if (!category.id) {
      return new UserInputError('Category not found');
    }
    if (!input.index || input.index === Number(category.index)
      && !input.indexHome || input.indexHome === Number(category.indexHome)) {
      const query = await this.categoryRepository.save(input);
      return query;
    }

    const data = await this.formatDataWithIndexFieldName(input, queryCategory, 'index', category);
    if (input.indexHome || input.indexHome !== Number(category.indexHome)) {
      await this.categoryRepository.save(data);
      const dataIndexHome = await this.formatDataWithIndexFieldName(input, queryCategory, 'indexHome', category);
      const query = await this.categoryRepository.save(dataIndexHome);
      return query;
    }
    const query = await this.categoryRepository.save(data);
    return query;
  }

  private getOrder(desc: boolean) {
    return desc ? 'DESC' : 'ASC';
  }

  private async formatDataWithIndexFieldName(input, queryCategory: SelectQueryBuilder<Category>, indexFieldName = 'index', category?) {
    let res;
    let isIncrease = true;

    if (category) {

      if (category[indexFieldName] < input[indexFieldName]) {
        // index old lower than index new => Decrease the elements between them 
        isIncrease = false;
        res = await queryCategory
          .where(`category.${indexFieldName} <= :indexNew`, { indexNew: Number(input[indexFieldName]) })
          .andWhere(`category.${indexFieldName} > :indexOld`, { indexOld: Number(category[indexFieldName]) })
          .andWhere('category.isActive = true')
          .andWhere('category.isArchived = false')
          .getMany();

      } else {
        // index old lager than index new => Increase the elements between them 
        res = await queryCategory
          .where(`category.${indexFieldName} >= :indexNew`, { indexNew: Number(input[indexFieldName]) })
          .andWhere(`category.${indexFieldName} < :indexOld`, { indexOld: Number(category[indexFieldName]) })
          .andWhere('category.isActive = true')
          .andWhere('category.isArchived = false')
          .getMany();
      }

    } else {
      const category = await queryCategory
        .where(`category.${indexFieldName} > :index`, { index: Number(input[indexFieldName]) })
        .orWhere(`category.${indexFieldName} = :index`, { index: Number(input[indexFieldName]) })
        .andWhere('category.isActive = true')
        .andWhere('category.isArchived = false');

      const res = await category.getMany();
      if (res.length > 0) {
        const data = res.map(element => {
          element[indexFieldName] = Number(element[indexFieldName]) + 1;
          return element;
        });
        data.push(input);
        return data;
      } else {
        return input;
      }
    }

    if (res.length > 0) {
      const data = res.map(element => {
        element[indexFieldName] = isIncrease
          ? Number(element[indexFieldName]) + 1
          : Number(element[indexFieldName]) - 1;
        return element;
      });
      data.push(input);
      return data;
    } else {
      return input;
    }
  }
}