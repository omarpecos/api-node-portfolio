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

const createProject = (Project) => (userUuid, newProject) =>
  Project.create({ ...newProject, userId: userUuid });

const updateProject = (Project) => (projectUuid, data) => {
  return Project.findOneAndUpdate({ _id: projectUuid }, data, {
    new: true,
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
    createProject: createProject(Project),
    updateProject: updateProject(Project),
    deleteProject: deleteProject(Project),
  };
};
