import { Module } from '@nestjs/common';
import { EnvironmentModule } from '@infrastructure/environment/environment.module';

import { RedisService } from './redis.service';

@Module({
  imports: [EnvironmentModule],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
