const { Router } = require('express');
const { Project } = require('../models');
const { mongo } = require('mongoose');

const projectRouter = new Router();

projectRouter.get('/', async (req, res) => {
  const projects = await Project.find({})
    .sort('-_id')
    .populate('techs', 'name type icon  _id');

  res.status(200).json({
    status: 'success',
    data: projects,
  });
});

projectRouter.post('/', async (req, res) => {
  const { body: newProject } = req;
  if (newProject._id == null) newProject._id = mongo.ObjectId();

  const project = await Project.findOneAndUpdate(
    { _id: newProject._id },
    newProject,
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  res.status(200).json({
    status: 'success',
    data: project,
  });
});

projectRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const project = await Project.findByIdAndDelete(id);
  if (!project) {
    const err = new Error('Project not found');
    err.status = 404;
    throw err;
  }

  res.status(200).json({
    status: 'success',
    data: project,
  });
});

module.exports = projectRouter;
