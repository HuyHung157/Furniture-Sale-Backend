import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentModule } from 'src/infrastructure/environment/environment.module';
import { Category } from './models/category.entity';
import { ProductCategory } from './models/product-category';

@Module({
  imports: [
    EnvironmentModule,
    TypeOrmModule.forFeature([
      Category,
      ProductCategory
    ]),
  ],
  providers: [],
  exports: [],
})
export class ProductModule {}
