import { ObjectType, Field } from "@nestjs/graphql";
import { BaseDto } from "src/infrastructure/models/base.dto";
import { CategoryListItemResponseDto } from "./product-list-categorys-response.dto";

@ObjectType('ProductResponseType')
export class ProductResponseDto extends BaseDto {
  @Field()
  name: string;

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
  pictureUrl: string;

  @Field(() => [CategoryListItemResponseDto], { nullable: true })
  categories?:  CategoryListItemResponseDto[];

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  createdBy?: string;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field({ nullable: true })
  updatedBy?: string;
}
