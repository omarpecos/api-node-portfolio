const { Router } = require('express');

const {
  AuthenticationMiddleware,
  projectMiddleware: middleware,
  AdvancedResultsMiddleware,
} = require('../middlewares');
const { ProjectController } = require('../controllers');
const { PAGINATION_TYPES } = require('../constants');

const projectRouter = new Router();

projectRouter.get(
  '/',
  AuthenticationMiddleware,
  AdvancedResultsMiddleware(PAGINATION_TYPES.PROJECTS.type),
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
