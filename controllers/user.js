const bcrypt = require("bcryptjs");
const User = require("../models/user");

module.exports.getUsrById = function(id, callback) {
  User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback) {
  const query = { username: username };
  User.findOne(query, callback);
};

module.exports.addUser = function(newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.comparePassword = function(candidatePassowrd, hash, callback) {
  bcrypt.compare(candidatePassowrd, hash, (err, isMatch) => {
    if (err) callback(err, null);
    else callback(null, isMatch);
  });
};
