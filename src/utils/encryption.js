const crypto = require('crypto');
const { hashSync, compareSync } = require('bcrypt');

const hashPassword = (pass) => {
  return hashSync(pass, 10);
};

const comparePasswords = (pass, hash) => {
  return compareSync(pass, hash);
};

const createCryptoToken = (data, algorithm = 'sha256') =>
  crypto.createHash(algorithm).update(data).digest('hex');

module.exports = {
  hashPassword,
  comparePasswords,
  createCryptoToken,
};
