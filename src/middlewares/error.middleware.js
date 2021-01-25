module.exports = (err, req, res, next) => {
  let status = err.status || 500;

  res.status(status).json({
    status: 'error',
    error: err.message || 'Internal server error',
    data: null,
  });
};
