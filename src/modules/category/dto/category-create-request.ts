import { InputType, Field } from "@nestjs/graphql";

@InputType('CategoryCreateRequestType')
export class CategoryCreateRequestDto {
  @Field()
  name: string;

  @Field({ nullable: true })
  type?: string;

  @Field()
  index: number;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  pictureUrl?: string;

  @Field({ nullable: true })
  iconFa?: string;

  @Field({ nullable: true })
  isActive?: boolean;

  @Field({ nullable: true })
  indexHome?: number;

  @Field({ nullable: true })
  isShowHome?: boolean;
}