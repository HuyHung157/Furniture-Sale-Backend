import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export abstract class BaseDto {
  @Field(() => ID)
  id: string;
}
