const express = require("express");
const router = express.Router();
const update_data_buy = require("../mongodb_functions/update_data_buy");
const update_data_sell = require("../mongodb_functions/update_data_sell");
const autheriseUser = require("../mongodb_functions/autheriseUser");
const get_BD_data = require("../mongodb_functions/getTable");

router.get("/:eml/get_BD_data", (req, res) => {
  const eml = req.params.eml;
  get_BD_data(eml)
    .then((data) => {
      console.log("DONE");
      res.send(data);
    })
    .catch((e) => console.log(e));
});

router.post("/transaction/buy", (req, res) => {
  /*
  req.body = {
    email : "XXXX@XXXX.com",
    quantity: qty,
    margin_req: margin_req,
    Selected_stock: Selected_stock,
  }
  */
  const dt = req.body;
  //update the database of the user
  update_data_buy(dt)
    .then((portf) => res.send(portf))
    .catch((err) => console.log(err));
  console.log(dt);
});

router.post("/transaction/sell", (req, res) => {
  const dt = req.body;
  //update the database of the user
  update_data_sell(dt)
    .then((portf) => res.send(portf))
    .catch((err) => console.log(err));
  console.log(dt);
  // res.send()
});

function generate_token(length){
  //edit the token allowed characters
  var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
  var b = [];  
  for (var i=0; i<length; i++) {
      var j = (Math.random() * (a.length-1)).toFixed(0);
      b[i] = a[j];
  }
  return b.join("");
}

router.post("/login", (req, res) => {
  const credentials = req.body;

  var email = credentials.email;
  var password = credentials.password;

  console.log(email);
  console.log(password);

  autheriseUser(credentials)
  .then((result)=>{
    if(result === "success"){
      const Token = generate_token(50);
      res.send({
        token: Token
      });
    }
    else{
      res.send({
        token: "not-a-token"
      });
    }
  })
});

module.exports = router;
