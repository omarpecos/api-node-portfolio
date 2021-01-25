const getProfile = (Profile) => () => {
  // can search for the profile with the highest version if version++ every time
  return Profile.findOne({})
    .sort('-_id')
    .populate('about.skills.tech', 'name type icon -_id');
};

const createOrUpdateProfile = (Profile) => (newProfile) => {
  return Profile.findOneAndUpdate({ _id: newProfile._id }, newProfile, {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  });
};

module.exports = (Profile) => {
  return {
    getProfile: getProfile(Profile),
    createOrUpdateProfile: createOrUpdateProfile(Profile),
  };
};
