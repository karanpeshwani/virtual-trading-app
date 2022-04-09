const io = require("socket.io-client");
  const socket = io("ws://localhost:4000");

  socket.on("connect", () => {
    // either with send()
    socket.send("Hello!");

    // or with emit() and custom event names
    socket.emit(
      "salutations",
      "Hello!",
      { mr: "john" },
      Uint8Array.from([1, 2, 3, 4])
    );
  });