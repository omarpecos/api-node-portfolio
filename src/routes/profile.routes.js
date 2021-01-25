const { Router } = require('express');
const { mongo } = require('mongoose');
const { ProfileService } = require('../services');

const profileRouter = new Router();

profileRouter.get('/', async (req, res) => {
  const profile = await ProfileService.getProfile();

  res.status(200).json({
    status: 'success',
    data: profile,
  });
});

profileRouter.post('/', async (req, res) => {
  const { body: newProfile } = req;
  if (newProfile._id == null) newProfile._id = mongo.ObjectId();

  const profile = await ProfileService.createOrUpdateProfile(newProfile);

  res.status(200).json({
    status: 'success',
    data: profile,
  });
});

module.exports = profileRouter;
