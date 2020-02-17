const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  content: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "community"
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "event"
  },
  deactivated: {
    type: Boolean,
    default: false
  },
  file: {
    type: String
  },
  sharedpost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post"
  }
});

module.exports = mongoose.model("post", PostSchema);
