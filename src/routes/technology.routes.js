const { Router } = require('express');
const { TechController } = require('../controllers');
const {
  AuthenticationMiddleware,
  AuthorizationMiddleware,
} = require('../middlewares');
const { techMiddleware: middleware } = require('../middlewares/resources');

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
