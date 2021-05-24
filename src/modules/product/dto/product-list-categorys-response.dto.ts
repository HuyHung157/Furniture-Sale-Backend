import { CategoryResponseDto } from '@modules/category/dto/category-item-response';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('CategoryListItemResponseType')
export class CategoryListItemResponseDto {
  @Field()
  id?: string;

  @Field(() => CategoryResponseDto)
  category: CategoryResponseDto;
}
