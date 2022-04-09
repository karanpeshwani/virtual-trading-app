const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/vta");
const User_schema = require("./userSchema");
const user = mongoose.model("user", User_schema);

// async function Get_table(id){
//     await user.findOne({ email: id }).then(async (user) => {
//         // if(user === null){
//         //     return {"NO USER FOUND" : true}
//         // }
//         // return {invested_val : user.invested_val, portfolio : user.portfolio}
//     }).then(res =>{
//         return {invested_val : user.invested_val, portfolio : user.portfolio}
//     })
// }

async function get_BD_data(id){

    //*********************why does this not work ******************************
    // await user.findOne({ email: id }).then(res=>{
    //     return {invested_val : res.invested_val, portfolio : res.portfolio}
    // })

    return await user.findOne({ email: id })
}


module.exports = get_BD_data;