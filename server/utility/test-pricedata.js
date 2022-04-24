/*
Function to get data from finhub-api
*/
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
    for (var i = 0; i < 26; i++) {
      socket.send(JSON.stringify({ type: "subscribe", symbol: arr[i] }));
    }
  });

  socket.addEventListener("message", function (event) {
    // console.log("Message from server ", event.data);
    let data = JSON.parse(event.data);
    if (data.type === "trade") {
      var n = data.data.length;
      var symbol = data.data[0].s;
      LTP_obj = {};
      LTP_obj[symbol] = roundToX(data.data[0].p, 2);
      sock.send(JSON.stringify(LTP_obj));
    }
  });

  // Unsubscribe
  var unsubscribe = function (symbol) {
    socket.send(JSON.stringify({ type: "unsubscribe", symbol: symbol }));
  };
}

module.exports = Getprice;
