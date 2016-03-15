const inputPin = 16;
var gpio = require('pi-gpio');

gpio.open(inputPin, 'input', (err) => {
  console.log('error opening port', err);
  (function doRead() {
    gpio.read(inputPin, (err, val) => {
      err && console.log('got error reading', err);
      console.log('val', val);
      setTimeout(doRead, 200);
    });
  })();
})
