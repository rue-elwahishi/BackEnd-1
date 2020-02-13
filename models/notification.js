const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;


module.exports = mongoose.model("notification", mongoose.Schema({
    sender: { type: ObjectId, ref: "user" },
    receiver : {type : ObjectId, ref: "user"},
    event: { type: ObjectId, ref: "event" },
    post: { type: ObjectId, ref: "post" },
    comment: {type: ObjectId, ref: "comment"},
    reply: {type: ObjectId, ref: "comment"},
    community: { type: ObjectId, ref : "community"},
    type : String,
    seen: {type: Boolean, default : false}
    
}));
