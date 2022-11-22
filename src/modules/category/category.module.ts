import { GroupProduct } from '@modules/group-product/models/group-product.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentModule } from 'src/infrastructure/environment/environment.module';
import { Category } from './models/category.entity';
import { ProductCategory } from './models/product-category.entity';
import { CategoryResolver } from './resolvers/category.resolver';
import { CategoryService } from './services/category.service';

@Module({
  imports: [
    EnvironmentModule,
    TypeOrmModule.forFeature([Category, ProductCategory, GroupProduct]),
  ],
  providers: [CategoryResolver, CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
