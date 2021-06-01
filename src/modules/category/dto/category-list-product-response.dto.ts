import { CategoryResponseDto } from '@modules/category/dto/category-item-response';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('CategoryListProductResponseType')
export class CategoryListProductResponseDto {
  @Field()
  id?: string;

  @Field(() => CategoryResponseDto)
  category: CategoryResponseDto;
}
