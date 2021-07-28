import { BaseListResponse } from "@infrastructure/models/base-list-response.dto";
import { ObjectType } from "@nestjs/graphql";
import { UserResponseDto } from "./user-response";

@ObjectType('UserListResponseType')
export class UserListResponseDto extends BaseListResponse(UserResponseDto){}