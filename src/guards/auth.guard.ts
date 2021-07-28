import { ExecutionContext } from '@nestjs/common';
import { CommonConstants } from "@infrastructure/constants/common.constants";
import { GqlUtil } from "@infrastructure/utils/gql.utils";
import { StringUtil } from "@infrastructure/utils/string.utils";
import { CanActivate, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RedisService } from "src/redis/redis.service";

Injectable()
export class AuthGuard implements CanActivate{
  
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ){}

  async canActivate(context: ExecutionContext) {
    const gqlContext = GqlUtil.getGqlContext(context);
    const authHeader = gqlContext.req.headers[CommonConstants.AUTHORIZATION_HTTP_REQUEST_HEADER];

    if (authHeader) {
      const authParams = StringUtil.parseAuthHeader(authHeader);

      if (
        authParams.scheme &&
        authParams.scheme.toLowerCase() === CommonConstants.AUTHORIZATION_HEADER_BEARER.toLowerCase() &&
        authParams.value
      ) {
        const refreshToken = await gqlContext.req.headers[
          CommonConstants.AUTHORIZATION_HTTP_REQUEST_X_TOKEN
        ];
        let decodedUser: any;
        try {
          decodedUser = this.jwtService.verify(authParams.value, {
            ignoreExpiration: false,
          });
          const storedRefreshToken = await this.redisService.getStoredRefreshToken(
            refreshToken,
          );
          if (!storedRefreshToken) {
            return false;
          }
        } catch (error) {
          if (error.name === CommonConstants.TOKEN_EXPIRED_ERROR) {
            const storedRefreshToken = await this.redisService.getStoredRefreshToken(
              refreshToken,
            );
            decodedUser = this.jwtService.decode(authParams.value);
            if (storedRefreshToken && storedRefreshToken === decodedUser.id) {
              delete decodedUser.exp;
              // Sign a new token
              const newToken = this.jwtService.sign(decodedUser, {
                expiresIn: CommonConstants.JWT_EXPIRE_IN,
              });
              // set response header
              await gqlContext.res.set(
                'Access-Control-Expose-Headers',
                CommonConstants.AUTHORIZATION_HTTP_REQUEST_HEADER,
              );
              await gqlContext.res.set(
                CommonConstants.AUTHORIZATION_HTTP_REQUEST_HEADER,
                newToken,
              );
            }
          } else {
            throw new UnauthorizedException();
          }
        }

        const reqUser = {
          ...decodedUser.user,
          refreshToken,
        };

        // Context request user
        gqlContext.req.user = reqUser;

        return true;
      }
    }

    return false;
  }

}