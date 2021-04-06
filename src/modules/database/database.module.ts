import { Module } from '@nestjs/common';
import { PgModule as FaviePgModule } from 'src/infrastructure/database/pg.module';
import { Product } from '../product/models/product.entity';

const registeredPgModule = FaviePgModule.register({
  entities: [
    Product
  ],
});

@Module({
  imports: [registeredPgModule],
  exports: [registeredPgModule],
})
export class DatabaseModule {}
