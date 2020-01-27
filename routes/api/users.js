const express = require("express");
const Router = express.Router();
const Controllers = require("../../controllers/index");


// Register
Router.post("/register", Controllers.user.signUp);


Router.post("/authenticate", Controllers.user.logIn);


Router.get("/verify", Controllers.user.verifyToken);

module.exports = Router;
