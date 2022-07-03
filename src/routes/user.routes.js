const { Router } = require('express');
const { PAGINATION_TYPES } = require('../constants');
const { UserController } = require('../controllers');

const {
  AuthorizationMiddleware,
  AuthenticationMiddleware,
  userMiddleware: middleware,
  AdvancedResultsMiddleware,
} = require('../middlewares');

const userRouter = new Router();

userRouter.get(
  '/',
  [
    AuthenticationMiddleware,
    AuthorizationMiddleware,
    AdvancedResultsMiddleware(PAGINATION_TYPES.USERS.type),
  ],
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
