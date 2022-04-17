require("dotenv").config();
const mongoose = require("mongoose");

exports.connect = () => {
  return mongoose.connect(process.env.DATABASE_LOCAL);
};

exports.disconnect = () => {
  return mongoose.connection.close();
};
