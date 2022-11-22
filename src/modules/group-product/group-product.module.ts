import { EnvironmentModule } from '@infrastructure/environment/environment.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupProduct } from './models/group-product.entity';
import { GroupProductResolver } from './resolvers/group-product.resolver';
import { GroupProductService } from './services/group-product.service';

@Module({
  imports: [EnvironmentModule, TypeOrmModule.forFeature([GroupProduct])],
  providers: [GroupProductResolver, GroupProductService],
  exports: [],
})
export class GroupProductModule {}
