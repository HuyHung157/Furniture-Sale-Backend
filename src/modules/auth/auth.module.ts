import { EnvironmentModule } from '@infrastructure/environment/environment.module';
import { JwtModule } from '@modules/jwt/jwt.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'src/redis/redis.module';
import { Account } from './models/account.entity';
import { AuthResolver } from './resolvers/auth.resolver';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Account,
    ]),
    EnvironmentModule,
    JwtModule,
    RedisModule,
  ],
  providers: [
    AuthService,
    AuthResolver
  ],
  exports: [AuthService],
})
export class AuthModule {}
