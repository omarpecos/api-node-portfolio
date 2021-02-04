const getUserByEmail = (User) => (email) => {
  return User.findOne({ email: email });
};

const getAllUsers = (User) => () => {
  return User.find({});
};

const getOneUserById = (User) => (id) => {
  return User.findById(id);
};

const getOneUserByIdAndDelete = (User) => (id) => {
  return User.findByIdAndDelete(id);
};

const editOneUser = User => (id,body) =>{
  return User.findOneAndUpdate({
    _id : id
  },body,{new : true})
}

module.exports = (User) => {
  return {
    getAllUsers: getAllUsers(User),
    getUserByEmail: getUserByEmail(User),
    getOneUserById: getOneUserById(User),
    getOneUserByIdAndDelete: getOneUserByIdAndDelete(User),
    editOneUser : editOneUser(User)
  };
};
