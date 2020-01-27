const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "event" },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
  comment: { type: mongoose.Schema.Types.ObjectId, ref: "comment" }
});

mongoose.model("like", likeSchema);
