import { Field } from '@nestjs/graphql';

export abstract class BaseAuditableDto {
  @Field()
  createdById: string;
}
