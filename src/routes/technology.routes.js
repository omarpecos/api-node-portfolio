const { Router } = require('express');

const { TechController } = require('../controllers');
const {
  AuthenticationMiddleware,
  AuthorizationMiddleware,
  techMiddleware: middleware,
  AdvancedResultsMiddleware,
} = require('../middlewares');
const { PAGINATION_TYPES } = require('../constants');

const techRouter = Router();

techRouter
  .route('/')
  .get(
    AdvancedResultsMiddleware(PAGINATION_TYPES.TECHNOLOGIES.type),
    TechController.listTechs
  )
  .post(
    AuthenticationMiddleware,
    AuthorizationMiddleware,
    TechController.createTech
  );

techRouter
  .route('/:techUuid')
  .put(
    AuthenticationMiddleware,
    AuthorizationMiddleware,
    middleware.loadTech,
    TechController.updateTech
  )
  .delete(
    AuthenticationMiddleware,
    AuthorizationMiddleware,
    middleware.loadTech,
    TechController.deleteTech
  );

module.exports = techRouter;
