const express = require("express");
const Router = express.Router();
const {
  UsersController,
  PostsController,
  EventsController
} = require("../../controllers/index");
const {
  CommunityMiddleware,
  AuthMiddleware,
  uploadMiddleware
} = require("../../helpers/index.js");

// Register

Router.post(
  "/",
  AuthMiddleware,
  CommunityMiddleware,
  uploadMiddleware.single("file"),
  EventsController.makeEvent
);

module.exports = Router;
