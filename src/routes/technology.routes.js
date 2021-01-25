const { Technology } = require('./../models');
const { Router } = require('express');
const { mongo } = require('mongoose');

const techRouter = Router();

techRouter.get('/', async (req, res) => {
  const techs = await Technology.find({});

  res.status(200).json({
    status: 'success',
    data: techs,
  });
});

techRouter.post('/', async (req, res) => {
  const { body: newTech } = req;
  if (newTech._id == null) newTech._id = mongo.ObjectId();

  const tech = await Technology.findOneAndUpdate(
    { _id: newTech._id },
    newTech,
    { upsert: true, new: true }
  );

  res.status(200).json({
    status: 'success',
    data: tech,
  });
});

techRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const tech = await Technology.findByIdAndDelete(id);

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
