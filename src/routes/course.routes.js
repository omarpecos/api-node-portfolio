const { Router } = require('express');

const { CourseController } = require('../controllers');
const {
  AuthenticationMiddleware,
  courseMiddleware: middleware,
} = require('../middlewares');

const courseRouter = new Router();

courseRouter.get('/', AuthenticationMiddleware, CourseController.getAllCourses);

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
