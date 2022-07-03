const { verifyToken } = require('../utils/jwt');

module.exports = (req, res, next) => {
  let token = req.headers['authorization'];
  if (!token) {
    const err = new Error('No authorization header provided');
    err.status = 401;
    next(err);
  } else {
    try {
      const decoded = verifyToken(token);

      req.user = decoded;
      next();
    } catch (err) {
      err.message = 'Unathenticated';
      err.status = 401;

      next(err);
    }
  }
};
