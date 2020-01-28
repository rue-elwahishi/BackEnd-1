const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  desactivated: { type: Boolean, default: false },
  hobby: { type: Schema.Types.ObjectId, ref: "hobby" },
  file: { type: String }
});
module.exports = mongoose.model("event", eventSchema);
