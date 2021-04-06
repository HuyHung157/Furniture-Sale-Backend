import { ObjectType, Field } from "@nestjs/graphql";
import { BaseDto } from "src/infrastructure/models/base.dto";

@ObjectType('ProductResponseType')
export class ProductResponseDto extends BaseDto {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  index?: number;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  createdBy?: string;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field({ nullable: true })
  updatedBy?: string;
}
