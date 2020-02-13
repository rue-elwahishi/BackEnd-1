const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  deactivated: { type: Boolean, default: false },
  community: { type: Schema.Types.ObjectId, ref: "community" },
  file: { type: String },
  location: {
    type : {type: String, default : "Point"},
    coordinates : {type : [Number], index : "2dsphere", required: true}
 },
 start : {type: Date, required : true},
 end : {type: Date, required : true},
});
module.exports = mongoose.model("event", eventSchema);
