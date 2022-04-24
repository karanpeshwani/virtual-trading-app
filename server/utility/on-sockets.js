
const onFinhubWebSocket_func = require("./test-pricedata");

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

    onFinhubWebSocket_func(socket);
  });
}

module.exports = onServerClientSocket_and_onFinhubWebSocket_func;