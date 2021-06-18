const { Schema, model } = require('mongoose');
const sortBy = require('lodash/sortBy');

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

courseSchema.methods.toJSON = function () {
  const course = this.toObject();
  const techs = sortBy(course.techs, ['type']);
  course.techs = techs;
  return course;
};
const Course = new model('Course', courseSchema);

module.exports = Course;
