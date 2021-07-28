import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory, JwtSecretRequestType } from '@nestjs/jwt';
import { CommonConstants } from '../../../infrastructure/constants/common.constants';
import { EnvironmentService } from '../../../infrastructure/environment/environment.service';
import { JwtConstants } from '../constants/jwt.constants';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private readonly envService: EnvironmentService) { }

  createJwtOptions(): JwtModuleOptions {
    return {
      secretOrKeyProvider: (requestType: JwtSecretRequestType) => {
        switch (requestType) {
          case JwtSecretRequestType.SIGN:
            return this.envService.getKey(CommonConstants.JWT_SECRET_KEY);
          case JwtSecretRequestType.VERIFY:
            return this.envService.getKey(CommonConstants.JWT_SECRET_KEY);
          default:
            return JwtConstants.JWT_DEFAULT_SECRET;
        }
      },
      signOptions: {
        expiresIn: CommonConstants.JWT_EXPIRE_IN,
      },
    };
  }
}
