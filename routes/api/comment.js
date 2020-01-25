const mongoose = require("mongoose");
const commentSchema = require("../../models/comment");
const Comment = mongoose.model("comment");
const bodyParser = require("body-parser");

module.exports = app => {
  //save new comment in database
  app.post("/:id/comments", (req, res) => {
    var comment = new Comment({
      content: req.body.content,
      user: req.user._id,
      post: req.params.id
    });
    comment.save();
  });

  //save new reply for the comment
  app.post("/comments/:id/reply", (req, res) => {
    Comment.create({
      content: req.body.content,
      user: req.user._id,
      comment: req.params.id
    });
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
          res.json("Comment is updated" + JSON.stringify(result));
        } catch {
          res.send(err);
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
        console.log(err);
      }
    });
  });
};
