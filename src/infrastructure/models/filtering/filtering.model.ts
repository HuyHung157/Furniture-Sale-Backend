import { Field, InputType } from '@nestjs/graphql';
import { ComparisonOperator } from '../../enums/comparison.operator.enum';

@InputType('FilteringInput')
export class Filtering {
  @Field()
  public field: string;

  @Field(type => ComparisonOperator)
  public operator: ComparisonOperator;

  @Field(type => Object)
  public value: any;

  constructor(field: string, operator: ComparisonOperator, value: any) {
    this.field = field;
    this.operator = operator;
    this.value = value;
  }
}
