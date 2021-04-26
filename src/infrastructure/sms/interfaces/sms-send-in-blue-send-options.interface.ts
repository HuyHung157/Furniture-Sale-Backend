import * as SibApiV3Sdk from 'sib-api-v3-typescript';

/**
 * @see https://developers.sendinblue.com/reference#sendtransacsms
 */
export interface SmsSendInBlueSendOptions {
  /**
   * @description Name of the sender. Only alphanumeric characters. No more than 11 characters
   */
  sender: string;

  /**
   * @description Mobile number to send SMS with the country code
   */
  recipient: string;

  /**
   * @description Content of the message. If more than 160 characters long, will be sent as multiple text messages
   */
  content: string;

  /**
   * @description Type of the SMS. Marketing SMS messages are those sent typically with marketing content. Transactional SMS messages are sent to individuals and are triggered in response to some action, such as a sign-up, purchase, etc.
   */
  type?: SibApiV3Sdk.SendTransacSms.TypeEnum;

  /**
   * @description Tag of the message
   */
  tag?: string;

  /**
   * @description Webhook to call for each event triggered by the message (delivered etc.)
   */
  webUrl?: string;
}
