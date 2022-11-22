export class CommonConstants {
  // Environment config
  public static readonly PRODUCTION_ENV = 'production';
  public static readonly STAGING_ENV = 'staging';
  public static readonly DEV_ENV = 'dev';
  public static readonly ENV_CONFIG_PATH = './.env';

  public static readonly WEB_APP_URL = 'WEB_APP_URL';
  public static readonly RESET_PASSWORD_PAGE = 'RESET_PASSWORD_PAGE';
  public static readonly VERIFY_PAGE = 'VERIFY_PAGE';

  // public static readonly VALID_STRING = /^[a-zA-Z0-9_u00C0-\u017Fx]+( [a-zA-Z0-9_u00C0-\u017Fx]+)*$/; // /^[a-zA-Z0-9\u00C0-\u017Fx]+$/g;
  public static readonly VALID_STRING = /[\u00C0-\u1FFF\u2C00-\uD7FF\w]/;

  // https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
  public static readonly EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  // GQL
  public static readonly GQL_TYPE_PATHS = 'GQL_TYPE_PATHS';
  public static readonly GQL_SCHEMA_PATH = 'GQL_SCHEMA_PATH';
  public static readonly GQL_EXECUTION_CONTEXT_REQ_INDEX = 2;

  public static readonly HEADER_USER_ID = 'user-id';
  public static readonly HEADER_USER_ROLE = 'user-role';
  public static readonly HEADER_REFRESH_TOKEN = 'x-token';
  public static readonly HEADER_LANGUAGE = 'language';

  public static readonly SALT_ROUNDS = 'SALT_ROUNDS';

  // LANGUAGES
  public static readonly DEFAULT_LANGUAGE = 'DEFAULT_LANGUAGE';
  public static readonly SUPPORTED_LANGUAGES = 'SUPPORTED_LANGUAGES';

  // MAIL
  public static readonly MAIL_PROVIDER = 'MAIL_PROVIDER';
  public static readonly MAIL_PROVIDER_SENDGRID = 'sendgrid';
  public static readonly MAIL_PROVIDER_SMTP = 'smtp';
  public static readonly MAIL_PROVIDER_MAILGUN = 'mailgun';
  public static readonly SENDGRID_API_KEY = 'SENDGRID_API_KEY';
  public static readonly MAIL_TEMPLATES_PATH = 'MAIL_TEMPLATES_PATH';
  public static readonly MAIL_FROM = 'MAIL_FROM';
  public static readonly MAIL_TO = 'MAIL_TO';
  public static readonly MAIL_REPLY_TO = 'MAIL_REPLY_TO';
  public static readonly MAIL_USERNAME = 'MAIL_USERNAME';
  public static readonly MAIL_PASSWORD = 'MAIL_PASSWORD';
  public static readonly MAIL_HOSTNAME = 'MAIL_HOSTNAME';
  public static readonly MAIL_PORT = 'MAIL_PORT';
  public static readonly MAIL_SECURE = 'MAIL_SECURE';
  public static readonly MAIL_IGNORE_TLS = 'MAIL_IGNORE_TLS';
  public static readonly MAILGUN_API_KEY = 'MAILGUN_API_KEY';
  public static readonly MAILGUN_DOMAIN = 'MAILGUN_DOMAIN';

  // SMS
  public static readonly SMS_ENABLED = 'SMS_ENABLED';
  public static readonly SMS_PROVIDER = 'SMS_PROVIDER';
  public static readonly SMS_PROVIDER_TWILIO = 'twilio';
  public static readonly SMS_PROVIDER_SENDINBLUE = 'sendinblue';
  public static readonly SMS_FROM = 'SMS_FROM';
  public static readonly SMS_TEMPLATES_PATH = 'SMS_TEMPLATES_PATH';
  public static readonly TWILIO_ACCOUNT_SID = 'TWILIO_ACCOUNT_SID';
  public static readonly TWILIO_AUTH_TOKEN = 'TWILIO_AUTH_TOKEN';
  public static readonly TWILIO_API_KEY_SID = 'TWILIO_API_KEY_SID';
  public static readonly TWILIO_API_KEY_SECRET = 'TWILIO_API_KEY_SECRET';
  public static readonly SENDINBLUE_API_KEY = 'SENDINBLUE_API_KEY';

  public static readonly EMPTY = '';

  public static readonly TOKEN_EXPIRE_IN = '48h';

  // REDIS
  public static readonly REDIS_HOST = 'REDIS_HOST';
  public static readonly REDIS_PORT = 'REDIS_PORT';
  public static readonly REDIS_PASSWORD = 'REDIS_PASSWORD';
  public static readonly REDIS_CONNECTION_NAME = 'REDIS_CONNECTION_NAME';
  public static readonly REDIS_REFRESH_TOKEN = 'refreshToken';

  // AUTHORIZATION
  public static readonly AUTHORIZATION_HTTP_REQUEST_HEADER = 'authorization';
  public static readonly AUTHORIZATION_HTTP_REQUEST_X_TOKEN = 'x-token';
  public static readonly AUTHORIZATION_HEADER_REGEX = /(\S+)\s+(\S+)/;
  public static readonly AUTHORIZATION_HEADER_BEARER = 'bearer';

  // ERROR
  public static readonly TOKEN_EXPIRED_ERROR = 'TokenExpiredError';

  // Setting
  public static readonly SETTING_X_POWERED_BY = 'x-powered-by';

  // JWT
  public static readonly JWT_SECRET_KEY = 'JWT_SECRET_KEY';
  public static readonly JWT_EXPIRE_IN = '15m';

  // POSTGRES
  public static readonly POSTGRES_HOST = 'POSTGRES_HOST';
  public static readonly POSTGRES_PORT = 'POSTGRES_PORT';
  public static readonly POSTGRES_USER = 'POSTGRES_USER';
  public static readonly POSTGRES_PASSWORD = 'POSTGRES_PASSWORD';
  public static readonly POSTGRES_DATABASE = 'POSTGRES_DATABASE';

  // TYPEORM
  public static readonly TYPE_ORM_ENTITIES = 'dist/**/*.entity{.ts,.js}';
  public static readonly TYPE_ORM_MIGRATION_TABLE_NAME = 'migration';
  public static readonly TYPE_ORM_MIGRATIONS = 'dist/migrations/*.js';
  public static readonly TYPE_ORM_CLI_MIGRATIONS_DIR = 'src/migrations';

  public static readonly UNDERSCORE = '_';
  public static readonly UNDERSCORE_ESCAPE = '\\_';
  public static readonly PERCENT_SIGN = '%';

  // FIREBASE ADMIN
  public static readonly FIREBASE_ADMIN_TYPE = 'FIREBASE_ADMIN_TYPE';
  public static readonly FIREBASE_ADMIN_PROJECT_ID = 'FIREBASE_ADMIN_PROJECT_ID';
  public static readonly FIREBASE_ADMIN_PRIVATE_KEY_ID = 'FIREBASE_ADMIN_PRIVATE_KEY_ID';
  public static readonly FIREBASE_ADMIN_PRIVATE_KEY = 'FIREBASE_ADMIN_PRIVATE_KEY';
  public static readonly FIREBASE_ADMIN_CLIENT_EMAIL = 'FIREBASE_ADMIN_CLIENT_EMAIL';
  public static readonly FIREBASE_ADMIN_CLIENT_ID = 'FIREBASE_ADMIN_CLIENT_ID';
  public static readonly FIREBASE_ADMIN_AUTH_URI = 'FIREBASE_ADMIN_AUTH_URI';
  public static readonly FIREBASE_ADMIN_TOKEN_URI = 'FIREBASE_ADMIN_TOKEN_URI';
  public static readonly FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL = 'FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL';
  public static readonly FIREBASE_ADMIN_CLIENT_X509_CERT_URL = 'FIREBASE_ADMIN_CLIENT_X509_CERT_URL';

  // FIREBASE
  public static readonly FIREBASE_API_KEY = 'FIREBASE_API_KEY';
  public static readonly FIREBASE_AUTH_DOMAIN = 'FIREBASE_AUTH_DOMAIN';
  public static readonly FIREBASE_DATABASE_URL = 'FIREBASE_DATABASE_URL';
  public static readonly FIREBASE_PROJECT_ID = 'FIREBASE_PROJECT_ID';
  public static readonly FIREBASE_STORAGE_BUCKET = 'FIREBASE_STORAGE_BUCKET';
  public static readonly FIREBASE_MESSAGING_SENDER_ID = 'FIREBASE_MESSAGING_SENDER_ID';
  public static readonly FIREBASE_APP_ID = 'FIREBASE_APP_ID';
  public static readonly FIREBASE_MEASUREMENT_ID = 'FIREBASE_MEASUREMENT_ID';

  // UUID
  public static readonly UUID_V5_NAMESPACE = 'UUID_V5_NAMESPACE';

  //STRIPE
  public static readonly STRIPE_SECRET_KEY = 'STRIPE_SECRET_KEY';
  public static readonly STRIPE_PUBLIC_KEY = 'STRIPE_PUBLIC_KEY';

  //STUART
  public static readonly STUART_API_CLIENT_ID = 'STUART_API_CLIENT_ID';
  public static readonly STUART_API_CLIENT_SECRET = 'STUART_API_CLIENT_SECRET';
  public static readonly STUART_API_VALIDATE_ADDRESS_URL = '/v2/addresses/validate';
  public static readonly STUART_API_CREATE_JOB_URL = '/v2/jobs';
  public static readonly STUART_API_CALCULATE_JOB_PRICE_URL = '/v2/jobs/pricing';

  public static readonly DELIVERY_SERVICE = 'DELIVERY_SERVICE';
  public static readonly DELIVERY_SERVICE_STUART = 'stuart';

  // WINSTON
  public static readonly WINSTON_LOG_FILE_NAME = 'WINSTON_LOG_FILE_NAME';
  public static readonly WINSTON_LOG_ERROR_FILE_NAME = 'WINSTON_LOG_ERROR_FILE_NAME';

  // PUB-SUB
  public static readonly PUB_SUB = 'PUB_SUB';
  public static readonly END_POINT = 'graphql';
}
