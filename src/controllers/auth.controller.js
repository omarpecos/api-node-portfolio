const { AuthService, UserService } = require('../services');

const {
  hashPassword,
  comparePasswords,
  createCryptoToken,
} = require('../utils/encryption');
const { createToken, verifyToken } = require('../utils/jwt');
const { sendEmail } = require('../utils/email');
const { EMAIL_TYPES } = require('../constants');

const register = async (req, res) => {
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

  body.role = 0;

  const user = await AuthService.doSignUp(body);

  res.status(201).json({
    status: 'success',
    data: user,
  });
};

const login = async (req, res) => {
  const { body } = req;

  if (!body.email || !body.password)
    throw Error('You must provide valid input');

  const user = await UserService.getUserByEmail(body.email);
  if (!user) throw new Error('User do not exist');

  const validPassword = comparePasswords(body.password, user.password);

  if (!validPassword) throw new Error('Incorrect Password');

  // Set resetToken to undefined if it has value
  if (user.resetPasswordToken) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiration = undefined;
    await user.save();
  }

  decoded = user.toObject();
  delete decoded.email;
  delete decoded.password;

  const token = createToken(decoded);

  res.json({
    status: 'success',
    data: {
      token,
      user: decoded,
    },
  });
};

const isAuthenticated = (req, res) => {
  let authenticated;

  const token = req.headers['authorization'];
  if (!token) {
    authenticated = false;
  } else {
    try {
      const decoded = verifyToken(token);

      authenticated = true;
    } catch (err) {
      authenticated = false;
    }
  }

  res.json({
    authenticated,
  });
};

const forgotPassword = async (req, res) => {
  // receive the email in body
  const { email } = req.body;

  // check user exists or error
  const user = await UserService.getUserByEmail(email);

  if (!user) {
    const err = new Error('Email provided is not valid');
    err.status = 400;
    throw err;
  }

  /* update user : resetPasswordToken, resetPasswordTokenExpiration */
  // generate crypto token
  const resetPasswordToken = createCryptoToken(`${user.email}${user.id}`);
  const now = new Date();
  const resetPasswordTokenExpiration = new Date(
    now.setHours(now.getHours() + 1)
  );

  user.resetPasswordToken = resetPasswordToken;
  user.resetPasswordTokenExpiration = resetPasswordTokenExpiration;
  await user.save();

  // send email with data and token url
  try {
    await sendEmail({
      data: { email, nickname: user.nickname, token: resetPasswordToken },
      type: EMAIL_TYPES.FORGOT_PASSWORD.type,
    });
  } catch (error) {
    console.log(error);
    const err = new Error(
      'An error has happened sending the email: ' + error.message
    );
    err.status = 500;
    throw err;
  }
  // send successfull response
  res.json({
    status: 'success',
    data: {
      sended: true,
    },
  });
};

const resetPassword = async (req, res) => {
  //receive resetPasswordToken and new password/pass confirmation
  const { token, password, passwordConfirmation } = req.body;

  if (password !== passwordConfirmation) {
    const err = new Error('Passwords do not match');
    err.status = 400;
    throw err;
  }

  // search for that token with expiration date > now()
  const user = await UserService.getUserByResetTokenNotExpired(token);

  if (!user) {
    const err = new Error('Reset token is not valid or expired');
    err.status = 400;
    throw err;
  }

  // edit user
  user.password = hashPassword(password);
  // set token and that to undefined
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpiration = undefined;
  await user.save();

  // send successfull response
  res.json({
    status: 'success',
    data: {
      recovered: true,
    },
  });
};

module.exports = {
  register,
  login,
  isAuthenticated,
  forgotPassword,
  resetPassword,
};
