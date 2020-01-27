const mongoose = require("mongoose");
const config = require("../config/config");

const connectDB = async () => {
  try {
    var conn = mongoose.connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log(`Mongo is Connected`);
  } catch (error) {
    console.log(`Error ${e.message}`);
  }
};

module.exports = connectDB;
