const express = require("express");
const Router = express.Router();
const {
  UsersController,
  PostsController,
  EventsController,
  LikesController,
  NotificationsController
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

Router.route('/:id/invite').post(AuthMiddleware, CommunityMiddleware, NotificationsController.invite)

Router.post(
  "/:id/posts",
  AuthMiddleware,
  uploadMiddleware.single("file"),
  PostsController.createEventPost
);

Router.get(
  "/:id/posts",
  AuthMiddleware,
  PostsController.getPostsByEvent
);

Router.post(
  "/nearby",
  AuthMiddleware,
  CommunityMiddleware,
  EventsController.nearby
);
Router.get("/", AuthMiddleware, CommunityMiddleware, EventsController.showEvents);

Router.get("/:id", AuthMiddleware, EventsController.showEvent);
Router.get("/:id/like", AuthMiddleware, LikesController.likeEvent);
Router.get("/:id/dislike", AuthMiddleware, LikesController.dislikeEvent);
Router.get('/:id/enrollment' , AuthMiddleware, EventsController.toggleEnrollment)



Router.get("/:id", AuthMiddleware, EventsController.showEvent);

Router.get("/:id/posts", AuthMiddleware, PostsController.getPostByEvent);

module.exports = Router;
