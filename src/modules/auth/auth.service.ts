import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentModule } from 'src/infrastructure/environment/environment.module';

@Module({
  imports: [
    EnvironmentModule,
    
  ],
  providers: [],
  exports: [],
})
export class UserModule {}
