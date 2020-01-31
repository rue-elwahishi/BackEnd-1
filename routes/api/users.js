const express = require("express");
const Router = express.Router();
const {
  UsersController,
  PostsController,
  FollowingsController
} = require("../../controllers/index");
const {
  CommunityMiddleware,
  AuthMiddleware
} = require("../../helpers/index.js");

// Register
Router.post("/register", UsersController.signUp);
Router.post("/authenticate", UsersController.logIn);
Router.get("/verify", UsersController.verifyToken);
Router.get(
  "/:id/posts",
  AuthMiddleware,
  CommunityMiddleware,
  PostsController.getPostsByUserId
);
Router.get(
  "/:username",
  AuthMiddleware,
  CommunityMiddleware,
  UsersController.getUser
);
Router.get(
  "/:id/followers",
  AuthMiddleware,
  CommunityMiddleware,
  FollowingsController.getFollowers
);
Router.get(
  "/:id/followings",
  AuthMiddleware,
  CommunityMiddleware,
  FollowingsController.getFollowings
);

module.exports = Router;
