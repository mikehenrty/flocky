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

setInterval(() => {
  conns.forEach(conn => {
    conn.sendText('yeah');
  });
}, 500);

server.listen(PORT);
