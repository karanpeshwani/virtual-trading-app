/*
Function to find the data from database for the user with the given id.

This function helps retrieve data from database so as to show it in the holdings table in the frontend.
*/

const mongoose = require("mongoose");
const User_schema = require("./userSchema");
const user = mongoose.model("user", User_schema);

mongoose.connect("mongodb://localhost:27017/vta");

async function get_BD_data(id){
    return await user.findOne({ email: id })
}

module.exports = get_BD_data;