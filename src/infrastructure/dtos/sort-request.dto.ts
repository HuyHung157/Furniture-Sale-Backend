import { Field, InputType } from '@nestjs/graphql';
import { SortDirectionEnum } from '../enums/sort-direction.enum';

@InputType('SortRequestType')
export class SortRequestDto {
  @Field()
  key: string;

  @Field(() => SortDirectionEnum)
  direction: SortDirectionEnum;
}
