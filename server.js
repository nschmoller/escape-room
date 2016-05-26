var express = require('express');
var app = express();
var fs = require("fs");
var faye = require('faye');
var exec = require('child_process').exec;
var green_button_state = 1;
var red_button_state = 1;
var door_state = 1;

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

// send for green button
setInterval(() => {
  exec("gpio read 7", (error, stdout, stderr) => {
    const current = parseInt(stdout, 10);
    if (!isNaN(current) && current !== green_button_state) {
      green_button_state = current;
      if (green_button_state !== 1) {
        console.log('green button pushed');
        bayeux.getClient().publish('/green_button', {
          state: 'pushed'
        });
      } else {
        // don't do anything on button release
      }
    }
  });
}, 50);

// send for red button
setInterval(() => {
  exec("gpio read 11", (error, stdout, stderr) => {
    const current = parseInt(stdout, 10);
    if (!isNaN(current) && current !== red_button_state) {
      red_button_state = current;
      if (red_button_state !== 1) {
        console.log('red button pushed');
        bayeux.getClient().publish('/red_button', {
          state: 'pushed'
        });
      } else {
        // don't do anything on button release
      }
    }
  });
}, 50);

// send for door
setInterval(() => {
  exec("gpio read 35", (error, stdout, stderr) => {
    const current = parseInt(stdout, 10);
    if (!isNaN(current) && current !== door_state) {
      door_state = current;
      if (door_state !== 1) {
        console.log('door opened');
        bayeux.getClient().publish('/door_open', {
          state: 'open'
        });
      } else {
        console.log('door closed');
        bayeux.getClient().publish('/door_close', {
          state: 'closed'
        });
      }
    }
  });
}, 50);
