import { Module } from '@nestjs/common';
import { GraphqlModule } from './gql/gql.module';

@Module({
  imports: [GraphqlModule],
  providers: [
  ],
})
export class CommonModule {}
