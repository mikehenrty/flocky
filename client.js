const SERVER_URL = 'wss://flocky2.local:8001';

var output = document.getElementById('output');
function write(message) {
  var pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  output.appendChild(pre);
}

write('starting');
var ws = new WebSocket(SERVER_URL);

ws.onopen = function(evt) {
  write('opened connection');
}

ws.onclose = function(evt) {
  write('closed');
};

ws.onerror = function(evt) {
  write('error ' + evt);
};

ws.onmessage = function(evt) {
  if (evt.data == '1') {
    document.body.style.backgroundColor = 'blue';
  } else {
    document.body.style.backgroundColor = 'red';
  }
};
