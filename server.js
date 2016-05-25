var express = require('express');
var app = express();
var fs = require("fs");
var faye = require('faye');
var exec = require('child_process').exec;
var button_state = 1;

// serve all asset files from necessary directories
app.use("/js", express.static(__dirname + "/client/dist/js"));
app.use("/img", express.static(__dirname + "/client/dist/img"));
app.use("/css", express.static(__dirname + "/client/dist/css"));
app.use("/partials", express.static(__dirname + "/client/dist/partials"));
app.use("/template", express.static(__dirname + "/client/dist/template"));

// serve index.html for all remaining routes, in order to leave routing up to angular
app.all("/*", function(req, res, next) {
  res.sendFile("index.html", { root: __dirname + "/client/dist" });
});

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
    const current = parseInt(stdout, 10);
    if (!isNaN(current) && current !== button_state) {
      button_state = current;
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
}, 50);
