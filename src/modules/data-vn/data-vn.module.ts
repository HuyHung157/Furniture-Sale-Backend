import { EnvironmentModule } from '@infrastructure/environment/environment.module';
import { Module } from '@nestjs/common';
import { DataVNResolver } from './resolvers/data-vn.resolver';
import { DataVNService } from './services/data-vn.service';

@Module({
  imports: [
    EnvironmentModule,
  ],
  providers: [
    DataVNResolver, 
    DataVNService,
  ],
})
export class DataVnModule {}
