// No logic in here. Just project requires
require('angular');
require('angular-ui-router');
require('angular-sanitize');

// Load modules
 

module.exports = angular
.module('app', [
    'ui.router'
])
.controller('appController', require('./appController.js'))
.config(require('./routes.js'))

var client = new Faye.Client('http://localhost:8000/faye');
var subscription = client.subscribe('/server', function(message) {
  console.log('message: ', message);
});

client.subscribe('/button', function(message) {
  console.log('button pushed');
});
