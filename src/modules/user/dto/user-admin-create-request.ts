import { Field, InputType } from '@nestjs/graphql';
import { Matches, MaxLength } from 'class-validator';
import { Gender } from '../enums/gender.enum';
import { CommonConstants } from '../../../infrastructure/constants/common.constants';

@InputType('UserAdminCreateRequestType')
export class UserAdminCreateRequestDto {
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

  @Field(() => Date, { nullable: true})
  birthday?: Date;

  @Field(() => Gender)
  gender?: Gender;

  @Field({ nullable: true })
  profileUrl?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field()
  phoneNumberPrefix: string;
  
  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  ward?: string;

  @Field({ nullable: true })
  district?: string;

  @Field({ nullable: true })
  city?: string;
}
