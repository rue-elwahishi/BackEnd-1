const mongoose = require("mongoose");
const commentSchema = require("../models/comment");
const Comment = mongoose.model("comment");
const bodyParser = require("body-parser");

//create new comment
const createComment = (req, res) => {
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
var createReply = (req, res) => {
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
var displayAll = async (req, res) => {
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
const updateComment = (req, res) => {
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
const deleteComment = (req, res) => {
  try {
    Comment.deleteOne({ id: req.params.id });
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, err });
  }
};

exports.createComment = createComment;
exports.createReply = createReply;
exports.displayAll = displayAll;
exports.updateComment = updateComment;
exports.deleteComment = deleteComment;
