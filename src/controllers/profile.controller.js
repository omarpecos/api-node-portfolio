const { ProfileService } = require('../services');

const getProfile = async (req, res) => {
  const {
    user: { _id: userId },
  } = req;

  const profile = await ProfileService.getProfile(userId);

  res.status(200).json({
    status: 'success',
    data: profile,
  });
};

const createProfile = async (req, res) => {
  const { body, user } = req;

  const profile = await ProfileService.createProfile(user._id, body);

  res.status(200).json({
    status: 'success',
    data: profile,
  });
};

const updateProfile = async (req, res) => {
  const {
    body: profileData,
    params: { profileUuid },
  } = req;

  const profileUpdated = await ProfileService.updateProfile(
    profileUuid,
    profileData
  );

  res.status(200).json({
    status: 'success',
    data: profileUpdated,
  });
};

module.exports = {
  getProfile,
  createProfile,
  updateProfile,
};
