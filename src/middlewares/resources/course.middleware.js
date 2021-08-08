const { CourseService } = require('../../services');

const loadCourse = async (req, res, next) => {
  const { courseUuid } = req.params;

  const course = await CourseService.getOneCourse(courseUuid);

  if (!course) {
    const err = new Error('Course not found');
    err.status = 404;
    throw err;
  }

  res.locals.course = course;
  next();
};

const canEditCourse = (req, res, next) => {
  const { user } = req;
  const { course } = res.locals;

  if (course.userId !== user._id) {
    const err = new Error('Unathorized - This is not your course');
    err.status = 403;
    throw err;
  }

  next();
};

module.exports = {
  loadCourse,
  canEditCourse,
};
