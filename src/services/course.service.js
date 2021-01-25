const getAllCourses = (Course) => () => {
  return Course.find({}).sort('-_id').populate('techs', 'name type icon _id');
};

const createOrUpdateCourse = (Course) => (newCourse) => {
  return Course.findOneAndUpdate({ _id: newCourse._id }, newCourse, {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  });
};

const deleteCourse = (Course) => (id) => {
  return Course.findByIdAndDelete(id);
};

module.exports = (Course) => {
  return {
    getAllCourses: getAllCourses(Course),
    createOrUpdateCourse: createOrUpdateCourse(Course),
    deleteCourse: deleteCourse(Course),
  };
};
