const { Router } = require('express');
const { mongo } = require('mongoose');
const { ProjectService } = require('../services');

const projectRouter = new Router();

projectRouter.get('/', async (req, res) => {
  const projects = await ProjectService.getAllProjects();

  res.status(200).json({
    status: 'success',
    data: projects,
  });
});

projectRouter.post('/', async (req, res) => {
  const { body: newProject } = req;
  if (newProject._id == null) newProject._id = mongo.ObjectId();

  const project = await ProjectService.createOrUpdateProject(newProject);

  res.status(200).json({
    status: 'success',
    data: project,
  });
});

projectRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const project = await ProjectService.deleteProject(id);
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
