const { Router } = require('express');
const { mongo } = require('mongoose');
const { CourseService } = require('../services');

const courseRouter = new Router();

courseRouter.get('/', async (req, res) => {
  const courses = await CourseService.getAllCourses();

  res.status(200).json({
    status: 'success',
    data: courses,
  });
});

courseRouter.post('/', async (req, res) => {
  const { body: newCourse } = req;
  if (newCourse._id == null) newCourse._id = mongo.ObjectId();

  const course = await CourseService.createOrUpdateCourse(newCourse);

  res.status(200).json({
    status: 'success',
    data: course,
  });
});

courseRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const course = await CourseService.deleteCourse(id);
  if (!course) {
    const err = new Error('Course not found');
    err.status = 404;
    throw err;
  }

  res.status(200).json({
    status: 'success',
    data: course,
  });
});

module.exports = courseRouter;
