import { Injectable, LoggerService } from '@nestjs/common';
import * as SibApiV3Sdk from 'sib-api-v3-typescript';
import { CommonConstants } from '../../constants/common.constants';
import { EnvironmentService } from '../../environment/environment.service';
import { SmsSendInBlueSendOptions } from '../interfaces/sms-send-in-blue-send-options.interface';
import { SmsService } from './sms.service';
import http = require('http');

@Injectable()
export class SmsSendInBlueService extends SmsService {
  constructor(
    protected readonly logger: LoggerService,
    protected readonly environmentService: EnvironmentService,
  ) {
    super(logger, environmentService);
    this.logger.debug('SmsSendInBlueService#constructor');
  }

  public async sendSms(options: SmsSendInBlueSendOptions): Promise<{ response: http.IncomingMessage; body: SibApiV3Sdk.SendSms; }> {
    if (!this.canSendSms) {
      return;
    }

    const apiKey = this.environmentService.getKey(CommonConstants.SENDINBLUE_API_KEY);
    if (!apiKey) {
      this.logger.error('SENDINBLUE_API_KEY not found');
      return;
    }

    const apiInstance = new SibApiV3Sdk.TransactionalSMSApi();
    apiInstance.setApiKey(SibApiV3Sdk.TransactionalSMSApiApiKeys.apiKey, apiKey);
    apiInstance.setApiKey(SibApiV3Sdk.TransactionalSMSApiApiKeys.partnerKey, apiKey);

    try {
      const response = await apiInstance.sendTransacSms(options as any);
      this.logger.log(`SMS sent to ${options.recipient}`);
      return response;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
