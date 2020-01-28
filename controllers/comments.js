const mongoose = require("mongoose");
const commentSchema = require("../models/comment");
const Comment = mongoose.model("comment");
const bodyParser = require("body-parser");
const express = require("express");

//create new comment
module.exports.createComment = (req, res) => {
  try {
    var comment = new Comment({
      content: req.body.content,
      user: req.user._id,
      post: req.params.id
    });
    comment.save();
    res.json({ success: true, comment });
  } catch (err) {
    res.json({ success: false, err });
  }
};

//create reply comment
module.exports.createReply = (req, res) => {
  try {
    Comment.create({
      content: req.body.content,
      user: req.user._id,
      comment: req.params.id
    });
  } catch (err) {
    res.json({ success: false, err });
  }
};

//display comment
module.exports.displayAll = async (req, res) => {
  try {
    var page = req.query.page;
    var comments = await Comment.find({ post: req.params.id })
      .limit(30)
      .skip(page * 30);
    res.json({ success: true, comments });
  } catch (err) {
    res.json({ success: false, err });
  }
};

//update comment
module.exports.updateComment = (req, res) => {
  try {
    var comments = Comment.update(
      { id: req.params.id },
      { $set: { content: req.body.content } }
    );
    res.json({ success: true, comments });
  } catch (err) {
    res.json({ success: false, err });
  }
};

//delete comment
module.exports.deleteComment = (req, res) => {
  try {
    Comment.deleteOne({ id: req.params.id });
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, err });
  }
}
