import { Module } from '@nestjs/common';
import {
  WinstonModule as BaseWinstonModule,
  WinstonModuleOptions,
} from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { EnvironmentModule } from '../../environment/environment.module';
import { EnvironmentService } from '../../environment/environment.service';
import { CommonConstants } from '../../constants/common.constants';

@Module({
  imports: [
    BaseWinstonModule.forRootAsync({
      imports: [EnvironmentModule],
      useFactory: async (environmentService: EnvironmentService) => {
        const transports = environmentService.isProductionMode() || environmentService.isStagingMode()
          ? [
              new winston.transports.DailyRotateFile({
                filename: environmentService.getKey(CommonConstants.WINSTON_LOG_ERROR_FILE_NAME) || 'error-%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
                maxSize: '20m',
                level: 'error',
              }),
              new winston.transports.DailyRotateFile({
                filename: environmentService.getKey(CommonConstants.WINSTON_LOG_FILE_NAME) || 'application-%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
                maxSize: '20m',
              }),
            ]
          : [
              new winston.transports.Console({
                format: winston.format.simple(),
              }),
            ];
        const options: WinstonModuleOptions = {
          level: 'info',
          format: winston.format.json(),
          transports,
        };
        return options;
      },
      inject: [EnvironmentService],
    }),
  ],
})
export class WinstonModule {}
