import { ObjectType } from "@nestjs/graphql";
import { BaseListResponse } from "src/infrastructure/models/base-list-response.dto";
import { ProductResponseDto } from "./product-item-response";

@ObjectType('ProductListResponseType')
export class ProductListResponseDto extends BaseListResponse(ProductResponseDto) { }