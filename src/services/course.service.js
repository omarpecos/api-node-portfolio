const getAllCourses = (Course) => (userId) => {
  return Course.find({ userId })
    .sort('-_id')
    .populate('techs', 'name type icon _id');
};

const createCourse = (Course) => (userUuid, newCourse) =>
  Course.create({ ...newCourse, userId: userUuid });

const updateCourse = (Course) => (courseUuid, data) => {
  return Course.findOneAndUpdate({ _id: courseUuid }, data, {
    new: true,
  });
};

const deleteCourse = (Course) => (id) => {
  return Course.deleteOne({ _id: id });
};

const getOneCourse = (Course) => (id) => {
  return Course.findById(id);
};

module.exports = (Course) => {
  return {
    getAllCourses: getAllCourses(Course),
    createCourse: createCourse(Course),
    updateCourse: updateCourse(Course),
    deleteCourse: deleteCourse(Course),
    getOneCourse: getOneCourse(Course),
  };
};
