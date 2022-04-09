const io = require("socket.io")(4000, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});


io.on("connection", (socket) => {
    console.log("socket is on");
    socket.on("message", (data) => {
      console.log(data);
    });
  });