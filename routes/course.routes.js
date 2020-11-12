const {Router} = require('express');
const {Course} = require('./../models')

const courseRouter = new Router();

courseRouter.get('/', async (req,res) =>{
    const courses = await Course.find({}).sort('-_id')
        .populate("techs", "name type -_id");

    res.status(200).json({
        status : 'success',
        data : courses
    })
})

courseRouter.post('/', async (req,res) =>{
    try {
        var newCourse = req.body;
        const course = await Course.create(newCourse);

        res.status(200).json({
            status : 'success',
            data : course
        })
    } catch (error) {
        res.status(error.code).json({
            status : 'error',
            error,
            data : null
        })
    }
})

courseRouter.delete('/:id', async (req,res) =>{
    try {
        var id = req.params.id;
        const course = await Course.findByIdAndDelete(id);
        if (!course)
            throw new Error("404 - Element not found");

        res.status(200).json({
            status : 'success',
            data : course
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

module.exports = courseRouter