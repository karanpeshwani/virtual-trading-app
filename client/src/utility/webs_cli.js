function ONN_client_socket(setmasterOBJ,perm_data) {
  const io = require("socket.io-client");
  const socket = io("ws://localhost:4000");

  socket.on("connect", () => {
    socket.send("Hello! LLLLLL");
  });
  socket.on("message", (data) => {
    var obj_from_server = JSON.parse(data);


    var updated_obj={}
    for(var x in obj_from_server){
      console.log(x);
      console.log(perm_data['TSLA']);
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
    // console.log(updated_obj);
    setmasterOBJ((old_dt) => {
      return {
        ...old_dt,
        ...updated_obj,
      };
    });
  });

  socket.on("greetings", (elem1, elem2, elem3) => {
    // console.log(elem1, elem2, elem3);
  });
}

module.exports = ONN_client_socket;
