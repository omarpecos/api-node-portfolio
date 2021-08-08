const { Router } = require('express');
const {
  AuthenticationMiddleware,
  profileMiddleware: middleware,
} = require('../middlewares');
const { ProfileController } = require('../controllers');

const profileRouter = new Router();

profileRouter.get('/', AuthenticationMiddleware, ProfileController.getProfile);

profileRouter.post(
  '/',
  AuthenticationMiddleware,
  ProfileController.createProfile
);
profileRouter.put(
  '/:profileUuid',
  [AuthenticationMiddleware, middleware.loadProfile, middleware.canEditProfile],
  ProfileController.updateProfile
);

module.exports = profileRouter;
