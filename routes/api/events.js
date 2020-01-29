const mongoose = require("mongoose");
const { EventsController } = require("../../controllers/index");
const Router = (module.exports = require("express").Router());
const { CommunityMiddleware, AuthMiddleware } = require("../../helpers/index");

Router.post("/:id/events", EventsController.createEvent);

Router.get(
  "/events",
  AuthMiddleware,
  CommunityMiddleware,
  EventsController.displayAll
);
