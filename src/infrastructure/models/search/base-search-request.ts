import { Field, InputType } from '@nestjs/graphql';
import { Paging } from '../paging/paging.model';
import { Sorting } from '../sorting/sorting.model';

@InputType('BaseSearchInput')
export class BaseSearchRequestDto {
  @Field({ nullable: true })
  keyword?: string;

  @Field(() => Paging)
  paging: Paging;

  @Field(() => Sorting, { nullable: true })
  sorting?: Sorting;
}
