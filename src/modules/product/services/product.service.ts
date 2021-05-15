import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseResponseDto } from "src/infrastructure/models/base-response.dto";
import { BaseService } from "src/infrastructure/services/base.service";
import { Connection, EntityManager, QueryRunner, Repository } from "typeorm";
import { Product } from "../models/product.entity";
import { ProductListRequestDto } from "../dto/product-list-request";
import { ProductResponseDto } from "../dto/product-item-response";
import { ProductCreateRequestDto } from "../dto/product-create-resquest";
import { ProductUpdateRequestDto } from "../dto/product-update-request";
import { CategoryService } from "src/modules/category/services/category.service";
import { ProductCategory } from "src/modules/category/models/product-category";

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
			.take(input.paging.pageSize)
			.skip(input.paging.pageSize * Math.max(0, input.paging.pageIndex - 1));

		if (input.sorting) {
			query.addOrderBy(
				`product.${input.sorting.sortFieldName}`,
				this.getOrder(input.sorting.descending)
			);
		}

		const [items, count] = await query.getManyAndCount();
		return { items, count };
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
			.where('product.id = :id', {
				id: id,
			})
			.andWhere('categories.isActive = true')
			.andWhere('product.isActive = true')
			.andWhere('product.isArchived = false');
		const result = await query.getOne();
		return result;
	}

	async createProduct(input: ProductCreateRequestDto): Promise<BaseResponseDto> {
		// const item = new Product();

		// const isCategoriesExist = await this.categoryService.isCategoriesExist(input.categoryIds);
		// console.log(isCategoriesExist);
		// if (!isCategoriesExist) {
		//   throw new NotFoundException('Categories not found');
		// }

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

	async updateProduct(input: ProductUpdateRequestDto): Promise<BaseResponseDto> {
		const item = await this.getProductById(input.id)
		Object.assign(item, input)
		await this.productRepository.save(item);
		return new BaseResponseDto('Updated success !', 200);
	}

	async deleteProduct(id: string) {
		return this.performActionInTransaction(async (queryRunner) => {
			const manager = queryRunner.manager;
			const archivedPartialEntity = {
				isActive: false,
				isArchived: true,
			}
			await manager.update(Product, { id }, archivedPartialEntity);

		})
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
		categoriesId: string[],
		itemId: string,
		createById?: string,
	) {
		if (categoriesId) {
			const isCategoriesExist = await this.categoryService.isCategoriesExist(categoriesId);
			if (!isCategoriesExist) {
				throw new NotFoundException({
					message: 'Categories not found',
					code: 'CATEGORIES_NOT_FOUND'
				});
			}
		}

		if (categoriesId && categoriesId.length > 0) {
			const inputs = categoriesId.map(categoryId => ({
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