const { ProfileService } = require('../../services');

const loadProfile = async (req, res, next) => {
  const { profileUuid } = req.params;

  const profile = await ProfileService.getOneProfileById(profileUuid);

  if (!profile) {
    const err = new Error('Profile not found');
    err.status = 404;
    throw err;
  }

  res.locals.profile = profile;
  next();
};

const canEditProfile = (req, res, next) => {
  const { user } = req;
  const { profile } = res.locals;

  if (profile.userId !== user._id) {
    const err = new Error('Unathorized - This is not your profile');
    err.status = 403;
    throw err;
  }

  next();
};

module.exports = {
  loadProfile,
  canEditProfile,
};
