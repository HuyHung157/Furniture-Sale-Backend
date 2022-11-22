import { Account } from '@modules/auth/models/account.entity';
import { GroupProduct } from '@modules/group-product/models/group-product.entity';
import { UserRole } from '@modules/user/models/user-role.entity';
import { User } from '@modules/user/models/user.entity';
import { Module } from '@nestjs/common';
import { PgModule as InfraPgModule } from 'src/infrastructure/database/pg.module';
import { Category } from '../category/models/category.entity';
import { ProductCategory } from '../category/models/product-category.entity';
import { Product } from '../product/models/product.entity';

const registeredPgModule = InfraPgModule.register({
  entities: [
    Product,
    Category,
    GroupProduct,
    ProductCategory,
    User,
    UserRole,
    Account,
  ],
});

@Module({
  imports: [registeredPgModule],
  exports: [registeredPgModule],
})
export class DatabaseModule {}
