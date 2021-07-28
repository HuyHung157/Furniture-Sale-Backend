import { ObjectType, Field } from "@nestjs/graphql";
import { BaseDto } from "src/infrastructure/models/base.dto";
import { ProductCategoryResponseDto } from "./product-home-response";

@ObjectType('CategoryProductResponseType')
export class CategoryProductResponseDto extends BaseDto {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  index?: number;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  pictureUrl?: string;

  @Field({ nullable: true })
  iconFa?: string;

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

  @Field({ nullable: true })
  indexHome?: number;

  @Field({ nullable: true })
  isShowHome?: boolean;

  @Field(() => [ProductCategoryResponseDto], { nullable: true })
  products?:  ProductCategoryResponseDto[];
}
