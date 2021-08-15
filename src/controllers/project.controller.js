const { ProjectService } = require('../services');

const getAllProjects = async (req, res) => {
  const {
    user: { _id: userId },
  } = req;

  const projects = await ProjectService.getAllProjects(userId);

  res.status(200).json({
    status: 'success',
    data: projects,
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
