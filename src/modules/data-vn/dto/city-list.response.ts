import { ObjectType } from "@nestjs/graphql";
import { BaseListResponse } from "src/infrastructure/models/base-list-response.dto";
import { CityResponseDto } from "./city.response";

@ObjectType('CityListResponseType')
export class CityListResponseDto extends BaseListResponse(CityResponseDto) { }