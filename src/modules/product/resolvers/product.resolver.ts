import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { BaseResponseDto } from 'src/infrastructure/models/base-response.dto';
import { ProductService } from '../services/product.service'
import { ProductCreateRequestDto } from '../dtos/product-create-respest';
import { ProductListRequestDto } from '../dtos/product-list-request';
import { ProductListResponseDto } from '../dtos/product-list-response';
import { ProductResponseDto } from '../dtos/product-item-response';
import { ProductUpdateRequestDto } from '../dtos/product-update-request';

@Resolver()
export class ProductResolver {
	constructor(private readonly productService: ProductService) { }

	@Query(() => ProductListResponseDto)
	async getProductList(
		@Args('input') input: ProductListRequestDto
	): Promise<ProductListResponseDto> {
		const result = await this.productService.getProductList(input)
		return {
			totalItems: result.count,
			items: result.items,
		}
	}

	@Query(() => ProductResponseDto)
	async getProductById(@Args('id') id: string) {
		return this.productService.getProductById(id)
	}

	@Mutation(() => ProductResponseDto)
	async createProduct(@Args('input') input: ProductCreateRequestDto) {
		return this.productService.createProduct(input)
	}

	@Mutation(() => BaseResponseDto)
	async updateProduct(@Args('input') input: ProductUpdateRequestDto) {
		return this.productService.updateProduct(input)
	}

	@Mutation(() => BaseResponseDto)
	async deleteProduct(@Args('id') id: string) {
		return this.productService.deleteProduct(id)
	}


}