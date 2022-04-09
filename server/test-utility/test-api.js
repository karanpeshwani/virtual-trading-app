
const express = require("express");
const WebSocket = require("ws");
// const socket = new WebSocket('wss://ws.finnhub.io?token=c4v2icqad3id268auf7g');
// const arr = ['TSLA','AAPL', 'INTC', 'NFLX','PYPL','NVDA','FB', 'GOOGL','AMZN','MSFT'];
// // const ticker_list_obj = require("./utility/tickerdata");
// // 'BINANCE:BTCUSDT'
// // Connection opened -> Subscribe
// socket.addEventListener('open', function (event) {
//     // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
//     // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}))
//     // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'INTC'}))

//     for(var i=0;i<11 ;i++){
//         socket.send(JSON.stringify({'type':'subscribe', 'symbol': arr[i]}))
//     }
// });

// // Listen for messages
// socket.addEventListener('message', function (event) {
//     console.log('Message from server ', event.data);
//     // unsubscribe('AAPL')
//     // unsubscribe('TSLA')
//     // unsubscribe('BINANCE:BTCUSDT')
// });

// // Unsubscribe
//  var unsubscribe = function(symbol) {
//     socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
// }



// GOOG, TSLA, MSFT, AAPL , AAL , AMZN, FB, PAYPAL, NETFLIX, intel

//  https://disfold.com/top-companies-us-nasdaq/




const socket = new WebSocket('wss://ws.finnhub.io?token=c4v2icqad3id268auf7g');

// Connection opened -> Subscribe
socket.addEventListener('open', function (event) {
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
    // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}))
    // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'IC MARKETS:1'}))
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});

// Unsubscribe
 var unsubscribe = function(symbol) {
    socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
}