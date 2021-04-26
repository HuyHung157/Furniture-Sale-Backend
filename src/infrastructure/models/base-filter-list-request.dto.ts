import { Field, InputType } from '@nestjs/graphql';
import { BaseListRequestDto } from './base-list-request.dto';

@InputType('BaseFilterListRequestType', { isAbstract: true })
export class BaseFilterListRequestDto extends BaseListRequestDto {
  @Field({ nullable: true })
  name?: string;
}
