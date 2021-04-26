import { LoggerService, Module } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { CommonConstants } from '../constants/common.constants';
import { EnvironmentModule } from '../environment/environment.module';
import { EnvironmentService } from '../environment/environment.service';
import { MailMailgunService } from './services/mail-mailgun.service';
import { MailSendgridService } from './services/mail-sendgrid.service';
import { MailSmtpService } from './services/mail-smtp.service';
import { MailTemplateService } from './services/mail-template.service';
import { MailService } from './services/mail.service';

@Module({
  imports: [EnvironmentModule],
  providers: [
    {
      provide: MailService,
      useFactory: (environmentService: EnvironmentService, logger: LoggerService) => {
        const mailProvider = environmentService.getKey(CommonConstants.MAIL_PROVIDER);
        if (mailProvider) {
          if (mailProvider.toLowerCase() === CommonConstants.MAIL_PROVIDER_SMTP) {
            return new MailSmtpService(logger, environmentService);
          } else if (mailProvider.toLowerCase() === CommonConstants.MAIL_PROVIDER_MAILGUN) {
            return new MailMailgunService(logger, environmentService);
          }
        }
        return new MailSendgridService(logger, environmentService);
      },
      inject: [EnvironmentService, WINSTON_MODULE_NEST_PROVIDER],
    },
    MailTemplateService
  ],
  exports: [MailService, MailTemplateService],
})
export class MailModule { }
