import { Module } from '@nestjs/common';
import { PgModule as FaviePgModule } from 'src/infrastructure/database/pg.module';
import { Category } from '../category/models/category.entity';
import { ProductCategory } from '../category/models/product-category';
import { Product } from '../product/models/product.entity';

const registeredPgModule = FaviePgModule.register({
  entities: [
    Product,
    Category,
    ProductCategory
  ],
});

@Module({
  imports: [registeredPgModule],
  exports: [registeredPgModule],
})
export class DatabaseModule {}
