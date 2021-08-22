const getAllProjects = (Project) => (userId, query) => {
  const q = Project.find({
    userId,
  })
    .sort(query.sort)
    .populate('techs', 'name type icon  _id');

  if (!query.all) {
    return q.skip(query.skip).limit(query.limit);
  }
  return q;
};

const countProjects = (Project) => () => Project.countDocuments();

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
    countProjects: countProjects(Project),
    getOneProject: getOneProject(Project),
    createProject: createProject(Project),
    updateProject: updateProject(Project),
    deleteProject: deleteProject(Project),
  };
};
