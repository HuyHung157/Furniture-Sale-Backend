import { InputType, Field } from "@nestjs/graphql";

@InputType('ProductCreateRequestType')
export class ProductCreateRequestDto {
  @Field()
  name: string;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  index?: number;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  referencePrice?: number;

  @Field({ nullable: true })
  discount?: number;

  @Field({ nullable: true })
  size?: string;

  @Field({ nullable: true })
  color?: string;

  @Field({ nullable: true })
  pictureUrl: string;

  @Field(() => [String], { nullable: true })
  categoryIds?: string[];
}
