var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var dislikesSchema = new Schema({
  user: {
    ref: "user",
    type: mongoose.Schema.Types.ObjectId
  },
  event: {
    ref: "event",
    type: mongoose.Schema.Types.ObjectId
  }
});

module.exports = mongoose.model("dislike", dislikesSchema);
