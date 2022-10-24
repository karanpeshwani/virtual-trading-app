const onFinhubSocketFunction = require("./onFinhubSocketFunction");

const io = require("socket.io")(4000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

function onServerClientSocket_and_onFinhubWebSocket_func() {
  console.log("Data from api-working");
  io.on("connection", (socket) => {
    console.log("socket is on");
    socket.on("message", (data) => {
      console.log(data);
    });

    onFinhubSocketFunction(socket);
  });
}

module.exports = onServerClientSocket_and_onFinhubWebSocket_func;