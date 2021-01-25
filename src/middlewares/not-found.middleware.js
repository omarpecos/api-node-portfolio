module.exports = (err, req, res, next) => {
  if (err.status == 404) {
    res.status(404).json({
      status: 'error',
      error: err.message ? err.message : 'Not Found',
      data: null,
    });
  } else {
    next(err);
  }
};
