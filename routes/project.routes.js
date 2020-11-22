const {Router} = require('express')
const {Project} = require('../models')
const {mongo} = require('mongoose');


const projectRouter = new Router();

projectRouter.get('/', async (req,res) =>{
    const projects = await Project.find({}).sort('-_id')
        .populate("techs", "name type _id");

    res.status(200).json({
        status : 'success',
        data : projects
    })
})

projectRouter.post('/', async (req,res) =>{
    try {
        var newProject = req.body;
        if (newProject._id == null)
             newProject._id = mongo.ObjectId();

        const project = await Project.findOneAndUpdate({ _id : newProject._id },newProject,{upsert: true, new: true,  setDefaultsOnInsert: true });

        res.status(200).json({
            status : 'success',
            data : project
        })
    } catch (error) {
        var status = error.status | 500;

        res.status(status).json({
            status : 'error',
            error : error.message,
            data : null
        })
    }
})

projectRouter.delete('/:id', async (req,res) =>{
    try {
        var id = req.params.id;
        const project = await Project.findByIdAndDelete(id);
        if (!project)
            throw new Error("404 - Element not found");

        res.status(200).json({
            status : 'success',
            data : project
        })
    } catch (error) {
        var status = error.status | 500;

        res.status(status).json({
            status : 'error',
            error : error.message,
            data : null
        })
    }
})

module.exports = projectRouter
