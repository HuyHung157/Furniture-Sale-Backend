import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('TokenType')
export class TokenDto {
  @Field()
  token: string;

  @Field()
  refreshToken: string;
}
