import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphqlModule } from './infrastructure/gql/gql.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    GraphqlModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
