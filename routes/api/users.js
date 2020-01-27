const express = require("express");
const Router = express.Router();
const Controllers = require("../../controllers/index");


// Register
Router.post("/register", Controllers.User.signUp);


Router.post("/authenticate", Controllers.User.logIn);


Router.get("/verify", Controllers.User.verifyToken);

module.exports = Router;
