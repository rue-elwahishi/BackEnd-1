const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    required: [true, "please enter a username"],
    type: String
  },
  firstname: {
    required: [true, "please enter a first name"],
    type: String
  },
  lastname: {
    required: [true, "please enter a last name"],
    type: String
  },
  email: {
    type: String,
    required: [true, "please enter email"],
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please add a valid email"
    ]
  },
  password: {
    required: [true, "please enter a password"],
    type: String
  },
  birthdate: {
    type: Date
  },
  deactivated: {
    type: Boolean,
    default: false
  },
  file: {
    type: String
  },
  bio: {
    type: String
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  facebook : String,
  twitter : String,
  linkedIn : String,
  instagram:String
});

module.exports = mongoose.model("user", UserSchema);
