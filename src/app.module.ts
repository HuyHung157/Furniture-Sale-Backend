import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphqlModule } from './infrastructure/gql/gql.module';
import { ProductModule } from './modules/product/product.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [
    GraphqlModule,
    DatabaseModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
