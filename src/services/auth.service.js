const doSignUp = (User) => (registerBody) => {
  return User.create(registerBody);
};

module.exports = (User) => {
  return {
    doSignUp: doSignUp(User),
  };
};
