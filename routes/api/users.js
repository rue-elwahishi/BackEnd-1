const express = require("express");
const Router = express.Router();
const {UsersController, PostsController} = require("../../controllers/index");
const {CommunityMiddleware, AuthMiddleware} = require('../../helpers/index.js')


// Register
Router.post("/register", UsersController.signUp);
Router.post("/authenticate", UsersController.logIn);
Router.get("/verify", UsersController.verifyToken);
Router.get('/:id/posts', AuthMiddleware, CommunityMiddleware ,PostsController.getPostsByUserId)



module.exports = Router;
