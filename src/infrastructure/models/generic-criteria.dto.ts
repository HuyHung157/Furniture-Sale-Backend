import { Field, InputType } from '@nestjs/graphql';
import { Filtering } from './filtering/filtering.model';
import { Paging } from './paging/paging.model';
import { Sorting } from './sorting/sorting.model';

@InputType('GenericCriteriaInput')
export class GenericCriteriaDto {
  @Field(type => [Filtering], { nullable: true })
  filterings?: Filtering[];

  @Field(type => [Sorting], { nullable: true })
  sortings?: Sorting[];

  @Field(type => Paging, { nullable: true })
  paging?: Paging;
}
