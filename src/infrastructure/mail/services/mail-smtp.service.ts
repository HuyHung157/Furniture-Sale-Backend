import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { createTransport, SendMailOptions, SentMessageInfo, Transporter } from 'nodemailer';
import { CommonConstants } from '../../constants/common.constants';
import { EnvironmentService } from '../../environment/environment.service';
import { MailData } from '../interfaces/mail-data.interface';
import { MailService } from './mail.service';

@Injectable()
export class MailSmtpService extends MailService {
  private transporter: Transporter;

  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly environmentService: EnvironmentService,
  ) {
    super();

    const smtpConfig = {
      host: environmentService.getKey(CommonConstants.MAIL_HOSTNAME),
      port: environmentService.toNumber(CommonConstants.MAIL_PORT),
      secure: environmentService.toBool(CommonConstants.MAIL_SECURE),
      ignoreTLS: environmentService.toBool(CommonConstants.MAIL_IGNORE_TLS),
      auth: {
        user: environmentService.getKey(CommonConstants.MAIL_USERNAME),
        pass: environmentService.getKey(CommonConstants.MAIL_PASSWORD),
      }
    };

    this.transporter = createTransport(smtpConfig);
  }

  public async sendMail(mail: MailData): Promise<any> {
    const mailOptions: SendMailOptions = {
      from: this.environmentService.getKey(CommonConstants.MAIL_FROM),
      to: mail.to,
      subject: mail.subject,
      html: mail.html,
    };

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (err: Error | null, info: SentMessageInfo) => {
        if (err) {
          this.logger.log('Send email error: ' + err);
          return reject(err);
        }

        this.logger.log(`Mail sent to ${info.accepted.join(', ')}!`);
        return resolve(info);
      });
    });
  }
}
