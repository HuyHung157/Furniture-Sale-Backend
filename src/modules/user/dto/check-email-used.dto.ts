import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType('CheckEmailUsedType')
export class CheckEmailUsedDto {
  @Field()
  isEmailUsed: boolean;
}
