import { Inject, Injectable, LoggerService } from '@nestjs/common';
import Mailgun from 'mailgun-js';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { CommonConstants } from '../../constants/common.constants';
import { EnvironmentService } from '../../environment/environment.service';
import { MailData } from '../interfaces/mail-data.interface';
import { MailService } from './mail.service';

@Injectable()
export class MailMailgunService extends MailService {
  private mailGun: Mailgun.Mailgun;

  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly environmentService: EnvironmentService,
  ) {
    super();
    const apiKey = this.environmentService.getKey(
      CommonConstants.MAILGUN_API_KEY,
    );
    const domain = this.environmentService.getKey(
      CommonConstants.MAILGUN_DOMAIN,
    );

    this.mailGun = new Mailgun({
      apiKey,
      domain,
      host: 'api.eu.mailgun.net',
    });
  }

  public async sendMail(mail: MailData): Promise<any> {
    const from = this.environmentService.getKey(CommonConstants.MAIL_FROM);
    const mailData = { from, ...mail };
    const replyTo = this.environmentService.getKey(
      CommonConstants.MAIL_REPLY_TO,
    );

    if (replyTo) {
      mailData['h:Reply-To'] = replyTo;
    }

    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.mailGun.messages().send(mailData);
        this.logger.log(`Mail sent to ${mail.to}!`);
        resolve(response);
      } catch (error) {
        this.logger.error(error);
        reject(error);
      }
    });
  }
}
