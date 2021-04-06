import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphqlModule } from './infrastructure/gql/gql.module';
import { DatabaseModule } from './modules/database/database.module';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    GraphqlModule,
    DatabaseModule,
    ProductModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
