const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventUserSchema = new Schema({
  participant: { type: Schema.Types.ObjectId, ref: "user" },
  event: { type: Schema.Types.ObjectId, ref: "event" }
});
module.exports = mongoose.model("EventUser", eventUserSchema);
