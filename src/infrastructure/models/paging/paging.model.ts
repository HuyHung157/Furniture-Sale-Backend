import { Field, InputType, Int } from '@nestjs/graphql';
import { DbConstant } from '../../constants/db.constant';

@InputType('PagingInput')
export class Paging {
  @Field(type => Int)
  public pageIndex: number;

  @Field(type => Int)
  public pageSize: number;

  @Field()
  public notLoadCount: boolean;

  @Field(type => Int)
  public numberPageToLoad: number;

  constructor(
    pageIndex: number = DbConstant.FIRST_PAGE,
    pageSize: number = DbConstant.RECORD_PER_PAGE,
    notLoadCount = false,
    numberPageToLoad: number = null,
  ) {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.notLoadCount = notLoadCount;
    this.numberPageToLoad = numberPageToLoad;
  }
}
