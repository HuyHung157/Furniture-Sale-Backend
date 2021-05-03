import { InputType, Field } from "@nestjs/graphql";
import { BaseSearchRequestDto } from "src/infrastructure/models/search/base-search-request";

@InputType('CategoryListRequestType')
export class CategoryRequestDto extends BaseSearchRequestDto {

  // @Field(() => [String], { nullable: true })
  // categoryIds: string[];
}