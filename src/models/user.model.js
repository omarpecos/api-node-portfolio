const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  nickname: String,
  email: String,
  password: String,
  role: { type: Number, default: 0 },
});

userSchema.methods.toJSON = function () {
  let user = this.toObject();
  delete user.password;
  return user;
};

const User = new model('User', userSchema);

module.exports = User;
