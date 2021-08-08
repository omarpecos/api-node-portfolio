const { UserService } = require('../../services');

const loadUser = async (req, res, next) => {
  const { userUuid } = req.params;
  const user = await UserService.getOneUserById(userUuid);

  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }

  res.locals.user = user;
  next();
};

const canEditUser = async (req, res, next) => {
  const { user: authUser } = req;
  const { user } = res.locals;

  if (user.id !== authUser._id && authUser.role === 0) {
    // a regular user is trying to edit other user profile
    const err = new Error('Unauthorized - This is not your profile');
    err.status = 403;
    throw err;
  }

  next();
};

module.exports = { loadUser, canEditUser };
