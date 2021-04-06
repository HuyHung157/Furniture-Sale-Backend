import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { BaseResponseDto } from 'src/infrastructure/models/base-response.dto';
import { Product } from '../models/product.entity'
import { ProductService } from '../services/product.service'
import { ProductCreateRequestDto } from '../dtos/product/product-create-respest';
import { ProductUpdateRequestDto } from '../dtos/product/product-update-request';
import { ProductResponseDto } from '../dtos/product/product-item-response';
import { ProductListRequestDto } from '../dtos/product/product-list-request';
import { ProductListResponseDto } from '../dtos/product/product-list-response';

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