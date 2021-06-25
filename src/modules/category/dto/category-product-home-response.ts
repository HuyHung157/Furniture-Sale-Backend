import { ObjectType } from "@nestjs/graphql";
import { BaseListResponse } from "src/infrastructure/models/base-list-response.dto";
import { CategoryProductResponseDto } from "./cateogory-item-home.response";

@ObjectType('CategoryProductListResponseType')
export class CategoryProductListResponseDto extends BaseListResponse(CategoryProductResponseDto) { }