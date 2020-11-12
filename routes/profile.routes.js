const {Router} = require('express')
const {Profile} = require('../models')

const profileRouter = new Router();

profileRouter.get('/', async (req,res) =>{
     // can search for the profile with the highest version
    const profile = await Profile.find({}).sort('-_id').limit(1)
        .populate("about.skills.tech", "name type -_id");
  
    res.status(200).json({
        status : 'success',
        data : profile
    })
})

profileRouter.post('/' , async (req,res) =>{
    try {
        var newProfile = req.body;
        const profile = await Profile.create(newProfile);

        res.status(200).json({
            status : 'success',
            data : profile
        })

    } catch (error) {
        res.status(error.code).json({
            status : 'error',
            error,
            data : null
        })
    }
})

module.exports = profileRouter
