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
        console.log(data.data);
    }
});

// Unsubscribe
 var unsubscribe = function(symbol) {
    socket.send(JSON.stringify({'type':'unsubscribe','symbol': "BINANCE:BTCUSDT"}))
}
