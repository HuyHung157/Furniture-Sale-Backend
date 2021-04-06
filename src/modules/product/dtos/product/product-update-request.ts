import { InputType, Field } from "@nestjs/graphql";
import { IsUUID } from 'class-validator';

@InputType('ProductUpdateRequestType')
export class ProductUpdateRequestDto {
  @Field()
  @IsUUID()
  id: string;

  @Field()
  name: string;

  @Field()
  type: string;

  @Field({ nullable: true })
  index: number;
}
