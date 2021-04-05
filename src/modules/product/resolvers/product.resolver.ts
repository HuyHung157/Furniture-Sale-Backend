import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { BaseResponseDto } from 'src/infrastructure/models/base-response.dto';
import { Product } from '../models/product.entity'
import { ProductService } from '../services/product.service'

@Resolver((of) => Product)
export class ProductResolver {
	constructor(private readonly productService: ProductService) { }

	
	@Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

	// @Query(() => ItemListResponseDto)
	// async getItems(
	// 	@Args('input') input: ItemListRequestDto
	// ): Promise<ItemListResponseDto> {
	// 	const result = await this.productService.getItems(input)
	// 	return {
	// 		totalItems: result.count,
	// 		items: result.items,
	// 	}
	// }

	// @Query(() => ItemResponseDto)
	// async getItemById(@Args('id') id: string) {
	// 	return this.productService.getItemById(id)
	// }

	// @Mutation(() => ItemResponseDto)
	// async createItem(@Args('data') data: inputItem) {
	// 	return this.productService.createItem(data)
	// }

	// @Mutation(() => BaseResponseDto)
	// async updateItem(@Args('input') input: inputUpdateItem) {
	// 	return this.productService.updateItem(input)
	// }

	@Mutation(() => BaseResponseDto)
	async deleteItem(@Args('id') id: string) {
		return this.productService.deleteItem(id)
	}


}