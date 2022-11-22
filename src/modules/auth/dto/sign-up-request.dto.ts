import { Field, InputType } from '@nestjs/graphql';
import { Matches } from 'class-validator';
import { CommonConstants } from '../../../infrastructure/constants/common.constants';

@InputType('SignUpRequestType')
export class SignUpRequestDto {
  @Field()
  password: string;

  @Field()
  @Matches(CommonConstants.EMAIL_REGEX)
  email: string;

  @Field()
  phoneNumber: string;

  @Field()
  phoneNumberPrefix: string;
}
