import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';

/**
 * @see https://docs.nestjs.com/graphql/resolvers#generics
 */
export function BaseListResponse<T>(classRef: Type<T>): any {
  @ObjectType({ isAbstract: true })
  class BaseListResponseDto {
    @Field()
    totalItems: number;

    @Field(() => [classRef], { nullable: true })
    items?: T[];
  }

  return BaseListResponseDto;
}
