const { Router } = require('express');
const { mongo } = require('mongoose');
const { ProjectService } = require('../services');
const { AuthenticationMiddleware } = require('../middlewares');

const projectRouter = new Router();

projectRouter.get('/', AuthenticationMiddleware, async (req, res) => {
  const {
    user: { _id: userId },
  } = req;

  const projects = await ProjectService.getAllProjects(userId);

  res.status(200).json({
    status: 'success',
    data: projects,
  });
});

projectRouter.post('/', AuthenticationMiddleware, async (req, res) => {
  const {
    user: { _id: userId },
  } = req;
  const { body: newProject } = req;

  let project;

  if (newProject._id == null) {
    //creating new Project
    newProject._id = mongo.ObjectId();
    newProject.userId = userId;
  } else {
    // is editing existing project
    project = await ProjectService.getOneProject(newProject._id);

    if (!project) {
      const err = new Error('Project not found');
      err.status = 404;
      throw err;
    }

    if (project.userId != userId) {
      const err = new Error('Unathorized - This is not your project');
      err.status = 403;
      throw err;
    }
  }

  project = await ProjectService.createOrUpdateProject(newProject);

  res.status(200).json({
    status: 'success',
    data: project,
  });
});

projectRouter.delete('/:id', AuthenticationMiddleware, async (req, res) => {
  const {
    user: { _id: userId },
  } = req;
  const { id } = req.params;

  let project = await ProjectService.getOneProject(id);

  if (!project) {
    const err = new Error('Project not found');
    err.status = 404;
    throw err;
  }

  if (project.userId != userId) {
    const err = new Error('Unathorized');
    err.status = 403;
    throw err;
  }

  project = await ProjectService.deleteProject(id);

  res.status(200).json({
    status: 'success',
    data: project,
  });
});

module.exports = projectRouter;
