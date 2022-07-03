const { ProjectService } = require('../services');
const { createPaginatedData } = require('../utils/helpers');

const getAllProjects = async (req, res) => {
  const {
    user: { _id: userId },
  } = req;
  const { query } = res.locals;

  const projects = await ProjectService.getAllProjects(userId, query);
  const count = await ProjectService.countProjects();

  const data = query.all
    ? projects
    : createPaginatedData(projects, count, query);

  res.status(200).json({
    status: 'success',
    data,
  });
};

const createProject = async (req, res) => {
  const { user, body: newProject } = req;

  const project = await ProjectService.createProject(user._id, newProject);

  res.status(200).json({
    status: 'success',
    data: project,
  });
};

const updateProject = async (req, res) => {
  const {
    body: data,
    params: { projectUuid },
  } = req;

  const editedProject = await ProjectService.updateProject(projectUuid, data);

  res.status(200).json({
    status: 'success',
    data: editedProject,
  });
};

const deleteProject = async (req, res) => {
  const { projectUuid } = req.params;

  const project = await ProjectService.deleteProject(projectUuid);

  res.status(200).json({
    status: 'success',
    data: project,
  });
};

module.exports = {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
};
