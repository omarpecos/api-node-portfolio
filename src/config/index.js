require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 9000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  SWAGGER_PATH: `./config/swagger/${process.env.SWAGGER_DOC}.json`,
};
