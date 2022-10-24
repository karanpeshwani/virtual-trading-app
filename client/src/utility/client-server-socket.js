function ON_client_socket(setBackmasterOBJ,perm_data) {
  const io = require("socket.io-client");
  const socket = io("ws://localhost:4000");

  socket.on("connect", () => {
    socket.send("Hello!, the client-srver-socket is on.");
  });
  socket.on("message", (data) => {
    var obj_from_server = JSON.parse(data);
    var updated_obj={}
    for(var x in obj_from_server){
      updated_obj[x] = {
        symbol: x,
        LTP: obj_from_server[x],
        P_L: (obj_from_server[x] - perm_data[x]['avg_price']) * perm_data[x]['QTY'],
        percentage_change:
          ((obj_from_server[x] - perm_data[x]['avg_price']) /
            perm_data[x]['avg_price']) *
          100,
      };
    }
    setBackmasterOBJ((old_dt) => {
      return {
        ...old_dt,
        ...updated_obj,
      };
    });
  });
}

module.exports = ON_client_socket;
