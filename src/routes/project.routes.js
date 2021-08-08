const { Router } = require('express');

const {
  AuthenticationMiddleware,
  projectMiddleware: middleware,
} = require('../middlewares');
const { ProjectController } = require('../controllers');

const projectRouter = new Router();

projectRouter.get(
  '/',
  AuthenticationMiddleware,
  ProjectController.getAllProjects
);

projectRouter.post(
  '/',
  AuthenticationMiddleware,
  ProjectController.createProject
);

projectRouter.put(
  '/:projectUuid',
  [AuthenticationMiddleware, middleware.loadProject, middleware.canEditProject],
  ProjectController.updateProject
);

projectRouter.delete(
  '/:projectUuid',
  [AuthenticationMiddleware, middleware.loadProject, middleware.canEditProject],
  ProjectController.deleteProject
);

module.exports = projectRouter;
