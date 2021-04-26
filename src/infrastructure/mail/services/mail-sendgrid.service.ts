import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';
import sgMailService from '@sendgrid/mail';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { CommonConstants } from '../../constants/common.constants';
import { EnvironmentService } from '../../environment/environment.service';
import { MailData } from '../interfaces/mail-data.interface';
import { MailService } from './mail.service';

@Injectable()
export class MailSendgridService extends MailService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly environmentService: EnvironmentService,
  ) {
    super();
    const key = this.environmentService.getKey(CommonConstants.SENDGRID_API_KEY);
    sgMailService.setApiKey(key);
  }

  public async sendMail(mail: MailData): Promise<any> {
    const from = this.environmentService.getKey(CommonConstants.MAIL_FROM);
    const mailData: MailDataRequired = { from, ...mail };

    return new Promise(async (resolve, reject) => {
      try {
        const response = await sgMailService.send(mailData);
        this.logger.log(`Mail sent to ${mail.to}!`);
        resolve(response);
      } catch (error) {
        this.logger.error(error);
        reject(error);
      }
    });
  }
}
