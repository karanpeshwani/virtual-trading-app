/*
Function to update the portfolio (database) of the user when he/she has requested a buy order.
*/

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/vta");
const User_schema = require("./userSchema");
const user = mongoose.model("user", User_schema);

async function update_data_sell(obj) {
  portf = {};

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

            updated_val_invested =
              user.invested_val[obj.Selected_stock] - obj.margin_req;
            updated_entry = {};
            updated_entry[obj.Selected_stock] = updated_val_invested;
            updated_pf = { ...user.invested_val, ...updated_entry };
            user.invested_val = updated_pf;
          }
        }
      }

      await user.save().then((newdoc) => {
        portf = newdoc.portfolio;
      });
    }
  });

  return portf;
}

module.exports = update_data_sell;
