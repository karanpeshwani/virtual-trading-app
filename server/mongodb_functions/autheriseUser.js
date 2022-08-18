const mongoose = require("mongoose");
const User_schema = require("./userSchema");
const user = mongoose.model("user", User_schema);

mongoose.connect("mongodb://localhost:27017/vta");


async function autheriseUser(obj){
    var result = "";
    await user.findOne({ email: obj.email,password : obj.password }).then(async (user) => {
        if(user === null){
            result = "failed";
        }
        else{
            result = "success";
        }
    });

    return result;
}

module.exports = autheriseUser;