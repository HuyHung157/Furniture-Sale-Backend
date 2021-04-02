// APITIC
export class CommonConstants {
  public static readonly APITIC_API_TOKEN = 'APITIC_API_TOKEN';
  public static readonly APITIC_API_URL = 'APITIC_API_URL';
  public static readonly APITIC_API_ACGR_ID = 'APITIC_API_ACGR_ID';
  public static readonly GET_APITIC_SHOPS_API = '/shops/';
  public static readonly GET_APITIC_USER_API = '/customers/email/';
  public static readonly APITIC_USER_API = '/customers/';
  public static readonly CREATE_APITIC_ORDER_API = '/commands';
  public static readonly GET_APITIC_PRODUCT_API = '/cards/';
  public static readonly APITIC_USER_DEFAULT_PASSWORD = 'APITIC_USER_DEFAULT_PASSWORD';

  public static readonly DEFAULT_PAGING_PAGE_SIZE = 10;
  public static readonly DEFAULT_PAGING_PAGE_INDEX = 1;

  public static readonly CHRONOPOST_QUICK_CODE_SERVICE_URL = 'CHRONOPOST_QUICK_CODE_SERVICE_URL'
  public static readonly CHRONOPOST_SHIPPING_SERVICE_URL = 'CHRONOPOST_SHIPPING_SERVICE_URL'
  public static readonly CHRONOPOST_ACCOUNT_NUMBER = 'CHRONOPOST_ACCOUNT_NUMBER'
  public static readonly CHRONOPOST_PASSWORD = 'CHRONOPOST_PASSWORD'
  public static readonly PARIS_POSTCODES = ['75000', '75001', '75002', '75003', '75004', '75005', '75006', '75007', '75008', '75009', '75010', '75011', '75012', '75013', '75014', '75015', '75016', '75116', '75017', '75018', '75019', '75020', '93400', '93300', '93500', '93310', '93260', '93170', '93100', '94300', '94160', '94220', '94200', '94270', '94250', '92120', '92240', '92170', '92130', '92100', '92150', '92800', '92400', '92200', '92300', '92110'];

  public static readonly MONTH_DAY_LENGTH = 2;
  public static readonly DATE_PAD_CHARACTER = '0';

  public static readonly GLOBAL_TAX_RATE = 0.055; // 5.5% https://gitlab.com/favie/lebourdonnec/back-end/-/issues/12
}
