const { Router } = require('express');
const { mongo } = require('mongoose');
const { ProfileService } = require('../services');
const { AuthenticationMiddleware } = require('../middlewares');

const profileRouter = new Router();

profileRouter.get('/', AuthenticationMiddleware, async (req, res) => {
  const {
    user: { _id: userId },
  } = req;

  const profile = await ProfileService.getProfile(userId);

  res.status(200).json({
    status: 'success',
    data: profile,
  });
});

profileRouter.post('/', AuthenticationMiddleware, async (req, res) => {
  const {
    user: { _id: userId },
  } = req;
  const { body: newProfile } = req;

  if (newProfile._id == null) newProfile._id = mongo.ObjectId();

  newProfile.userId = userId;

  const profile = await ProfileService.createOrUpdateProfile(newProfile);

  res.status(200).json({
    status: 'success',
    data: profile,
  });
});

module.exports = profileRouter;
