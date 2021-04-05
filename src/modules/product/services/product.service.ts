import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseResponseDto } from "src/infrastructure/models/base-response.dto";
import { BaseService } from "src/infrastructure/services/base.service";
import { Connection, Repository } from "typeorm";
import { Product } from "../models/product.entity";

@Injectable()
export class ProductService extends BaseService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    protected readonly connection: Connection,
  ) {
    super(connection);
  }

  // async getItems(input: ItemListRequestDto): Promise<any> {
	// 	const query = this.productRepository
	// 		.createQueryBuilder('item')
	// 		.take(input.paging.pageSize)
	// 		.skip(input.paging.pageSize * Math.max(0, input.paging.pageIndex - 1));

	// 	if (input.sorting) {
	// 		query.addOrderBy(
	// 			`item.${input.sorting.sortFieldName}`,
	// 			this.getOrder(input.sorting.descending)
	// 		);
	// 	}

	// 	const [items, count] = await query.getManyAndCount();
	// 	return { items, count };
	// }

	// async getItemById(id: string): Promise<Item> {
	// 	return await this.productRepository.findOneOrFail(id);
	// }

	// async createItem(data: ItemResponseDto): Promise<Item> {
	// 	const item = new Item()
	// 	item.name = data.name
	// 	item.index = data.index
	// 	item.type = data.type

	// 	await this.productRepository.save(item)

	// 	return item
	// }

	// async updateItem(input: inputUpdateItem): Promise<BaseResponseDto> {
	// 	const item = await this.getItemById(input.id)
	// 	Object.assign(item, input)
	// 	await this.productRepository.save(item);
	// 	return new BaseResponseDto('Updated success !', 200);
	// }

	async deleteItem(id: string): Promise<BaseResponseDto> {
		await this.productRepository.delete(id);
		return new BaseResponseDto('Delete success !', 200);
	}

	// private getOrder(desc: boolean) {
	// 	return desc ? 'DESC' : 'ASC';
	// }
}