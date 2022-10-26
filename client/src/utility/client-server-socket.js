function ON_client_socket(BackmasterOBJ,perm_data) {
  const io = require("socket.io-client");
  const socket = io("ws://localhost:4000");

  socket.on("connect", () => {
    socket.send("Hello!, the client-server-socket is on.");
  });
  socket.on("message", (data) => {
    var obj_from_server = JSON.parse(data);
    
    for(var x in obj_from_server){
      BackmasterOBJ[x] = {
        symbol: x,
        LTP: obj_from_server[x],
        P_L: (obj_from_server[x] - perm_data[x]['avg_price']) * perm_data[x]['QTY'],
        percentage_change:
          ((obj_from_server[x] - perm_data[x]['avg_price']) /
            perm_data[x]['avg_price']) *
          100,
      };
    }
  });
}

module.exports = ON_client_socket;
