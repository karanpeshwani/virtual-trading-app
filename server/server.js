// npm run karan to start

//                                     ************ when to use require/import *************
const express = require("express");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/vta");
app = express();
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
// const Data_from_api = require('./utility/webs_ser')

// Data_from_api();

// app.use("/getdata", dataRoutes);
app.use(getRouter)
app.use(postRouter)
server.listen(port, () => console.log("Backend server live on " + port));

app.get("/", (req, res) => {
  res.send({ message: "We did it!" });
});