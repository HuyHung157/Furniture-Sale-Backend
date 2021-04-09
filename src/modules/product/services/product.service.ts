import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseResponseDto } from "src/infrastructure/models/base-response.dto";
import { BaseService } from "src/infrastructure/services/base.service";
import { Connection, Repository } from "typeorm";
import { Product } from "../models/product.entity";
import { ProductListRequestDto } from "../dtos/product-list-request";
import { ProductResponseDto } from "../dtos/product-item-response";
import { ProductCreateRequestDto } from "../dtos/product-create-resquest";
import { ProductUpdateRequestDto } from "../dtos/product-update-request";

@Injectable()
export class ProductService extends BaseService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    protected readonly connection: Connection,
  ) {
    super(connection);
  }

  async getProductList(input: ProductListRequestDto): Promise<any> {
		const query = this.productRepository
			.createQueryBuilder('item')
			.take(input.paging.pageSize)
			.skip(input.paging.pageSize * Math.max(0, input.paging.pageIndex - 1));

		if (input.sorting) {
			query.addOrderBy(
				`item.${input.sorting.sortFieldName}`,
				this.getOrder(input.sorting.descending)
			);
		}

		const [items, count] = await query.getManyAndCount();
		return { items, count };
	}

	async getProductById(id: string): Promise<ProductResponseDto> {
		return await this.productRepository.findOneOrFail(id);
	}

	async createProduct(input: ProductCreateRequestDto): Promise<BaseResponseDto> {
		const item = new Product()
		item.name = input.name
		item.index = input.index
		item.type = input.type

		await this.productRepository.save(item)
		return new BaseResponseDto('Created success !', 200);
	}

	async updateProduct(input: ProductUpdateRequestDto): Promise<BaseResponseDto> {
		const item = await this.getProductById(input.id)
		Object.assign(item, input)
		await this.productRepository.save(item);
		return new BaseResponseDto('Updated success !', 200);
	}

	async deleteProduct(id: string): Promise<BaseResponseDto> {
		await this.productRepository.delete(id);
		return new BaseResponseDto('Delete success !', 200);
	}

	private getOrder(desc: boolean) {
		return desc ? 'DESC' : 'ASC';
	}
}