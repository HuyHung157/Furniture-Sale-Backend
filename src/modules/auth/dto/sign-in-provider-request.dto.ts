import { Field, InputType } from '@nestjs/graphql';
import { Matches, MaxLength } from 'class-validator';
import { CommonConstants } from '../../../infrastructure/constants/common.constants';

@InputType('SignUpByProviderRequestType')
export class SignUpByProviderRequestDto {
  @Field()
  @Matches(CommonConstants.EMAIL_REGEX)
  email?: string;

  @Field()
  @MaxLength(50)
  fullName: string;

  @Field()
  @MaxLength(100)
  firebaseUid: string;

  @Field()
  @MaxLength(50)
  providerId: string;

  @Field()
  @MaxLength(200)
  pictureUrl?: string;
}
