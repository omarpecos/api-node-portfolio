require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 9000,
  MONGO_URI: process.env.MONGO_URI,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  SWAGGER_PATH: `./config/swagger/${process.env.SWAGGER_DOC}.json`,
  MASTER_PASS: process.env.MASTER_PASS, // TODO - delete
};
