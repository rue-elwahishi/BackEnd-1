const mongoose = require("mongoose");
const {CommentsController} = require("../../controllers/index");
const Router = (module.exports = require("express").Router());

//save  comment in database
Router.post("/:id/comments", CommentsController.displayAll);

//save reply for the comment
Router.post("/:id/reply", CommentsController.createReply);

//display all comment

Router.get("/:id/comments", CommentsController.displayAll);

//update the comment
Router.post("/:id", CommentsController.createComment);

//delete a comment
// Router.delete("/comments/:id");
