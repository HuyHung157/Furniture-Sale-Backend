import { InputType, Field } from "@nestjs/graphql";

@InputType('ProductCreateRequestType')
export class ProductCreateRequestDto {
  @Field()
  name: string;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  index?: number;
}
