const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  deactivated: Boolean,
  post_id: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
  comment_id: { type: mongoose.Schema.Types.ObjectId, ref: "comment" }
});

mongoose.model("comment", commentSchema);
