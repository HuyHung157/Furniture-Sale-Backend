import { ObjectType } from "@nestjs/graphql";
import { BaseListResponse } from "src/infrastructure/models/base-list-response.dto";
import { DistrictResponseDto } from "./district.response";

@ObjectType('DistrictListResponseType')
export class DistrictListResponseDto extends BaseListResponse(DistrictResponseDto) { }