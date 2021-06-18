const { Schema, model } = require('mongoose');
const sortBy = require('lodash/sortBy');

const projectSchema = new Schema({
  name: String,
  type: String,
  userId: String,
  techs: [{ type: Schema.Types.ObjectId, ref: 'Technology' }],
  images: [String],
  description: String,
  url: String,
  repo_url: String,
  files: [String],
  pinned: { type: Boolean, default: false },
});

projectSchema.methods.toJSON = function () {
  const project = this.toObject();
  const techs = sortBy(project.techs, ['type']);
  project.techs = techs;
  return project;
};

const Project = new model('Project', projectSchema);

module.exports = Project;
