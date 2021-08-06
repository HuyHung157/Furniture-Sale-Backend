import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType('WardResponseType')
export class WardResponseDto {
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

  @Field({ nullable: true })
  path?: string;


  @Field({ nullable: true })
  pathWithType?: string;

  @Field({ nullable: true })
  parentCode?: string;
}
