const express = require("express");
const router = express.Router();
const ticker_list_obj = require("../utility/tickerdata");
const Data_from_api = require("../utility/webs_ser")

const update_data_buy = require("../mongodb_functions/update_data_buy")
const update_data_sell = require("../mongodb_functions/update_data_sell")



let ticker = "";
let stock_sym = ""
//  will only work n /getdata/a
router.get("/a", (req, res) => {
  res.send("hello this is get data");
});

router.post("/getData/send/query/:ticker", (req, res) => {
  ticker = req.params.ticker;

  var dict = [];

  for (var i = 0; i < ticker_list_obj.ticker_list.length; i++) {
    if (
      ticker_list_obj.ticker_list[i].Symbol.toLowerCase().includes(
        ticker.toLowerCase()
      ) ||
      ticker_list_obj.ticker_list[i].Company_Name.toLowerCase().includes(
        ticker.toLowerCase()
      )
    ) {
      dict.push(ticker_list_obj.ticker_list[i]);
    }
  }

  res.send(dict);
  // res.sendStatus(200)
});

router.post("/getData/price/query/abc" , (req,res)=>{
  // const sym = req.params.sym;
  // const symbl = req.params.sym;
  // console.log(typeof symbl);
  Data_from_api();
  res.sendStatus(200);
})

router.post("/getData/price/query/hello",(req,res)=>{
  const dt = req.body;
  //update the database of the user
  update_data_buy(dt)    //mongo_oper.js
  .then(portf=> res.send(portf))
  .catch((err)=>console.log(err))
  console.log(dt);
  // res.sendStatus(200)
})

router.post("/getData/price/query/hello_sell",(req,res)=>{
  const dt = req.body;
  //update the database of the user
  update_data_sell(dt)    //mongo_oper.js
  .then((portf)=>res.send(portf))
  .catch((err)=>console.log(err))
  console.log(dt);
  // res.send()
})


// router.post("/getData/price/query/AAPL" , (req,res)=>{
//   // const sym = req.params.sym;
//   // const symbl = req.params.sym;
//   const symbl = "AAPL"
//   console.log(typeof symbl);
//   Data_from_api(symbl);
//   res.sendStatus(200);

// })

module.exports = router;
