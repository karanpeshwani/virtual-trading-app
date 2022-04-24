/*
Function to update the portfolio (database) of the user when he/she has requested a buy order.
*/

const mongoose = require("mongoose");
const User_schema = require("./userSchema");
const user = mongoose.model("user", User_schema);

mongoose.connect("mongodb://localhost:27017/vta");

async function update_data_buy(obj) {
  portf_qty = {};
  portf_val = {};

  await user.findOne({ email: obj.email }).then(async (user) => {

    //User not registered
    if (user === null) {
      console.log("user not found");
    }

    //user is already registered and he has sufficient margin
    else if (user.cash_remaining >= obj.margin_req) {

      //update the portfolio and cash in hand
      //successful = 1
      console.log("successful");
      user.cash_remaining = user.cash_remaining - obj.margin_req;

      //user has an empty portfolio
      if (user.portfolio === undefined) {
        user["portfolio"] = {};
        user["portfolio"][obj.Selected_stock] = obj.quantity;
        user["invested_val"] = {};
        user["invested_val"][obj.Selected_stock] = obj.margin_req;
      }

      //user already have some stocks in the portfolio
      else {

        //user doesn't previously have that particular stock in the portfolio
        if (user.portfolio[obj.Selected_stock] === undefined) {
          new_entry = {};
          new_entry[obj.Selected_stock] = obj.quantity;
          updated_pf = { ...user.portfolio, ...new_entry };
          user.portfolio = updated_pf;

          new_entry = {};
          new_entry[obj.Selected_stock] = obj.margin_req;
          updated_pf = { ...user.invested_val, ...new_entry };
          user.invested_val = updated_pf;
          console.log("security added");
        }

        //user already has that particular stock in the portfolio
        else {
          final_stock_qty = user.portfolio[obj.Selected_stock] + obj.quantity;
          updated_entry = {};
          updated_entry[obj.Selected_stock] = final_stock_qty;
          updated_pf = { ...user.portfolio, ...updated_entry };
          user.portfolio = updated_pf;

          final_value = user.invested_val[obj.Selected_stock] + obj.margin_req;
          updated_entry = {};
          updated_entry[obj.Selected_stock] = final_value;
          updated_pf_val = { ...user.invested_val, ...updated_entry };
          user.invested_val = updated_pf_val;
        }
      }

      await user.save().then((newdoc) => {
        portf_qty = newdoc.portfolio;
        portf_val = newdoc.invested_val;
      });
      console.log(user.cash_remaining);
    }

    //user is already registered and he does not have sufficient margin
    else {
      
      //successful = 2
      // no sufficient margin
      console.log("unsuccessful, no avaliable margin");
      portf_qty = user.portfolio;
      portf_val = user.invested_val;
    }
  });
  return { portf_qty: portf_qty, portf_val: portf_val };
}

module.exports = update_data_buy;
