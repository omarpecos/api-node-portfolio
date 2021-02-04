const { hashSync, compareSync } = require('bcrypt');
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { User } = require('../models');

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

const createDefaultUsers = async () =>{
  const usersCount = await User.countDocuments();

  if (usersCount == 0){
    let adminPassword = hashPassword('omar');
    let userPassword = hashPassword('user');

    await User.create({
      nickname: 'omarpv',
      email: 'o@o.com',
      role : 1,
      password : adminPassword
    })

    await User.create({
      nickname: 'user',
      email: 'user@user.com',
      role : 0,
      password : userPassword
    })
  }
}

module.exports = {
  hashPassword,
  comparePasswords,
  createToken,
  createDefaultUsers
};
