// const ticker_list_obj = require("../utility/tickerdata");
const arr = [
  "BINANCE:BTCUSDT",
  "TSLA",
  "AAPL",
  "NFLX",
  "INTC",
  "NVDA",
  "FB",
  "GOOGL",
  "AMZN",
  "PYPL",
  "MSFT",
  "AMD",
  "ADBE",
  "CSCO",
  "PEP",
  "INTU",
  "SBUX",
  "CTSH",
  "HON",
  "TEAM",
  "FISV",
  "ADI",
  "QCOM",
  "SPLK",
  "CSX",
  "ZM",
];

function roundToX(num, X) {
  return +(Math.round(num + "e+" + X) + "e-" + X);
}

function Getprice(sock) {
  console.log("GetPrice working");
  const WebSocket = require("ws");
  const socket = new WebSocket(
    "wss://ws.finnhub.io?token=c4v2icqad3id268auf7g"
  );

  console.log("BEFORE ASYNC AWAIT");
  // Connection opened -> Subscribe
  socket.addEventListener("open", function (event) {
    // socket.send(JSON.stringify({ type: "subscribe", symbol: sbl }));

    // for(var i = 0; i < ticker_list_obj.ticker_list.length; i++){
    for (var i = 0; i < 26; i++) {
      socket.send(JSON.stringify({ type: "subscribe", symbol: arr[i] }));
    }
  });

  socket.addEventListener("message", function (event) {
    // console.log("Message from server ", event.data);
    let data = JSON.parse(event.data);
    if (data.type === "trade") {
      // price = data.data[0].p;
      // console.log(price);

      var n = data.data.length;

      // for (var i = 0; i < n; i++) {
      //   var symbol = data.data[i].s;
      //   // price_obj[symbol] = data.data[i].p;
      //   LTP_obj = {}
      //   LTP_obj[symbol] = roundToX(data.data[i].p,2)
      //   sock.send(JSON.stringify(LTP_obj));
      // }

      var symbol = data.data[0].s;
      LTP_obj = {};
      LTP_obj[symbol] = roundToX(data.data[0].p, 2);
      sock.send(JSON.stringify(LTP_obj));

      
      // console.log(data);
      // unsubscribe(sbl);
      // res(true);
    }

    // var oks = true;
    // for (var i = 0; i < 10; i++) {
    //   if (price_obj[arr[i]] == 0) {
    //     oks = false;
    //   }
    // }
    // if(oks === true){
    //   res(true);
    // }
  });

  // {"c":["1","24","12"],"p":329.35,"s":"FB","t":1633640536508,"v":1}

  // Unsubscribe
  var unsubscribe = function (symbol) {
    socket.send(JSON.stringify({ type: "unsubscribe", symbol: symbol }));
  };
  // return price_obj;
}

// var prc = Getprice().then((res)=>console.log(res))
// console.log(prc);

module.exports = Getprice;
// module.exports = { Getprice: Getprice, price_obj: price_obj };
