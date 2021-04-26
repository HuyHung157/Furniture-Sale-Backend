import { Injectable, NotImplementedException } from '@nestjs/common';
import { MailData } from '../interfaces/mail-data.interface';

@Injectable()
export class MailService {
  public async sendMail(mail: MailData): Promise<any> {
    throw new NotImplementedException('Not implemented');
  }
}
