const mongoose = require("mongoose");
const commentSchema = require("../models/comment");
const Comment = mongoose.model("comment");
const bodyParser = require("body-parser");
const express = require("express");

//create new comment
const createComment = (comment, callback) => {
  var comment = new Comment({
    content: req.body.content,
    user: req.user._id,
    post: req.params.id
  });
  comment.save(callback);
};
//get all comments
var getAllComment = callback => {
  Comment.find((err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

//update comment
const updateComment = (id, callback) => {
  Comment.findOneAndUpdate({ _id: id })
    .populate("comment")
    .exec((err, comment) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, comment);
      }
    });
};

//delete comment
const deleteComment = (id, callback) => {
  Comment.deleteOne({ _id: id }, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

exports.createComment = createComment;
exports.updateComment = updateComment;
exports.deleteComment = deleteComment;
