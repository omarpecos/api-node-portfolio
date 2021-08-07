const { Router } = require('express');
const { UserController } = require('../controllers');

const {
  AuthorizationMiddleware,
  AuthenticationMiddleware,
  userMiddleware: middleware,
} = require('../middlewares');

const userRouter = new Router();

userRouter.get(
  '/',
  [AuthenticationMiddleware, AuthorizationMiddleware],
  UserController.getAllUsers
);

userRouter.patch(
  '/:id/admin',
  [AuthenticationMiddleware, AuthorizationMiddleware, middleware.loadUser],
  UserController.makeAdmin
);

userRouter.delete(
  '/:id',
  [AuthenticationMiddleware, AuthorizationMiddleware, middleware.loadUser],
  UserController.deleteUser
);

userRouter.put(
  '/:id',
  [AuthenticationMiddleware, middleware.loadUser],
  UserController.updateUser
);

module.exports = userRouter;
