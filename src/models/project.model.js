const { Schema, model } = require('mongoose');

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

const Project = new model('Project', projectSchema);

module.exports = Project;
