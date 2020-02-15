const express = require("express");
const Router = express.Router();
const {
  UsersController,
  PostsController,
  FollowingsController
} = require("../../controllers/index");
const {
  CommunityMiddleware,
  AuthMiddleware,
  uploadMiddleware
} = require("../../helpers/index.js");

// Register

Router.get(
  "/recommendations",
  AuthMiddleware,
  CommunityMiddleware,
  UsersController.recommendations
);
Router.post("/register", UsersController.signUp, UsersController.logIn);
Router.get("/profile", AuthMiddleware, UsersController.getProfile);
Router.post("/authenticate", UsersController.logIn);
Router.get("/verify", UsersController.verifyToken);
Router.get(
  "/:id/posts",
  AuthMiddleware,
  CommunityMiddleware,
  PostsController.getPostsByUserId
);
Router.get("/search", AuthMiddleware, UsersController.search);
Router.post("/insertkey", AuthMiddleware, UsersController.comparingKeys);

Router.get(
  "/friends",
  AuthMiddleware,
  CommunityMiddleware,
  FollowingsController.getFriends
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
Router.get(
  "/:id/follow",
  AuthMiddleware,
  CommunityMiddleware,
  FollowingsController.follow
);

Router.get(
  "/:id/unfollow",
  AuthMiddleware,
  CommunityMiddleware,
  FollowingsController.unfollow
);
Router.patch(
  "/settings",
  AuthMiddleware,
  uploadMiddleware.single("file"),
  UsersController.updateUser
);

Router.delete(
  "/cancelverification",
  AuthMiddleware,
  UsersController.deleteUser
);
module.exports = Router;
