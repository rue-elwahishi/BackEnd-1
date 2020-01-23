const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  event_id: { type: mongoose.Schema.Types.ObjectId, ref: "Events" },
  post_id: { type: mongoose.Schema.Types.ObjectId, ref: "Posts" },
  comment_id: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" }
});

mongoose.model("like", likeSchema);
