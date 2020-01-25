const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  desactivated: { type: Boolean },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
  comment: { type: mongoose.Schema.Types.ObjectId, ref: "comment" }
});

mongoose.model("comment", commentSchema);
