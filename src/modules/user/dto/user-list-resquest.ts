import { BaseSearchRequestDto } from "@infrastructure/models/search/base-search-request";
import { InputType } from "@nestjs/graphql";

@InputType('UserListRequestType')
export class UserListRequestDto extends BaseSearchRequestDto{}