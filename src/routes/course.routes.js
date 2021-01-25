const { Router } = require('express');
const { Course } = require('./../models');
const { mongo } = require('mongoose');

const courseRouter = new Router();

courseRouter.get('/', async (req, res) => {
  const courses = await Course.find({})
    .sort('-_id')
    .populate('techs', 'name type icon _id');

  res.status(200).json({
    status: 'success',
    data: courses,
  });
});

courseRouter.post('/', async (req, res) => {
  const { body: newCourse } = req;
  if (newCourse._id == null) newCourse._id = mongo.ObjectId();

  const course = await Course.findOneAndUpdate(
    { _id: newCourse._id },
    newCourse,
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  res.status(200).json({
    status: 'success',
    data: course,
  });
});

courseRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const course = await Course.findByIdAndDelete(id);
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
