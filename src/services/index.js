const { Technology, Profile, Course, Project, User } = require('../models');
const TechService = require('./technology.service');
const ProfileService = require('./profile.service');
const CourseService = require('./course.service');
const ProjectService = require('./project.service');
const AuthService = require('./auth.service');
const UserService = require('./user.service');

module.exports = {
  TechService: TechService(Technology),
  ProfileService: ProfileService(Profile),
  CourseService: CourseService(Course),
  ProjectService: ProjectService(Project),
  AuthService: AuthService(User),
  UserService: UserService(User),
};
