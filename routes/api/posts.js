const Router = (module.exports = require("express").Router());
const {
  CommunityMiddleware,
  AuthMiddleware,
  uploadMiddleware
} = require("../../helpers/index.js");
const { PostsController } = require("../../controllers/index");

Router.post(
  "/",
  AuthMiddleware,
  CommunityMiddleware,
  uploadMiddleware.single("file"),
  PostsController.createPost
);

Router.get("/", AuthMiddleware, CommunityMiddleware, PostsController.getPosts);
