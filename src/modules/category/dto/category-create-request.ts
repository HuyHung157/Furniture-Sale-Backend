import { InputType, Field } from "@nestjs/graphql";

@InputType('CategoryCreateRequestType')
export class CategoryCreateRequestDto {
  @Field()
  name: string;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  index?: number;

  @Field({ nullable: true })
  description?: string;
}