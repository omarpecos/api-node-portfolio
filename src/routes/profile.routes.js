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

  let profile;

  if (newProfile._id == null) {
    //create new profile
    newProfile._id = mongo.ObjectId();
    newProfile.userId = userId;
  } else {
    // is editing existing profile
    profile = await ProfileService.getOneProfileById(newProfile._id);

    if (!profile) {
      const err = new Error('Profile not found');
      err.status = 404;
      throw err;
    }

    if (profile.userId != userId) {
      const err = new Error('Unathorized - This is not your profile');
      err.status = 403;
      throw err;
    }
  }

  profile = await ProfileService.createOrUpdateProfile(newProfile);

  res.status(200).json({
    status: 'success',
    data: profile,
  });
});

module.exports = profileRouter;
