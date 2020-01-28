var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var hobbySchema = Schema({
  name: String,
  deactivated: {
    type: Boolean,
    default: false
  }
});

var Hobby = mongoose.model("hobby", hobbySchema);

module.exports = Hobby;
