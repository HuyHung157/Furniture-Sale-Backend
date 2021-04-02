import { LoggerService, Module } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { CommonConstants } from '../constants/common.constants';
import { EnvironmentModule } from '../environment/environment.module';
import { EnvironmentService } from '../environment/environment.service';
import { MailTemplateService } from '../mail/services/mail-template.service';
import { SmsSendInBlueService } from './services/sms-send-in-blue.service';
import { SmsTwilioService } from './services/sms-twilio.service';
import { SmsService } from './services/sms.service';

@Module({
  imports: [EnvironmentModule],
  providers: [
    {
      provide: SmsService,
      useFactory: (logger: LoggerService, environmentService: EnvironmentService,) => {
        const smsProvider = environmentService.getKey(CommonConstants.SMS_PROVIDER);
        logger.log(`Loading sms provider '${smsProvider}'`);
        switch (smsProvider) {
          case CommonConstants.SMS_PROVIDER_TWILIO:
            return new SmsTwilioService(logger, environmentService);
          case CommonConstants.SMS_PROVIDER_SENDINBLUE:
            return new SmsSendInBlueService(logger, environmentService);
        }
        logger.warn(`Invalid sms provider with value '${smsProvider}'`);
      },
      inject: [
        WINSTON_MODULE_NEST_PROVIDER,
        EnvironmentService,
      ],
    },
    MailTemplateService,
  ],
  exports: [
    SmsService,
    MailTemplateService,
  ],
})
export class SmsModule { }
