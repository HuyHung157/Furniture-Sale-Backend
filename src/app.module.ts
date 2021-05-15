import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphqlModule } from '@infrastructure/gql/gql.module';
import { DatabaseModule } from '@modules/database/database.module';
import { ProductModule } from '@modules/product/product.module';
import { CategoryModule } from '@modules/category/category.module';
import { WinstonModule } from '@infrastructure/modules/winston/winston.module';
import { LoggingInterceptor } from '@infrastructure/interceptors/logging.interceptor';
import { ErrorInterceptor } from '@infrastructure/interceptors/error.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    GraphqlModule,
    DatabaseModule,
    WinstonModule,
    ProductModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
  ],
})
export class AppModule { }
