module.exports = (req, res, next) => {
  if (req.user.role != 1) {
    const err = new Error('Unauthorized');
    err.status = 403;
    next(err);
  }

  next();
};
