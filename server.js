const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const passport = require("passport");
const {Hobby} = require("./models/index.js")
const app = express();
const path = require("path");
const Routes = require("./routes/api/index");

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
app.use("/api/users", Routes.users);
app.use("/api/comments", Routes.comments);
app.use("/api/posts", Routes.posts);
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
