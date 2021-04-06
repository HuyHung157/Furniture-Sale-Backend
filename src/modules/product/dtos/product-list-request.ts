import { InputType, Field } from "@nestjs/graphql";
import { BaseSearchRequestDto } from "src/infrastructure/models/search/base-search-request";

@InputType('ProductListRequestType')
export class ProductListRequestDto extends BaseSearchRequestDto {

  // @Field(() => [String], { nullable: true })
  // categoryIds: string[];
}