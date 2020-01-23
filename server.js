const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const app = express();


//Load env vars
dotenv.config({
  path: './config/config.env'
});

// DB Connection
connectDB()




const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
