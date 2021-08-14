const { MASTER_PASS } = require('../config');
const { User } = require('../models');

const createDefaultUsers = async () => {
  const usersCount = await User.countDocuments();

  if (usersCount == 0) {
    let adminPassword = hashPassword(MASTER_PASS);
    let userPassword = hashPassword('user');

    await User.create({
      nickname: 'omarpv',
      email: 'o@o.com',
      role: 1,
      password: adminPassword,
    });

    await User.create({
      nickname: 'user',
      email: 'user@user.com',
      role: 0,
      password: userPassword,
    });
  }
};

module.exports = {
  createDefaultUsers,
};
