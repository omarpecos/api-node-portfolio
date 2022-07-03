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

const createPaginatedData = (data, count, query) => {
  const totalPages =
    Math.floor(count / query.pagination.perPage) +
    (count % query.pagination.perPage > 0 ? 1 : 0);

  return {
    previous: query.pagination.page > 1,
    next: query.pagination.page < totalPages,
    page: query.pagination.page,
    perPage: query.pagination.perPage,
    totalPages: totalPages ? totalPages : 1, // no 0 totalPages
    rows: data,
  };
};

module.exports = {
  createDefaultUsers,
  createPaginatedData,
};
