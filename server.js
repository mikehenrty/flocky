var ws = require('nodejs-websocket');

var server = ws.createServer(conn => {
  console.log('got new connection');
  if (conns.indexOf(conn) === -1) {
    console.log('adding to array');
    conns.push(conn);
  }
}

setInterval(() => {
  conns.forEach(conn => {
    conn.sendText(Math.random());
  });
}, 500);

server.listen(PORT);
