const {Schema, model} = require('mongoose');

const TechSchema = new Schema({
    name : String,
    type : String,
    icon : String
});

const Technology = new model('Technology',TechSchema);

module.exports = Technology
