const { TechService } = require('../../services');

const loadTech = async (req, res, next) => {
  const { techUuid } = req.params;
  const tech = await TechService.getTechByUuid(techUuid);

  if (!tech) {
    const err = new Error('Tech not found');
    err.status = 404;
    throw err;
  }

  res.locals.tech = tech;
  next();
};

module.exports = { loadTech };
