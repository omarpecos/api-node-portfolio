const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const createToken = (data) => {
  let token = JWT.sign(data, JWT_SECRET, { expiresIn: '4h' });
  return token;
};

const verifyToken = (token) => JWT.verify(token, JWT_SECRET);

module.exports = {
  createToken,
  verifyToken,
};
