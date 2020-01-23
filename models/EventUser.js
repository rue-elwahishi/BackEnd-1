const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventUserSchema = new eventUserSchema({
  participants: [{ user: { type: Schema.Types.ObjectId, ref: "User" } }],
  event: { type: Schema.Types.ObjectId, ref: "Event" }
});
