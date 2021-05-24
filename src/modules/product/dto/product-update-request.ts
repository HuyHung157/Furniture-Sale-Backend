import { InputType, Field } from "@nestjs/graphql";
import { IsUUID } from 'class-validator';

@InputType('ProductUpdateRequestType')
export class ProductUpdateRequestDto {
  @Field()
  @IsUUID()
  id: string;

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

  @Field({ nullable: true })
  isActive?: boolean;

  @Field(() => [String])
  categoryIds?: string[];
  
}
