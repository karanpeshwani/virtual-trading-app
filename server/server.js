// npm run karan to start

//                                     ************ when to use require/import *************
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
cors = require("cors"); //what is the use of cors
const http = require('http');
const server = http.createServer(app);
const Data_from_api = require("./utility/webs_ser");
// const { Server } = require("socket.io");
// const io = new Server(server);

// const pricedata = require("./pricedata")                         //loading data form the websocket

app.use(cors());
app.use(express.json()); //what is the use of body-parser

app.use(
  cors({
    origin: "*",
  })
);


Data_from_api();

// io.on('connection', (socket) => {
//   console.log('a user connected');
// });

// GETTING THE ROUTES
const getRouter = require("./routes/getRoutes");
const postRouter = require("./routes/postRoutes");
const { redirect } = require("express/lib/response");
const res = require("express/lib/response");
// const Data_from_api = require('./utility/webs_ser')

// Data_from_api();

// app.use("/getdata", dataRoutes);
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

