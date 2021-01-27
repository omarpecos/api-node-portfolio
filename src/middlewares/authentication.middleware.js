const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  let token = req.headers['authorization'];
  if (!token) {
    const err = new Error('No authorization header provided');
    err.status = 401;
    next(err);
  } else {
    try {
      const decoded = JWT.verify(token, JWT_SECRET);

      req.user = decoded;
      next();
    } catch (err) {
      err.message = 'Unathenticated';
      err.status = 401;

      next(err);
    }
  }
};
