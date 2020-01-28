const mongoose = require("mongoose");
const Controllers = require("../../controllers/index");
const Router = (module.exports = require("express").Router());

//save  comment in database
Router.post("/:id/comments", Controllers.Comment.displayAll);

//save reply for the comment
Router.post("/:id/reply", Controllers.Comment.createReply);

//display all comment

Router.get("/:id/comments", Controllers.Comment.displayAll);

//update the comment
Router.post("/:id", Controllers.Comment.createComment);

//delete a comment
// Router.delete("/comments/:id");
