import { CommonConstants } from "@constants/common.constants";
import { EnvironmentService } from "@infrastructure/environment/environment.service";
import { Injectable } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class RedisService {
  private redis: Redis;

  constructor(private environmentService: EnvironmentService) {
    this.redisNewInstance();
  }

  public async set(key: string, field, value) {
    await this.redis.hset(
      key,
      field,
      value
    );
  }

  public async get(key: string, field) {
    return await this.redis.hget(
      key,
      field,
    );
  }

  public async delete(key: string, field) {
    await this.redis.hdel(
      key,
      field,
    );
  }

  public async getStoredRefreshToken(refreshToken: string) {
    return await this.redis.hget(
      CommonConstants.REDIS_REFRESH_TOKEN,
      refreshToken,
    );
  }

  public async setRefreshTokenForId(refreshToken: string, id: string) {
    await this.redis.hset(
      CommonConstants.REDIS_REFRESH_TOKEN,
      refreshToken,
      id,
    );
  }

  public async removeRefreshToken(refreshToken: string) {
    await this.redis.hdel(CommonConstants.REDIS_REFRESH_TOKEN, refreshToken);
  }

  private async redisNewInstance() {
    this.redis = await new Redis(this.redisPort, this.redisHost, {
      connectionName: CommonConstants.REDIS_CONNECTION_NAME,
      password: this.environmentService.getKey(CommonConstants.REDIS_PASSWORD),
    });
  }

  private get redisPort() {
    return parseInt(
      this.environmentService.getKey(CommonConstants.REDIS_PORT),
      10,
    );
  }

  private get redisHost() {
    return this.environmentService.getKey(CommonConstants.REDIS_HOST);
  }

}