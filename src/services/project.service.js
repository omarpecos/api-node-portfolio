const getAllProjects = (Project) => () => {
  return Project.find({}).sort('-_id').populate('techs', 'name type icon  _id');
};

const createOrUpdateProject = (Project) => (newProject) => {
  return Project.findOneAndUpdate({ _id: newProject._id }, newProject, {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  });
};

const deleteProject = (Project) => (id) => {
  return Project.findByIdAndDelete(id);
};

module.exports = (Project) => {
  return {
    getAllProjects: getAllProjects(Project),
    createOrUpdateProject: createOrUpdateProject(Project),
    deleteProject: deleteProject(Project),
  };
};
