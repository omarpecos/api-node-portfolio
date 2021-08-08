const { CourseService } = require('../services');

const getAllCourses = async (req, res) => {
  const {
    user: { _id: userId },
  } = req;

  const courses = await CourseService.getAllCourses(userId);

  res.status(200).json({
    status: 'success',
    data: courses,
  });
};

const createCourse = async (req, res) => {
  const {
    user: { _id: userId },
    body: newCourse,
  } = req;

  const course = await CourseService.createCourse(userId, newCourse);

  res.status(200).json({
    status: 'success',
    data: course,
  });
};

const updateCourse = async (req, res) => {
  const { body: data } = req;
  const { course } = res.locals;

  const editedCourse = await CourseService.updateCourse(course.id, data);

  res.status(200).json({
    status: 'success',
    data: editedCourse,
  });
};

const deleteCourse = async (req, res) => {
  const { courseUuid } = req.params;

  course = await CourseService.deleteCourse(courseUuid);

  res.status(200).json({
    status: 'success',
    data: course,
  });
};

module.exports = {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
};
