
const mongoose = require("mongoose");
const User_schema = new mongoose.Schema({
  email: String,
  password: String,
  portfolio: {},
  invested_val: {},
  cash_remaining: Number,
});


module.exports = User_schema;