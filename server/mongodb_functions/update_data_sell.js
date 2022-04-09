const mongoose = require("mongoose");
const { use } = require("../routes/getRoutes");
mongoose.connect("mongodb://localhost:27017/vta");
const User_schema = require("./userSchema");
const user = mongoose.model("user", User_schema);


// const obj = {
//   email: "karanpeshwani7@gmail.com",
//   quantity: qty,
//   margin_req: margin_req,
//   // buy_price : prices_obj[Selected_stock],
//   Selected_stock: Selected_stock,
// };


async function update_data_sell(obj) {
  // var successful = 0;
  portf = {};
  // const user_1 = new user({
  //   email: "karanpeshwani7@gmail.com",
  //   password : "opopop",
  //   stocks: null,
  //   cash_remaining: 500000,
  // });

  // user_1.save();

    await user.findOne({ email: obj.email }).then(async (user) => {
    //User not registered
    if (user === null) {
      console.log("user not found");
    } 
    
    //user is already registered
    else {
      //update the portfolio and cash in hand
      //successful = 1
      console.log("successful");

      // user.portfolio[obj.Selected_stock] += obj.quantity;
      // user.portfolio[obj.Selected_stock] += obj.quantity;

      //user has nothing in the portfolio
      if (user.portfolio === undefined) {
        console.log("No such Stock available to sell");
      } 
      
      //user has a portfolio
      else {

        //user has no such stock in the portfolio
        if (user.portfolio[obj.Selected_stock] === undefined) {
          console.log("No such Stock available to sell");
        }
        
        //user has that particular stock in the portfolio
        else {

          //user is trying to sell greater quantity than he actually possesses
          if (user.portfolio[obj.Selected_stock] < obj.quantity) {
            console.log("Please reduce the quantity to be sold");
          } 
          

          //user selling reasonable quantity
          else {
            user.cash_remaining = user.cash_remaining + obj.margin_req;
            updated_qty = user.portfolio[obj.Selected_stock] - obj.quantity;
            updated_entry = {};
            updated_entry[obj.Selected_stock] = updated_qty;
            updated_pf = { ...user.portfolio, ...updated_entry };
            user.portfolio = updated_pf;

            updated_val_invested = user.invested_val[obj.Selected_stock] - obj.margin_req;
            updated_entry = {}
            updated_entry[obj.Selected_stock] = updated_val_invested;
            updated_pf = { ...user.invested_val, ...updated_entry };
            user.invested_val = updated_pf;
          }
        }
      }
      // if(user[obj.Selected_stock] === undefined){
      //   user[obj.Selected_stock] = obj.quantity
      //   console.log("vbry");
      // }

      // await user.save().then(newdoc=>{
      //   user = newdoc;
      // });

      await user.save().then((newdoc) => {
        portf = newdoc.portfolio;
      });
      // console.log(user.cash_remaining);
    }
  });

  return portf;
}

module.exports = update_data_sell;
