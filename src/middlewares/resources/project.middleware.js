const { ProjectService } = require('../../services');

const loadProject = async (req, res, next) => {
  const { projectUuid } = req.params;

  const project = await ProjectService.getOneProject(projectUuid);

  if (!project) {
    const err = new Error('Project not found');
    err.status = 404;
    throw err;
  }

  res.locals.project = project;
  next();
};

const canEditProject = (req, res, next) => {
  const { user } = req;
  const { project } = res.locals;

  if (user._id !== project.userId) {
    const err = new Error('Unauthorized - This is not your project');
    err.status = 403;
    throw err;
  }

  next();
};

module.exports = {
  loadProject,
  canEditProject,
};
