const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user" },
  event: { type: Schema.Types.ObjectId, ref: "event" },
  post: { type: Schema.Types.ObjectId, ref: "post" },
  comment: { type: Schema.Types.ObjectId, ref: "comment" }
});

mongoose.model("like", likeSchema);
