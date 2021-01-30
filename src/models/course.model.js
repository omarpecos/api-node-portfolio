const { Schema, model } = require('mongoose');

const courseSchema = new Schema({
  userId: { type: String, default: null },
  name: String,
  platform: String,
  url: String,
  language: String,
  duration: Number,
  techs: [{ type: Schema.Types.ObjectId, ref: 'Technology' }],
  done: Boolean,
  description: String,
});

const Course = new model('Course', courseSchema);

module.exports = Course;
