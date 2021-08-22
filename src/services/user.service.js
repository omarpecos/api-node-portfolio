const getUserByEmail = (User) => (email) => {
  return User.findOne({ email: email });
};

const getAllUsers = (User) => (query) => {
  const q = User.find().sort(query.sort);
  if (!query.all) {
    return q.skip(query.skip).limit(query.limit);
  }
  return q;
};

const countUsers = (User) => () => {
  return User.countDocuments();
};

const getOneUserById = (User) => (id) => {
  return User.findById(id);
};

const getUserByResetTokenNotExpired = (User) => (token) => {
  const now = new Date();
  return User.findOne({
    resetPasswordToken: token,
    resetPasswordTokenExpiration: { $gt: now },
  });
};

const getOneUserByIdAndDelete = (User) => (id) => {
  return User.findByIdAndDelete(id);
};

const editOneUser = (User) => (id, body) => {
  return User.findOneAndUpdate(
    {
      _id: id,
    },
    body,
    { new: true }
  );
};

module.exports = (User) => {
  return {
    getAllUsers: getAllUsers(User),
    countUsers: countUsers(User),
    getUserByEmail: getUserByEmail(User),
    getOneUserById: getOneUserById(User),
    getUserByResetTokenNotExpired: getUserByResetTokenNotExpired(User),
    getOneUserByIdAndDelete: getOneUserByIdAndDelete(User),
    editOneUser: editOneUser(User),
  };
};
