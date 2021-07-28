import { registerEnumType } from '@nestjs/graphql';

export enum UserRoleEnum {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  USER = 'USER',
}


registerEnumType(UserRoleEnum, { name: 'Gender' });
