const { Technology, Profile, Course } = require('../models');
const TechService = require('./technology.service');
const ProfileService = require('./profile.service');
const CourseService = require('./course.service');

module.exports = {
  TechService: TechService(Technology),
  ProfileService: ProfileService(Profile),
  CourseService: CourseService(Course),
};
