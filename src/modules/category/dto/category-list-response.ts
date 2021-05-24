import { ObjectType } from "@nestjs/graphql";
import { BaseListResponse } from "src/infrastructure/models/base-list-response.dto";
import { CategoryResponseDto } from "./category-item-response";

@ObjectType('CategoryListResponseType')
export class CategoryListResponseDto extends BaseListResponse(CategoryResponseDto) { }