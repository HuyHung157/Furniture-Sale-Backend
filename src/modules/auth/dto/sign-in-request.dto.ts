import { Field, InputType } from '@nestjs/graphql';

@InputType('SignInRequestType')
export class SignInRequestDto {
  @Field()
  email: string;

  @Field()
  password: string;
}
