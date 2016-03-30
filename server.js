var ws = require('nodejs-websocket');
var https = require("https");
var fs = require("fs");

const PORT = 8001;

    var privateKey  = fs.readFileSync('./key.pem', 'utf8');
    var certificate = fs.readFileSync('./cert.pem', 'utf8');
    var credentials = {key: privateKey, cert: certificate};

var conns = [];

var server = https.createServer(credentials, conn => {
  console.log('i dont know');
});
server.listen(PORT);

var wsserver = require('ws').Server;
var wss = new wsserver({ server: server });

wss.on('connection', ws => {
  console.log('got new connection');
  if (conns.indexOf(ws) === -1) {
    console.log('adding to array');
    conns.push(ws);
  }
});

function broadcast(message) {
  console.log('broadcasting', message);
  conns.forEach(conn => {
    try {
      conn.send(message);
    } catch (e) {}
  });
} 



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
