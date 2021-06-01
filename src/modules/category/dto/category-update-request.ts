import { Field, InputType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";

@InputType('CategoryUpdateRequestType')
export class CategoryUpdateRequestDto{
  @Field()
  @IsUUID()
  id: string;

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
}