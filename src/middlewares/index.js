module.exports = {
  NotFoundMiddleware: require('./not-found.middleware'),
  GeneralErrorMiddleware: require('./error.middleware'),
  AuthenticationMiddleware: require('./authentication.middleware'),
  AuthorizationMiddleware: require('./authorization.middleware'),
};
