var express = require('express');
var app = express();
var fs = require("fs");
var faye = require('faye');
var exec = require('child_process').exec;
var button_state = 1;

app.use(express.static('client/dist'));

var server = app.listen(8000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});

var bayeux = new faye.NodeAdapter({mount: '/faye', timeout: 45});
bayeux.attach(server);

// send test message
setTimeout(() => {
  bayeux.getClient().publish('/server', {
    text: 'test message'
  });
}, 5000);

// send for button
setInterval(() => {
  exec("gpio read 7", (error, stdout, stderr) => {
    if (stdout !== button_state) {
      button_state = stdout;
      if (button_state !== 1) {
        console.log('button pushed');
        bayeux.getClient().publish('/button', {
          state: 'pushed'
        });
      } else {
        // don't do anything on button release
      }
    }
  });
}, 100);
