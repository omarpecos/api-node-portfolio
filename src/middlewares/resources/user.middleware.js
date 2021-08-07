const { UserService } = require('../../services');

const loadUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await UserService.getOneUserById(id);

  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }

  res.locals.user = user;
  next();
};

module.exports = { loadUser };
