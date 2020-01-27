const mongoose = require("mongoose");
const commentSchema = require("../models/comment");
const Comment = mongoose.model("comment");
const commentController = require("../../controllers/commentController");
module.exports = app => {
  //save  comment in database
  app.post("/:id/comments", (req, res) => {
    var comment = new Comment({
      content: req.body.content,
      user: req.user._id,
      post: req.params.id
    });
    comment.save();
  });

  //save reply for the comment
  app.post("/comments/:id/reply", (req, res) => {
    Comment.create({
      content: req.body.content,
      user: req.user._id,
      comment: req.params.id
    });
  });

  //display all comment

  app.get("/comments", (req, res) => {
    Comment.getAllComment((err, result) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(result);
        res.end();
      }
    });
  });

  //update the comment
  app.post("/comments/:id", (req, res) => {
    Comment.update(
      { id: req.params.id },
      { $set: { content: req.body.content } },
      (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.json("Comment is updated" + JSON.stringify(result));
        }
      }
    );
  });

  //delete a comment
  app.delete("/comments/:id", (req, res) => {
    Comment.deleteOne({ id: req.params.id }, err => {
      if (err) {
        console.log(err);
      }
      res.send("comment is deleted");
    });
  });
};
