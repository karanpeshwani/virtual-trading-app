// Node.js socket server script
const net = require('net');
const Getprice = require('../utility/test-pricedata')
// Create a server object
const server = net.createServer((socket) => {

    function send_data(){
        const prc = Getprice();
        socket.write(prc.toString());
    }

    setInterval(send_data, 1000);

})

.on('error', (err) => {
  console.error(err);
});

// Open server on port 9898
server.listen(9898, () => {
  console.log('opened server on', server.address().port);
});
