import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('BaseResponseType')
export class BaseResponseDto {

  @Field({ nullable: true })
  message?: string;

  @Field({ nullable: true })
  statusCode?: number;

  constructor(message?: string, statusCode?: number) {
    this.message = message;
    this.statusCode = statusCode;
  }

}
