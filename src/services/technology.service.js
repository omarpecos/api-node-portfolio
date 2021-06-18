const getAllTechs = (Technology) => () => {
  return Technology.find({}).sort('type');
};

const createOrUpdateTech = (Technology) => (newTech) => {
  return Technology.findOneAndUpdate({ _id: newTech._id }, newTech, {
    upsert: true,
    new: true,
  });
};

const deleteTech = (Technology) => (id) => {
  return Technology.findByIdAndDelete(id);
};

module.exports = (Technology) => {
  return {
    getAllTechs: getAllTechs(Technology),
    createOrUpdateTech: createOrUpdateTech(Technology),
    deleteTech: deleteTech(Technology),
  };
};
