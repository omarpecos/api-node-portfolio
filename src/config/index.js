require('dotenv').config();

//EMAIL_PROD = [0,1]
const EMAIL_IN_PROD_MODE = !!parseInt(process.env.EMAIL_PROD);
const EMAIL_SMTP_CONFIG = {
  SMTP_HOST: EMAIL_IN_PROD_MODE
    ? process.env.SMTP_HOST
    : process.env.SMTP_HOST_DEV,
  SMTP_PORT: EMAIL_IN_PROD_MODE
    ? process.env.SMTP_PORT
    : process.env.SMTP_PORT_DEV,
  SMTP_USER: EMAIL_IN_PROD_MODE
    ? process.env.SMTP_USER
    : process.env.SMTP_USER_DEV,
  SMTP_PASSWORD: EMAIL_IN_PROD_MODE
    ? process.env.SMTP_PASSWORD
    : process.env.SMTP_PASSWORD_DEV,
};

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 9000,
  MONGO_URI: process.env.MONGO_URI,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  SWAGGER_PATH: `./config/swagger/${process.env.SWAGGER_DOC}.json`,
  MASTER_PASS: process.env.MASTER_PASS, // using for default created admin password
  // email smtp config
  ...EMAIL_SMTP_CONFIG,
  EMAIL_IN_PROD_MODE,
  FRONT_URL: process.env.FRONT_URL,
};
