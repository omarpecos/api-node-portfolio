const { Technology, Profile } = require('../models');
const TechService = require('./technology.service');
const ProfileService = require('./profile.service');

module.exports = {
  TechService: TechService(Technology),
  ProfileService: ProfileService(Profile),
};
