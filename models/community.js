var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var communitySchema = Schema({
  name: String,
  deactivated: {
    type: Boolean,
    default: false
  }
});

var Community = mongoose.model("community", communitySchema);

module.exports = Community;
