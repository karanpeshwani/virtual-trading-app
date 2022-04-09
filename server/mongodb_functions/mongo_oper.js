const express = require("express");
const mongoose = require("mongoose");
const User_schema = require("./userSchema")

// update_data().catch((err) => console.log(err));

const user = mongoose.model("user", User_schema);
// await mongoose.connect("mongodb://localhost:27017/vta");
mongoose.connect("mongodb://localhost:27017/vta");






module.exports = {update_data_buy:update_data_buy,update_data_sell:update_data_sell};

// {
//   email: 'karanpeshwani7@gmail.com',
//   quantity: '5',
//   margin_req: 400,
//   Selected_stock: 'MSFT'
// }

// {
//   _id: new ObjectId("6161e92f64ea72f372799299"),
//   email: 'karanpeshwani7@gmail.com',
//   password: 'opopop',
//   cash_remaining: 500000,
//   __v: 0
// }
