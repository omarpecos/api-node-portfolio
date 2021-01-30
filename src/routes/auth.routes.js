const { Router } = require('express');
const { AuthService, UserService } = require('../services');
const { hashPassword, comparePasswords, createToken } = require('../utils');

const authRouter = new Router();

authRouter.post('/register', async (req, res) => {
  const { body } = req;
  if (!body.password || !body.passwordConfirmation) {
    throw Error('You must provide valid passwords');
  } else {
    if (body.password != body.passwordConfirmation)
      throw Error('The passwords do not match!');
  }

  const userWithThatEmail = await UserService.getUserByEmail(body.email);
  if (userWithThatEmail) throw Error('That email is already taken!');

  const { password: pass } = body;
  const hashedPass = hashPassword(pass);
  body.password = hashedPass;
  delete body.passwordConfirmation;

  const user = await AuthService.doSignUp(body);

  res.status(201).json({
    status: 'success',
    data: user,
  });
});

authRouter.post('/login', async (req, res) => {
  const { body } = req;

  if (!body.email || !body.password)
    throw Error('You must provide valid input');

  const user = await UserService.getUserByEmail(body.email);
  if (!user) throw new Error('User do not exist');

  const validPassword = comparePasswords(body.password, user.password);

  if (!validPassword) throw new Error('Incorrect Password');

  decoded = user.toObject();
  delete decoded.password;

  const token = createToken(decoded);

  res.json({
    status: 'success',
    data: {
      token,
      user: decoded,
    },
  });
});

module.exports = authRouter;
