const { Router } = require('express');
const { mongo } = require('mongoose');
const { CourseService } = require('../services');
const { AuthenticationMiddleware } = require('../middlewares');

const courseRouter = new Router();

courseRouter.get('/', AuthenticationMiddleware, async (req, res) => {
  const {
    user: { _id: userId },
  } = req;

  const courses = await CourseService.getAllCourses(userId);

  res.status(200).json({
    status: 'success',
    data: courses,
  });
});

courseRouter.post('/', AuthenticationMiddleware, async (req, res) => {
  const {
    user: { _id: userId },
  } = req;
  const { body: newCourse } = req;

  let course;

  if (newCourse._id == null) {
    // creating new course
    newCourse._id = mongo.ObjectId();
    newCourse.userId = userId;
  } else {
    // is editing existing course
    course = await CourseService.getOneCourse(newCourse._id);

    if (!course) {
      const err = new Error('Course not found');
      err.status = 404;
      throw err;
    }

    if (course.userId != userId) {
      const err = new Error('Unathorized - This is not your course');
      err.status = 403;
      throw err;
    }
  }

  course = await CourseService.createOrUpdateCourse(newCourse);

  res.status(200).json({
    status: 'success',
    data: course,
  });
});

courseRouter.delete('/:id', AuthenticationMiddleware, async (req, res) => {
  const {
    user: { _id: userId },
  } = req;

  const { id } = req.params;
  let course = await CourseService.getOneCourse(id);

  if (!course) {
    const err = new Error('Course not found');
    err.status = 404;
    throw err;
  }

  if (course.userId != userId) {
    const err = new Error('Unathorized');
    err.status = 403;
    throw err;
  }

  course = await CourseService.deleteCourse(id);

  res.status(200).json({
    status: 'success',
    data: course,
  });
});

module.exports = courseRouter;
