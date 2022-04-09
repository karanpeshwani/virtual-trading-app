const express = require("express");
const WebSocket = require("ws");
let pricedata = 0;

const socket = new WebSocket('wss://ws.finnhub.io?token=c4v2icqad3id268auf7g');

// Connection opened -> Subscribe
socket.addEventListener('open', function (event) {
    // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': "BINANCE:BTCUSDT"}))
    // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'IC MARKETS:1'}))
});

// Listen for messages
socket.addEventListener('message', function (event) {
    let data = JSON.parse(event.data);

    if(data.type === "trade"){
        // pricedata = data.data[0].p;
        console.log(data.data);
    }
});

// Unsubscribe
 var unsubscribe = function(symbol) {
    socket.send(JSON.stringify({'type':'unsubscribe','symbol': "BINANCE:BTCUSDT"}))
}

// // module.exports = pricedata;




// const socket = new WebSocket('wss://ws.finnhub.io?token=c4v2icqad3id268auf7g');

// // Connection opened -> Subscribe
// socket.addEventListener('open', function (event) {
//     socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
//     socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}))
//     socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'IC MARKETS:1'}))
// });

// // Listen for messages
// socket.addEventListener('message', function (event) {
//     console.log('Message from server ', event.data);
// });

// // Unsubscribe
//  var unsubscribe = function(symbol) {
//     socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
// }






// "AAPL" : 0,
// "INTC" : 147.89,
// "FB" : 233.63,
// "NVDA" : -21.56,
// "BINANCE:BTCUSDT" : 104.790000000066,
// "PYPL" : 1858.08,
// "NFLX" : 1717.11,
// "GOOGL" : 5235.82,
// "TSLA" : 905.07