const mongoose = require("mongoose");
const commentSchema = require("../models/comment");
const Comment = mongoose.model("comment");
const commentController = require("../../controllers/commentController");
const Router = (module.exports = require("express").Router());

//save  comment in database
Router.post("/:id/comments");

//save reply for the comment
Router.post("/:id/reply");

//display all comment

Router.get("/:id/comments");

//update the comment
Router.post("/:id");

//delete a comment
Router.delete("/comments/:id");
