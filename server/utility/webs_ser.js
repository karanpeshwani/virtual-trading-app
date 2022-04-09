const Getprice = require("./test-pricedata");

const io = require("socket.io")(4000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

function Data_from_api() {     // Why is this running Multiple times *************
  // const io = require("socket.io")(4000);
  // const sym = "BINANCE:BTCUSDT"

  // const io = require("socket.io")(4000, {
  //   cors: {
  //     origin: "*",
  //     methods: ["GET", "POST"]
  //   }
  // });

  console.log("Data from api-working");
  // const Getprice = require("./test-pricedata");
  // const GetPrice = require("./test-pricedata");
  // cors = require("cors");

  io.on("connection", (socket) => {
    // either with send()
    console.log("socket is on");
    // socket.send("Hello999!");

    // or with emit() and custom event names
    //   socket.emit("greetings", "Hey!", { "ms": "jane" }, Buffer.from([4, 3, 3, 1]));

    // handle the event sent with socket.send()
    socket.on("message", (data) => {
      console.log(data);
    });

    // setInterval(()=>{
    //   Getprice().then((result) => {
    //     console.log("SENDING TO CLIENT");
    //     // socket.send(result.toString());
    //     // socket.json.send(result);
    //     // socket.JSON.send(result)
    //     console.log(result);
    //   }).catch((err) => {
    //     console.log(err);
    //   });
    // },3*5002)

    // import_obj.Getprice(socket);
    Getprice(socket);
    // setInterval(()=>{
    //   const price_dt = import_obj.price_obj;
    //   str = JSON.stringify(price_dt);
    //   socket.send(str)
    //   // console.log("+++++++++\n\n");
    //   // console.log(price_dt);
    //   // console.log("\n\n +++++++++");

    // } , 2*5001)



    // Getprice()
    //   .then((result) => {
    //     console.log("SENDING TO CLIENT");
    //     socket.send(result.toString());
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // handle the event sent with socket.emit()
    //   socket.on("salutations", (elem1, elem2, elem3) => {
    //     console.log(elem1, elem2, elem3);
    //   });
  });
}

module.exports = Data_from_api;