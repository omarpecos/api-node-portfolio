const { Technology, Profile, Course, Project } = require('../models');
const TechService = require('./technology.service');
const ProfileService = require('./profile.service');
const CourseService = require('./course.service');
const ProjectService = require('./project.service');

module.exports = {
  TechService: TechService(Technology),
  ProfileService: ProfileService(Profile),
  CourseService: CourseService(Course),
  ProjectService: ProjectService(Project),
};
