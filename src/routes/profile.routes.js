const { Router } = require('express');
const { Profile } = require('../models');
const { mongo } = require('mongoose');

const profileRouter = new Router();

profileRouter.get('/', async (req, res) => {
  // can search for the profile with the highest version if version++ every time
  const profile = await Profile.findOne({})
    .sort('-_id')
    .populate('about.skills.tech', 'name type icon -_id');

  res.status(200).json({
    status: 'success',
    data: profile,
  });
});

profileRouter.post('/', async (req, res) => {
  const { body: newProfile } = req;
  if (newProfile._id == null) newProfile._id = mongo.ObjectId();

  const profile = await Profile.findOneAndUpdate(
    { _id: newProfile._id },
    newProfile,
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  res.status(200).json({
    status: 'success',
    data: profile,
  });
});

module.exports = profileRouter;
