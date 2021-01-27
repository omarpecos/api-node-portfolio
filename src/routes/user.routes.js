const { Router } = require('express');
const { UserService } = require('../services');

const {
  AuthorizationMiddleware,
  AuthenticationMiddleware,
} = require('../middlewares');

const userRouter = new Router();

/*userRouter.get('/private', AuthenticationMiddleware, async (req, res) => {
  res.json({
    status: 'success',
    data: 'private route - only authorizated users',
  });
});

userRouter.get(
  '/admin',
  [AuthenticationMiddleware, AuthorizationMiddleware],
  async (req, res) => {
    res.json({
      status: 'success',
      data: 'private for admin route - only authorizated users',
    });
  }
);*/

userRouter.get(
  '/',
  [AuthenticationMiddleware, AuthorizationMiddleware],
  async (req, res) => {
    const users = await UserService.getAllUsers();

    res.json({
      status: 'success',
      data: users,
    });
  }
);

userRouter.post(
  '/:id/admin',
  [AuthenticationMiddleware, AuthorizationMiddleware],
  async (req, res) => {
    const { id } = req.params;
    const { admin } = req.body;
    const user = await UserService.getOneUserById(id);

    if (!user) {
      const err = new Error('User not found');
      err.status = 404;
      throw err;
    }

    let rol = admin == true ? 1 : 0;
    user.role = rol;
    await user.save();

    res.json({
      status: 'success',
      data: user,
    });
  }
);

userRouter.delete(
  '/:id',
  [AuthenticationMiddleware, AuthorizationMiddleware],
  async (req, res) => {
    const { id } = req.params;

    const user = await UserService.getOneUserByIdAndDelete(id);

    if (!user) {
      const err = new Error('User not found');
      err.status = 404;
      throw err;
    }

    res.json({
      status: 'success',
      data: user,
    });
  }
);

module.exports = userRouter;
