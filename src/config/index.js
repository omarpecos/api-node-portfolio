require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 9000,
  MONGO_URI: process.env.MONGO_URI,
};
