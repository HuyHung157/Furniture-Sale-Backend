import { Field, InputType } from '@nestjs/graphql';
import { Paging } from '@infrastructure/models/paging/paging.model';

@InputType('ProductListByCategoryType')
export class ProductListByCategoryRequestDto {
  @Field()
  id: string;

  @Field(() => Paging)
  paging: Paging;
}
