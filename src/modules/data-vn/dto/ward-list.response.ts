import { ObjectType } from "@nestjs/graphql";
import { BaseListResponse } from "src/infrastructure/models/base-list-response.dto";
import { WardResponseDto } from "./ward.response";

@ObjectType('WardListResponseType')
export class WardListResponseDto extends BaseListResponse(WardResponseDto) { }