import { ProductHomeResponseDto } from '@modules/product/dto/product-item-home-response';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('ProductCategoryResponseType')
export class ProductCategoryResponseDto {
  @Field()
  id?: string;

  @Field(() => ProductHomeResponseDto)
  product: ProductHomeResponseDto;
}
