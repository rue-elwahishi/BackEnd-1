const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  event_id: { type: mongoose.Schema.Types.ObjectId, ref: "event" },
  post_id: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
  comment_id: { type: mongoose.Schema.Types.ObjectId, ref: "comment" }
});

mongoose.model("like", likeSchema);
