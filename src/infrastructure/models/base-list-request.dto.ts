import { Field, InputType } from '@nestjs/graphql';
import { Paging } from './paging/paging.model';

@InputType('BaseListRequestType', { isAbstract: true })
export class BaseListRequestDto {
  @Field(() => Paging)
  paging: Paging;
}
