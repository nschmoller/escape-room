// No logic in here. Just project requires
require('angular');
require('angular-ui-router');
require('angular-sanitize');

var Faye = require('faye');

module.exports = angular
.module('app', [
    'ui.router'
])
.controller('appController', require('./appController.js'))
.config(require('./routes.js'))
.run(
	['$rootScope', 
	function($rootScope) {
    /*var client = new Faye.Client('http://192.168.2.36:8000/faye');*/
		var client = new Faye.Client('http://localhost:8000/faye');
		var subscription = client.subscribe('/server', function(data) 
		{
		  $rootScope.$broadcast('server.message', data );
		});

		client.subscribe('/button', function(data) 
		{
      console.log('button pushed');
		  $rootScope.$broadcast('server.message', data );
		});

	}
]);

