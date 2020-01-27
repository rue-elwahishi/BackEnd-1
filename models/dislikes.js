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

var Dislikes = mongoose.model("Dislikes", dislikesSchema);
