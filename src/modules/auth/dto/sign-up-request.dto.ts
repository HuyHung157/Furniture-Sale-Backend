import { Field, InputType } from '@nestjs/graphql';
import { Matches, MaxLength } from 'class-validator';
import { Gender } from '../../user/enums/gender.enum';
import { CommonConstants } from '../../../infrastructure/constants/common.constants';

@InputType('SignUpRequestType')
export class SignUpRequestDto {
  @Field()
  userName: string;

  @Field()
  password: string;

  @Field()
  @Matches(CommonConstants.EMAIL_REGEX)
  email: string;

  @Field()
  @MaxLength(50)
  firstName: string;

  @Field()
  @MaxLength(50)
  lastName: string;

  @Field(() => Date)
  birthday?: Date;
  
  @Field(() => Gender)
  gender: Gender;

  @Field()
  phoneNumber?: string;

  @Field()
  phoneNumberPrefix: string;

  @Field()
  address?: string;

  @Field()
  ward?: string;

  @Field()
  district?: string;

  @Field()
  city?: string;
}
