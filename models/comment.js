const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: String,
  user: { type: Schema.Types.ObjectId, ref: "user" },
  deactivated: { type: Boolean, default: false },
  post: { type: Schema.Types.ObjectId, ref: "post" },
  parentComment: { type: Schema.Types.ObjectId, ref: "comment" }
});

module.exports = mongoose.model("comment", commentSchema);
