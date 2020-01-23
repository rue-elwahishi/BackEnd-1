var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var hobbiesSchema = new Schema({
  name: String,
  deactivated: false
});

var Hobbies = mongoose.model("Dislikes", hobbiesSchema);
