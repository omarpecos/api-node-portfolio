const getAllTechs = (Technology) => () => {
  return Technology.find({}).sort('type');
};

const getTechByUuid = (Technology) => (techUuid) =>
  Technology.findById(techUuid);

const createTech = (Technology) => (data) => Technology.create(data);
const updateTech = (Technology) => (techUuid, data) =>
  Technology.findByIdAndUpdate(techUuid, data, {
    new: true,
    runValidators: true,
  });

const deleteTech = (Technology) => (techUuid) =>
  Technology.deleteOne({ _id: techUuid });

module.exports = (Technology) => {
  return {
    getAllTechs: getAllTechs(Technology),
    getTechByUuid: getTechByUuid(Technology),
    createTech: createTech(Technology),
    updateTech: updateTech(Technology),
    deleteTech: deleteTech(Technology),
  };
};
