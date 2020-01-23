const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: true, //activated or desactivated
  post_id: { type: mongoose.Schema.Types.ObjectId, ref: "Posts" },
  comment_id: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" }
});

mongoose.model("comment", commentSchema);
