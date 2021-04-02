import { Injectable, LoggerService } from '@nestjs/common';
import twilio from 'twilio';
import { MessageInstance, MessageListInstanceCreateOptions } from 'twilio/lib/rest/api/v2010/account/message';
import TwilioClient from 'twilio/lib/rest/Twilio';
import { CommonConstants } from '../../constants/common.constants';
import { EnvironmentService } from '../../environment/environment.service';
import { SmsService } from './sms.service';

@Injectable()
export class SmsTwilioService extends SmsService {
  private client: TwilioClient;

  constructor(
    protected readonly logger: LoggerService,
    protected readonly environmentService: EnvironmentService,
  ) {
    super(logger, environmentService);
    this.logger.debug('SmsTwilioService#constructor');

    this.initClient();
  }

  public async sendSms(options: MessageListInstanceCreateOptions): Promise<MessageInstance> {
    if (!this.canSendSms) {
      return;
    }

    const fromNumber = this.environmentService.getKey(CommonConstants.SMS_FROM);
    options.from = options.from || fromNumber;

    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.client.messages.create(options);
        this.logger.log(`SMS sent to ${response.to}`);
        resolve(response);
      } catch (error) {
        const msg = error.message;
        this.logger.error(msg);
        reject(error);
      }
    });
  }

  private initClient() {
    const accountSid = this.environmentService.getKey(CommonConstants.TWILIO_ACCOUNT_SID);
    const authToken = this.environmentService.getKey(CommonConstants.TWILIO_AUTH_TOKEN);
    if (!accountSid) {
      this.logger.error('TWILIO_ACCOUNT_SID not found');
    }
    if (!authToken) {
      this.logger.error('TWILIO_AUTH_TOKEN not found');
    }

    this.client = twilio(accountSid, authToken);
  }
}
