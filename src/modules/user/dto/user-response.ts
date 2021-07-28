import { BaseDto } from "@infrastructure/models/base.dto";
import { Account } from "@modules/auth/models/account.entity";
import { Field, ObjectType } from "@nestjs/graphql";
import { UserRole } from "../models/user-role.entity";

@ObjectType('UserResponseType')
export class UserResponseDto extends BaseDto {
  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  phoneNumberPrefix?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  profileUrl?: string;

  @Field({ nullable: true })
  birthday?: Date;

  @Field({ nullable: true })
  gender?: string;

  // @Field({ nullable: true })
  // account: Account;

  // @Field({ nullable: true })
  // userRoles?: UserRole[];
}