const getProfile = (Profile) => (userId) => {
  // can search for the profile with the highest version if version++ every time
  return Profile.findOne({
    userId,
  })
    .sort('-_id')
    .populate('about.skills.tech', 'name type icon -_id');
};

const getOneProfileById = (Profile) => (id) => {
  return Profile.findOne({
    _id: id,
  });
};

const createProfile = (Profile) => (userUuid, newProfile) => {
  return Profile.create({ ...newProfile, userId: userUuid });
};

const updateProfile = (Profile) => (profileUuid, profile) => {
  // TODO - must update new version ++ here not in front!
  return Profile.findOneAndUpdate({ _id: profileUuid }, profile, {
    new: true,
  });
};

module.exports = (Profile) => {
  return {
    getProfile: getProfile(Profile),
    getOneProfileById: getOneProfileById(Profile),
    createProfile: createProfile(Profile),
    updateProfile: updateProfile(Profile),
  };
};
