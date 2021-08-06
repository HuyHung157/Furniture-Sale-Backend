import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType('CityResponseType')
export class CityResponseDto {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  nameWithType?: string;

  @Field({ nullable: true })
  code?: string;
}
