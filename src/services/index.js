const { Technology } = require('../models');
const TechService = require('./technology.service');

module.exports = {
  TechService: TechService(Technology),
};
