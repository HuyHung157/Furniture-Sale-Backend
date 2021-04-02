import { Field, InputType } from '@nestjs/graphql';

@InputType('SortingInput')
export class Sorting {
  @Field()
  public sortFieldName: string;

  @Field()
  public descending: boolean;

  constructor(sortFieldName: string, descending = false) {
    this.sortFieldName = sortFieldName;
    this.descending = descending;
  }
}
