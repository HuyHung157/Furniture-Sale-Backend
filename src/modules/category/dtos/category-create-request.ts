import { InputType, Field } from "@nestjs/graphql";

@InputType('CategoryCreateRequestType')
export class CategoryCreateRequestDto{
  @Field()
  name: string;

  @Field({})
  type: string;
}