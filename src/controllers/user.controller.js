const { UserService } = require('../services');
const { hashPassword } = require('../utils/encryption');
const { createPaginatedData } = require('../utils/helpers');

const getAllUsers = async (req, res) => {
  const { query } = res.locals;

  const users = await UserService.getAllUsers(query);
  const count = await UserService.countUsers();

  const data = query.all ? users : createPaginatedData(users, count, query);

  res.json({
    status: 'success',
    paginated: !query.all ? true : undefined,
    data,
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
    body,
    params: { userUuid },
  } = req;

  //trying to edit password
  if (body.password && body.passwordConfirmation) {
    if (body.password !== body.passwordConfirmation) {
      throw new Error('The passwords do not match!');
    }

    const { password: pass } = body;
    const hashedPass = hashPassword(pass);
    body.password = hashedPass;
    delete body.passwordConfirmation;
  }

  if (body.role) delete body.role;

  const user = await UserService.editOneUser(userUuid, body);

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
