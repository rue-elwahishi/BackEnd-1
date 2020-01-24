const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const app = express();


//Load env vars
dotenv.config({
  path: './config/config.env'
});
// mongodb+srv://theOddOne:<password>@cluster0-64n5n.gcp.mongodb.net/test
// DB Connection
mongoose.connect('mongodb+srv://theOddOne:theOddOne113@cluster0-64n5n.gcp.mongodb.net/theOddOne', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('db is connected')
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
