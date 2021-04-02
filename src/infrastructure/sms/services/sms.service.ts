import { Injectable, LoggerService, NotImplementedException } from '@nestjs/common';
import { CommonConstants } from '../../constants/common.constants';
import { EnvironmentService } from '../../environment/environment.service';

@Injectable()
export class SmsService {
  constructor(
    protected readonly logger: LoggerService,
    protected readonly environmentService: EnvironmentService,
  ) { }

  public get canSendSms() {
    const canSend = this.environmentService.toBool(CommonConstants.SMS_ENABLED);
    if (!canSend) {
      this.logger.warn('SMS disabled! Please check SMS_ENABLED config!');
    }
    return canSend;
  }

  public async sendSms(options: any): Promise<any> {
    throw new NotImplementedException();
  }
}
