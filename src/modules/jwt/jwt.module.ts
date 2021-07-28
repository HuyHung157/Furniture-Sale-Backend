import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { EnvironmentModule } from '../../infrastructure/environment/environment.module';
import { JwtConfigService } from './services/jwt-config.service';

const jwtModule = NestJwtModule.registerAsync({
  imports: [EnvironmentModule],
  useClass: JwtConfigService,
});

@Module({
  imports: [jwtModule],
  exports: [jwtModule],
})
export class JwtModule { }
