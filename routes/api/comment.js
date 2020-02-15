const mongoose = require("mongoose");
const {CommentsController, LikesController} = require("../../controllers/index");
const Router = (module.exports = require("express").Router());
const {AuthMiddleware, CommunityMiddleware} = require('../../helpers/index.js')

//save  comment in database

//save reply for the comment
Router.post("/:id/reply",AuthMiddleware, CommentsController.createReply);

//display all comment

Router.get("/:id/replies",AuthMiddleware, CommentsController.displayReply);

//update the comment
Router.get('/:id/like' , AuthMiddleware, LikesController.likeComment)
//delete a comment
// Router.delete("/comments/:id");
Router.get('/:id/remove' , AuthMiddleware,CommunityMiddleware, CommentsController.remove)
