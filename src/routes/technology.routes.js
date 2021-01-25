const { Router } = require('express');
const { mongo } = require('mongoose');
const { TechService } = require('../services');

const techRouter = Router();

techRouter.get('/', async (req, res) => {
  const techs = await TechService.getAllTechs();

  res.status(200).json({
    status: 'success',
    data: techs,
  });
});

techRouter.post('/', async (req, res) => {
  const { body: newTech } = req;
  if (newTech._id == null) newTech._id = mongo.ObjectId();

  const tech = await TechService.createOrUpdateTech(newTech);

  res.status(200).json({
    status: 'success',
    data: tech,
  });
});

techRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const tech = await TechService.deleteTech(id);

  if (!tech) {
    const err = new Error('Tech not found');
    err.status = 404;
    throw err;
  }

  res.status(200).json({
    status: 'success',
    data: tech,
  });
});

module.exports = techRouter;
