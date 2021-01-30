const getAllCourses = (Course) => (userId) => {
  return Course.find({ userId })
    .sort('-_id')
    .populate('techs', 'name type icon _id');
};

const createOrUpdateCourse = (Course) => (newCourse) => {
  return Course.findOneAndUpdate({ _id: newCourse._id }, newCourse, {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
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
    createOrUpdateCourse: createOrUpdateCourse(Course),
    deleteCourse: deleteCourse(Course),
    getOneCourse: getOneCourse(Course),
  };
};
