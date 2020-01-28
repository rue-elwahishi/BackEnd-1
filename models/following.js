var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var followingSchema = new Schema({
  follower: {
    ref: "user",
    type: Schema.Types.ObjectId
  },
  followed: {
    ref: "user",
    type: Schema.Types.ObjectId
  },
  community: {
    ref: 'community',
    type: Schema.Types.ObjectId
  }
});

module.exports = mongoose.model("following", followingSchema);
