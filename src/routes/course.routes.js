const { Router } = require('express');
const { PAGINATION_TYPES } = require('../constants');

const { CourseController } = require('../controllers');
const {
  AuthenticationMiddleware,
  courseMiddleware: middleware,
  AdvancedResultsMiddleware,
} = require('../middlewares');

const courseRouter = new Router();

courseRouter.get(
  '/',
  AuthenticationMiddleware,
  AdvancedResultsMiddleware(PAGINATION_TYPES.COURSES.type),
  CourseController.getAllCourses
);

courseRouter.post('/', AuthenticationMiddleware, CourseController.createCourse);

courseRouter.put(
  '/:courseUuid',
  [AuthenticationMiddleware, middleware.loadCourse, middleware.canEditCourse],
  CourseController.updateCourse
);

courseRouter.delete(
  '/:courseUuid',
  [AuthenticationMiddleware, middleware.loadCourse, middleware.canEditCourse],
  CourseController.deleteCourse
);

module.exports = courseRouter;
