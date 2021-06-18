const getAllProjects = (Project) => (userId) => {
  return Project.find({
    userId,
  })
    .sort([
      ['type', 'asc'],
      ['_id', 'desc'],
    ])
    .populate('techs', 'name type icon  _id');
};

const createOrUpdateProject = (Project) => (newProject) => {
  return Project.findOneAndUpdate({ _id: newProject._id }, newProject, {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  });
};

const deleteProject = (Project) => (id) => {
  return Project.deleteOne({ _id: id });
};

const getOneProject = (Project) => (id) => {
  return Project.findById(id);
};

module.exports = (Project) => {
  return {
    getAllProjects: getAllProjects(Project),
    getOneProject: getOneProject(Project),
    createOrUpdateProject: createOrUpdateProject(Project),
    deleteProject: deleteProject(Project),
  };
};
