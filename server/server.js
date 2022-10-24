// npm run karan to start
const express = require("express");
var session = require('express-session')
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
const onServerClientSocket_and_onFinhubWebSocket_func = require("./utility/onSockets");
app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

onServerClientSocket_and_onFinhubWebSocket_func();

// GETTING THE ROUTES
const Router = require("./routes/routes");
app.use(Router)

server.listen(port, () => console.log("Backend server live on " + port));

