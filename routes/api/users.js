const express = require("express");
const Router = express.Router();
const Controllers = require("../../controllers/index");
const helpers = require('../../helpers/index.js')


// Register
Router.post("/register", Controllers.User.signUp);
Router.post("/authenticate", Controllers.User.logIn);
Router.get("/verify", Controllers.User.verifyToken);
Router.get('/:id/posts', helpers.AuthMiddleWare, helpers.HobbyMiddleWare ,Controllers.Post.getPostsByUserId)



module.exports = Router;
