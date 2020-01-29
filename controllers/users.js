const bcrypt = require("bcryptjs");
const { User, Following } = require("../models/index.js");
const config = require("../config/config");
const jwt = require("jsonwebtoken");

module.exports.signUp = async (req, res, next) => {
  try {
    if (await User.findOne({ username: req.body.username }))
      return res.json({ success: false, msg: "username exists" });
    let newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10)
    });
    await newUser.save();
    res.json({ success: true, msg: "you've signed up successfully" });
  } catch (err) {
    res.json({ success: false, msg: "something went wrong", err });
  }
};
module.exports.logIn = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    var user = await User.findOne({ username });
    if (!user) return res.json({ success: false, msg: "User not found" });
    var isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token =
        "jwt " + jwt.sign(user.toJSON(), config.secret, { expiresIn: 604800 });
      user.password = undefined;
      res.json({
        success: true,
        token,
        user
      });
    } else {
      res.json({ success: false, msg: "Password is incorrect" });
    }
  } catch (err) {
    res.json({ success: false, msg: "something went wrong", err });
  }
};
module.exports.verifyToken = async (req, res) => {
  try {
    var authorization = req.headers.authorization.replace(/^jwt\s/, "");
    var user = jwt.verify(authorization, config.secret);
    res.send({ success: true, user, err: null });
  } catch (err) {
    res.send({ success: false, user: null, err });
  }
  // var token = req.headers.authorization? jwt.verify(req.headers.authorization, config.secret) : false
};
// module.exports.getFollowers = async (req, res) => {
//   try {
//     res.json({
//       success: true,
//       result: await Following.find({ followed: req.params.id,hobby: req.hobby._id })
//     });
//   } catch (err) {
//     res.json({ success: false, msg: "something went wrong", err });
//   }
// };
// module.exports.getUsrById = function(id, callback) {
//   User.findById(id, callback);
// };
// module.exports.getUserByUsername = function(username, callback) {
//   const query = { username: username };
//   User.findOne(query, callback);
// };
