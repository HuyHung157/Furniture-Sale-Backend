import { MailTemplate } from './mail-template.interface';

export interface MailData extends MailTemplate {
  to: string;
  bcc?: string;
}
