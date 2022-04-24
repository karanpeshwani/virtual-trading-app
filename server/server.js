// npm run karan to start

//   ************ when to use require/import *************
const express = require("express");
var session = require('express-session')
const router = express.Router();
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/vta");
app = express();
app.use(session({secret : "cats"}));
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
port = 5000;
cors = require("cors");
const http = require('http');
const server = http.createServer(app);
const onServerClientSocket_and_onFinhubWebSocket_func = require("./utility/on-sockets");
app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);


onServerClientSocket_and_onFinhubWebSocket_func();

// GETTING THE ROUTES
const getRouter = require("./routes/getRoutes");
const postRouter = require("./routes/postRoutes");
app.use(getRouter)
app.use(postRouter)

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


app.use('/login', (req, res) => {
  const Token = generate_token(50);
  res.send({
    token: Token
  });
});

server.listen(port, () => console.log("Backend server live on " + port));

