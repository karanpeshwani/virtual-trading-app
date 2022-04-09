
async function Data_from_api() {
  const WebSocket = require("ws");
  const socket = new WebSocket(
    "wss://ws.finnhub.io?token=c4v2icqad3id268auf7g"
  );

  var price = 0;
  await (async () => {
    return new Promise((res) => {
      socket.addEventListener("open", function (event) {
        socket.send(
          JSON.stringify({ type: "subscribe", symbol: "BINANCE:BTCUSDT" })
        );
      });

      socket.addEventListener("message", function (event) {
        let data = JSON.parse(event.data);
        if (data.type === "trade") {
          price = data.data[0].p;
          res(true);
        }
      });
      // Unsubscribe
      var unsubscribe = function (symbol) {
        socket.send(JSON.stringify({ type: "unsubscribe", symbol: symbol }));
      };
    });
  })();

  return price;
}

module.exports = Data_from_api;