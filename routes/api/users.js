const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const Controllers = require("../../controllers/user");
const passport = require("passport");
const config = require("../../config/config");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", (req, res, next) => {
  let newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  Controllers.addUser(newUser, (err, user) => {
    if (err) {
      res.json({ success: false, msg: "Failed to register user", err });
    } else {
      res.json({ success: true, msg: "user registered" });
    }
  });
});

router.post("/authenticate", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({username}, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, msg: "User not found" });
    }
    Controllers.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = "jwt " +  jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 604800
        });
        res.json({
          success: true,
          token,
          user: {
            id: user._id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            birthdate: user.birthdate
          }
        });
      } else {
        res.json({ success: false, msg: "Wrong password" });
      }
    });
  });
});

router.get("/profile", (req, res, next) => {
  res.send("profile");
});
router.get("/verify", (req, res) => {
  try{
    var authorization = req.headers.authorization.replace(/^jwt\s/, '');
    var user = jwt.verify(authorization, config.secret)
    res.send({success : true, user, err : null});
    
  }catch(err){
    res.send({success : false, user: null , err});
  }
  // var token = req.headers.authorization? jwt.verify(req.headers.authorization, config.secret) : false
});

module.exports = router;
