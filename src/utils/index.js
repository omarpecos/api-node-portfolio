const { hashSync, compareSync } = require('bcrypt');
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const hashPassword = (pass) => {
  return hashSync(pass, 10);
};

const comparePasswords = (pass, hash) => {
  return compareSync(pass, hash);
};

const createToken = (data) => {
  let token = JWT.sign(data, JWT_SECRET, { expiresIn: '4h' });
  return token;
};

module.exports = {
  hashPassword,
  comparePasswords,
  createToken,
};
