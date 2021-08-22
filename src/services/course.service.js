const getAllCourses = (Course) => (userId, query) => {
  const q = Course.find({ userId })
    .sort(query.sort)
    .populate('techs', 'name type icon _id');
  if (!query.all) {
    return q.skip(query.skip).limit(query.limit);
  }
  return q;
};

const countCourses = (Course) => () => {
  return Course.countDocuments();
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
    countCourses: countCourses(Course),
    createCourse: createCourse(Course),
    updateCourse: updateCourse(Course),
    deleteCourse: deleteCourse(Course),
    getOneCourse: getOneCourse(Course),
  };
};
