import mongoose = require("mongoose");
import dotenv from "dotenv/config"

if (process.env.ENV === 'dev') {
    dotenv
   

}

const connectDB = mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = connectDB;