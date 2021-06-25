import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { BaseResponseDto } from 'src/infrastructure/models/base-response.dto';
import { ProductService } from '../services/product.service'
import { ProductCreateRequestDto } from '../dto/product-create-resquest';
import { ProductListRequestDto } from '../dto/product-list-request';
import { ProductListResponseDto } from '../dto/product-list-response';
import { ProductResponseDto } from '../dto/product-item-response';
import { ProductUpdateRequestDto } from '../dto/product-update-request';
import { UserInputError } from 'apollo-server-express';
import { ProductListByCategoryRequestDto } from '../dto/product-list-category-request';

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

  @Query(() => ProductListResponseDto)
  async getListItemByCategory(
    @Args('input') input: ProductListByCategoryRequestDto,
  ): Promise<ProductListResponseDto> {
    const result = await this.productService.getListProductByCategory(input);
    return {
      totalItems: result.totalItems,
      items: result.items
    };
  }

  @Query(() => ProductResponseDto)
  async getProductById(@Args('id') id: string) {
    const result = this.productService.getProductById(id);
    if (!result) {
      throw new UserInputError('Item is not existed!');
    }
    return result;
  }

  @Mutation(() => BaseResponseDto)
  async createProduct(@Args('input') input: ProductCreateRequestDto) {
    return this.productService.createProduct(input)
  }

  @Mutation(() => BaseResponseDto)
  async updateProduct(@Args('input') input: ProductUpdateRequestDto) {
    return this.productService.updateProduct(input)
  }

  @Mutation(() => BaseResponseDto)
  async deleteProduct(@Args('id') id: string): Promise<BaseResponseDto> {
    await this.productService.deleteProduct(id);
    return new BaseResponseDto('Delete success !', 200);
  }
}