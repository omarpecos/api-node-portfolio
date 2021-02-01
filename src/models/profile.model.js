const { Schema, model } = require('mongoose');

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

const Profile = new model('Profile', profileSchema);

module.exports = Profile;
