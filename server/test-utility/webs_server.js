// const pricedata = require("./pricedata");

// Node.js socket server script
const net = require("net");

// Create a server object
const server = net
  .createServer((socket) => {
    socket.on("data", (dt) => {
      // console.log(pricedata.toString());
      console.log("hello");
    });

    function send_data(){
      const pricedata = require("../utility/pricedata");
      socket.write(pricedata.toString())
    }

    setInterval(send_data, 1000)
    // socket.end('SERVER: Closing connection now.<br>');
    socket.write('buvbvr')
  })
  // server.write("buvbvr")
  .on("error", (err) => {
    console.error(err);
  });
// Open server on port 9898
server.listen(9898, () => {
  console.log("opened server on", server.address().port);
});

// 'SERVER: Hello! This is server speaking.<br>'
