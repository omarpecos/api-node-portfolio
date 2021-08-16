const EMAIL_TYPES = {
  FORGOT_PASSWORD: {
    type: 'FORGOT_PASSWORD',
    subject: 'My Portfolio Provider App - Reset forgotten password',
    template: 'password_recovery',
  },
};

module.exports = {
  EMAIL_TYPES,
};
