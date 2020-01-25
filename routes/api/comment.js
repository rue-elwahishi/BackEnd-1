const mongoose = require("mongoose");
const commentSchema = require("../../models/comment");
const Comment = mongoose.model("comment");
const bodyParser = require("body-parser");

module.exports = app => {
  //save comment in database
  app.post("/:id/comments", (req, res) => {
    var comment = new Comment({
      content: req.body.content,
      user: req.user._id,
      post: req.params.id
    });
    comment.save();
  });

  //add reply for the comment
  app.post("/comments/:id/reply", (req, res) => {
    Comment.create(
      {
        content: req.body.content,
        user: req.user._id,
        comment: req.params.id
      },
      (err, user) => {
        try {
          res.json({ success: true, msg: "comment registered", user });
        } catch {
          res.json({
            success: false,
            msg: "error in registering the comment",
            err
          });
        }
      }
    );
  });

  //display all comment

  app.get("/comments", (req, res) => {
    Comment.find().then(comments => res.send(comments));
  });

  //update the comment
  app.post("/comments/:id", (req, res) => {
    Comment.update(
      { id: req.params.id },
      { $set: { content: req.body.content } },
      (err, result) => {
        try {
          res.json({ success: true, msg: "Comment updated" });
        } catch {
          res.json({ success: false, msg: "error in updating the comment" });
        }
      }
    );
  });

  //delete a comment
  app.delete("/comments/:id", (req, res) => {
    Comment.deleteOne({ id: req.params.id }, err => {
      try {
        res.send("comment is deleted");
      } catch {
        res.json({ success: false, msg: "error in deleting the comment" });
      }
    });
  });
};
