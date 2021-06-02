import { ObjectType, Field } from "@nestjs/graphql";
import { BaseDto } from "src/infrastructure/models/base.dto";
import { CategoryListProductResponseDto } from "../../category/dto/category-list-product-response.dto";

@ObjectType('ProductResponseType')
export class ProductResponseDto extends BaseDto {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  index?: number;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  referencePrice?: number;

  @Field({ nullable: true })
  discount?: number;

  @Field({ nullable: true })
  size?: string;

  @Field({ nullable: true })
  color?: string;

  @Field({ nullable: true })
  pictureUrl?: string;

  @Field(() => [CategoryListProductResponseDto], { nullable: true })
  categories?:  CategoryListProductResponseDto[];

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  createdBy?: string;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field({ nullable: true })
  updatedBy?: string;

  @Field({ nullable: true })
  isActive?: boolean;
}
