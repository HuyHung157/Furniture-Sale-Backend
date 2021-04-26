import { Injectable, Logger } from '@nestjs/common';
import Email from 'email-templates';
import path from 'path';
import { CommonConstants } from '../../constants/common.constants';
import { EnvironmentService } from '../../environment/environment.service';
import { SmsTemplate } from '../../sms/interfaces/sms-template.interface';
import { MailTemplate } from '../interfaces/mail-template.interface';

@Injectable()
export class MailTemplateService {
  private readonly logger = new Logger(MailTemplateService.name);

  constructor(private readonly environmentService: EnvironmentService) { }

  /**
   * Fetch email tempalte
   */
  public async fetchTemplate(templateName: string, data: any, language = 'en'): Promise<MailTemplate> {
    const envTemplatesPath = this.environmentService.getKey(CommonConstants.MAIL_TEMPLATES_PATH);
    if (!envTemplatesPath) {
      this.logger.error('MAIL_TEMPLATES_PATH not found');
    }
    const email = this.getEmailObject(envTemplatesPath, language);
    const result: MailTemplate = await email.renderAll(templateName, data) as MailTemplate;
    if (!result.subject) {
      this.logger.warn('Missing mail subject');
    }
    if (!result.html) {
      this.logger.warn('Missing mail html');
    }
    if (!result.text) {
      this.logger.warn('Missing mail text');
    }
    return result;
  }

  /**
   * Fetch SMS template
   */
  public async fetchSmsTemplate(templateName: string, data: any, language = 'en'): Promise<SmsTemplate> {
    const envTemplatesPath = this.environmentService.getKey(CommonConstants.SMS_TEMPLATES_PATH);
    if (!envTemplatesPath) {
      this.logger.error('SMS_TEMPLATES_PATH not found');
    }
    const email = this.getEmailObject(envTemplatesPath, language);
    const result: SmsTemplate = await email.renderAll(templateName, data) as MailTemplate;
    Object.keys(result).forEach(key => { result[key] = result[key].trim(); });
    if (!result.text) {
      this.logger.warn('Missing sms text');
    }
    return result;
  }

  private getEmailObject(envTemplatesPath: string, language = 'en') {
    const segments = [__dirname, envTemplatesPath, language.toLowerCase()].filter(v => v);
    const templatesPath = path.resolve(...segments);
    const email = new Email({
      message: {},
      views: {
        root: templatesPath,
        options: { extension: 'ejs' },
      },
    });
    return email;
  }
}
