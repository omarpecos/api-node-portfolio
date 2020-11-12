const {Technology} = require('./../models');
const {Router} = require('express');

const techRouter = Router();

techRouter.get('/', async (req,res) =>{
    const techs = await Technology.find({});
    
    res.status(200).json({
        status : 'success',
        data : techs
    })
})

techRouter.post('/', async (req,res) =>{
    try {
        var newTech = req.body;
        const tech = await Technology.create(newTech);

        res.status(200).json({
            status : 'success',
            data : tech
        })
    } catch (error) {
        res.status(error.code).json({
            status : 'error',
            error,
            data : null
        })
    }
})

techRouter.delete('/:id', async (req,res) =>{
    try {
        var id = req.params.id;
        const tech = await Technology.findByIdAndDelete(id);
        if (!tech)
            throw new Error("404 - Element not found");

        res.status(200).json({
            status : 'success',
            data : tech
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

module.exports = techRouter
