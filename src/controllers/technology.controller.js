const { TechService } = require('../services');
const { createPaginatedData } = require('../utils/helpers');

const listTechs = async (req, res) => {
  const { query } = res.locals;

  const techs = await TechService.getAllTechs(query);
  const count = await TechService.countTechs();

  const data = query.all ? techs : createPaginatedData(techs, count, query);

  res.status(200).json({
    status: 'success',
    paginated: !query.all ? true : undefined,
    data,
  });
};

const createTech = async (req, res) => {
  const { body: newTech } = req;
  const tech = await TechService.createTech(newTech);

  res.status(200).json({
    status: 'success',
    data: tech,
  });
};

const updateTech = async (req, res) => {
  const { tech } = res.locals;
  const { body: newTech } = req;

  const techUpdated = await TechService.updateTech(tech._id, newTech);

  res.status(200).json({
    status: 'success',
    data: techUpdated,
  });
};

const deleteTech = async (req, res) => {
  const { tech } = res.locals;
  await TechService.deleteTech(tech._id);

  res.status(204).json({});
};

module.exports = {
  listTechs,
  createTech,
  updateTech,
  deleteTech,
};
