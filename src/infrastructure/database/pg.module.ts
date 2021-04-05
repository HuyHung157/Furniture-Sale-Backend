import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentModule } from '../environment/environment.module';
import { EnvironmentService } from '../environment/environment.service';

@Module({})
export class PgModule {
  static register(config: {
    entities: any[],
  }): DynamicModule {
    return {
      module: PgModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [EnvironmentModule],
          useFactory: async (environmentService: EnvironmentService) =>
            (
              console.log(environmentService.getTypeOrmConfig({ entities: config.entities })),
              {
              ...environmentService.getTypeOrmConfig({ entities: config.entities }),
              synchronize: true,
            } as TypeOrmModuleOptions),
          inject: [EnvironmentService],
        }),
      ],
    };
  }
}
