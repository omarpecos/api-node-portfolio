const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  nickname: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: Number, default: 0 },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordTokenExpiration: {
    type: Date,
  },
});

userSchema.methods.toJSON = function () {
  let user = this.toObject();
  delete user.password;
  delete user.resetPasswordToken;
  delete user.resetPasswordTokenExpiration;

  return user;
};

const User = new model('User', userSchema);

module.exports = User;
