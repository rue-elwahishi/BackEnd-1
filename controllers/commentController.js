const mongoose = require("mongoose");
const commentSchema = require("../models/comment");
const Comment = mongoose.model("comment");
module.exports = app => {
  app.post("/addComment", (req, res) => {
    var comment = new Comment(req.body);
    comment.save();
  });
};
