const { UserService } = require('../services');
const { hashPassword } = require('../utils');

const getAllUsers = async (req, res) => {
  const users = await UserService.getAllUsers();

  res.json({
    status: 'success',
    data: users,
  });
};

const makeAdmin = async (req, res) => {
  const { admin } = req.body;
  const { user } = res.locals;

  let rol = admin == true ? 1 : 0;
  user.role = rol;
  await user.save();

  res.json({
    status: 'success',
    data: user,
  });
};

const deleteUser = async (req, res) => {
  const { user } = res.locals;

  const userDeleted = await UserService.getOneUserByIdAndDelete(user.id);

  res.json({
    status: 'success',
    data: userDeleted,
  });
};

const updateUser = async (req, res) => {
  const {
    user: { _id: userId, role: userRole },
  } = req;
  const { body } = req;

  //trying to edit password
  if (body.password && body.passwordConfirmation) {
    if (body.password != body.passwordConfirmation)
      throw Error('The passwords do not match!');
  }

  let { user } = res.locals;

  if (user.id != userId && userRole == 0) {
    // a regular user is trying to edit other user profile
    const err = new Error('Unauthorized - This is not your profile');
    err.status = 403;
    throw err;
  }

  //trying to edit password
  if (body.password && body.passwordConfirmation) {
    const { password: pass } = body;
    const hashedPass = hashPassword(pass);
    body.password = hashedPass;
    delete body.passwordConfirmation;
  }

  if (body.role) delete body.role;

  user = await UserService.editOneUser(user.id, body);

  res.status(200).json({
    status: 'success',
    data: user,
  });
};

module.exports = {
  getAllUsers,
  makeAdmin,
  deleteUser,
  updateUser,
};
