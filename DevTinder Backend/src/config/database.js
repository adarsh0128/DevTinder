const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://adarsh:adarsh123@cluster0.mw1kdjf.mongodb.net/DevTinder"
  );
};

module.exports = connectDB;
