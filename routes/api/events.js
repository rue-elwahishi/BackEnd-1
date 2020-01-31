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
Router.get(
  "/nearby",
  AuthMiddleware,
  CommunityMiddleware,
  EventsController.nearby
);

Router.get("/:id", EventsController.showEvent);

module.exports = Router;
