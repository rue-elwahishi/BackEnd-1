const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const passport = require("passport");
// const {Community} = require("./models/index.js")
const app = express();
const path = require("path");
const {users,comments,posts,communities,events} = require("./routes/api/index.js");

//Load env vars
dotenv.config({
  path: "./config/config.env"
});

// DB Connection
connectDB();
// CORS middleware
app.use(cors());
// Body parser
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);
// set static Folder
// app.use(express.static(path.join(__dirname), "public"));
app.use("/api/users", users);
app.use("/api/comments", comments);
app.use("/api/posts", posts);
app.use("/api/communities", communities);
app.use("/api/events", events);
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
