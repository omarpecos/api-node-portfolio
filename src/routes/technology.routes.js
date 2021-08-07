const { Router } = require('express');
const { TechController } = require('../controllers');
const {
  AuthenticationMiddleware,
  AuthorizationMiddleware,
  techMiddleware: middleware,
} = require('../middlewares');

const techRouter = Router();

techRouter
  .route('/')
  .get(TechController.listTechs)
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
