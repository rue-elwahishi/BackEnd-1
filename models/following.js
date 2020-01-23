var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var followingSchema = new Schema({
  follower: {
    ref: "user",
    type: mongoose.Schema.Types.ObjectId
  },
  followed: {
    ref: "user",
    type: mongoose.Schema.Types.ObjectId
  }
});

var Following = mongoose.model("Following", followingSchema);
