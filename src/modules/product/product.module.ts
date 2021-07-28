import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentModule } from 'src/infrastructure/environment/environment.module';
import { CategoryModule } from '../category/category.module';
import { Product } from './models/product.entity';
import { ProductResolver } from './resolvers/product.resolver';
import { ProductService } from './services/product.service';

@Module({
  imports: [
    EnvironmentModule,
    CategoryModule,
    TypeOrmModule.forFeature([
      Product,
    ]),
  ],
  providers: [
    ProductResolver, 
    ProductService
  ],
  exports: [ProductService],
})
export class ProductModule {}
