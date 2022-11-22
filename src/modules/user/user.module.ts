import { EnvironmentModule } from '@infrastructure/environment/environment.module';
import { MailModule } from '@infrastructure/mail/mail.module';
import { AuthModule } from '@modules/auth/auth.module';
import { JwtModule } from '@modules/jwt/jwt.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'src/redis/redis.module';
import { UserRole } from './models/user-role.entity';
import { User } from './models/user.entity';
import { UserAdminResolver } from './resolvers/user-admin.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { UserAdminService } from './services/user-admin.service';
import { UserService } from './services/user.service';

@Module({
  imports: [
    AuthModule,
    JwtModule,
    RedisModule,
    EnvironmentModule,
    TypeOrmModule.forFeature([User, UserRole]),
    MailModule,
  ],
  providers: [UserResolver, UserAdminResolver, UserService, UserAdminService],
  exports: [UserService],
})
export class UserModule {}
