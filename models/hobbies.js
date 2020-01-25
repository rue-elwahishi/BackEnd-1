var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var hobbySchema = new Schema({
  name: String,
  deactivated: {
    type: Boolean,
    default: false
  }
});

var Hobby = mongoose.model("hobby", hobbiesSchema);

module.exports = Hobby;
