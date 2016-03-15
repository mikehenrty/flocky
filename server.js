var ws = require('nodejs-websocket');

const PORT = 8001;

var conns = [];

var server = ws.createServer(conn => {
  console.log('got new connection');
  if (conns.indexOf(conn) === -1) {
    console.log('adding to array');
    conns.push(conn);
  }
});

function broadcast(message) {
  conns.forEach(conn => {
    conn.sendText(message);
  });
} 

server.listen(PORT);


// GPIO Stuff

const inputPin = 16;
var gpio = require('pi-gpio');

var oldVal = 'nothing';

gpio.open(inputPin, 'input', (err) => {
  console.log('error opening port', err);
  (function doRead() {
    gpio.read(inputPin, (err, val) => {
      err && console.log('got error reading', err);
      if (oldVal !== val) {
        oldVal = val;
        broadcast('' + val);
      }
      doRead();
      //setTimeout(doRead, 200);
    });
  })();
})
