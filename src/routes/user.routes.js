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
  '/:userUuid/admin',
  [AuthenticationMiddleware, AuthorizationMiddleware, middleware.loadUser],
  UserController.makeAdmin
);

userRouter.delete(
  '/:userUuid',
  [AuthenticationMiddleware, AuthorizationMiddleware, middleware.loadUser],
  UserController.deleteUser
);

userRouter.put(
  '/:userUuid',
  [AuthenticationMiddleware, middleware.loadUser, middleware.canEditUser],
  UserController.updateUser
);

module.exports = userRouter;
