import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { CommonConstants } from '../constants/common.constants';

@Injectable()
export class EnvironmentService {
  private readonly settings: { [key: string]: string };

  constructor() {
    this.settings = dotenv.parse(
      fs.readFileSync(CommonConstants.ENV_CONFIG_PATH),
    );
    if (this.isProductionMode() || this.isStagingMode()) {
      for (const key in this.settings) {
        if (this.settings.hasOwnProperty(key) && process.env[key]) {
          this.settings[key] = process.env[key];
        }
      }
    }
  }

  public getKey(key: string) {
    return this.settings[key];
  }

  public toNumber(key: string): number {
    const value = this.getKey(key);

    return value ? parseInt(value, 10) : undefined;
  }

  public toBool(key: string): boolean {
    return this.getKey(key) === 'true';
  }

  public isDevMode() {
    return process.env.NODE_ENV === CommonConstants.DEV_ENV;
  }

  public isProductionMode() {
    return process.env.NODE_ENV === CommonConstants.PRODUCTION_ENV;
  }

  public isStagingMode() {
    return process.env.NODE_ENV === CommonConstants.STAGING_ENV;
  }

  public getTypeOrmConfig(config?: {
    entities: any[],
  }) {
    return {
      type: 'postgres',
      host: this.getKey(CommonConstants.POSTGRES_HOST),
      port: parseInt(this.getKey(CommonConstants.POSTGRES_PORT)),
      username: this.getKey(CommonConstants.POSTGRES_USER),
      password: this.getKey(CommonConstants.POSTGRES_PASSWORD),
      database: this.getKey(CommonConstants.POSTGRES_DATABASE),

      entities: config?.entities || [CommonConstants.TYPE_ORM_ENTITIES],

      migrationsTableName: CommonConstants.TYPE_ORM_MIGRATION_TABLE_NAME,

      migrations: [CommonConstants.TYPE_ORM_MIGRATIONS],

      cli: {
        migrationsDir: CommonConstants.TYPE_ORM_CLI_MIGRATIONS_DIR,
      },
      // ssl: this.isProductionMode(),
    };
  }
}
