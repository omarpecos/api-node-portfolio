const { Schema, model } = require('mongoose');
const orderBy = require('lodash/orderBy');

const profileSchema = new Schema({
  intro: String,
  userId: String,
  about: {
    text: String,
    skills: [
      {
        tech: { type: Schema.Types.ObjectId, ref: 'Technology' },
        percentage: Number,
      },
    ],
  },
  version: Number,
});

profileSchema.methods.toJSON = function () {
  const profile = this.toObject();
  //lodash orderBy
  const skills = orderBy(
    profile.about.skills,
    ['tech.type', 'percentage'],
    ['asc', 'desc']
  );
  profile.about.skills = skills;
  return profile;
};

const Profile = new model('Profile', profileSchema);

module.exports = Profile;
