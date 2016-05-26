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
.controller('startController', require('./startController.js'))
.controller('puzzelController', require('./puzzelController.js'))
.controller('correctController', require('./correctController.js'))
.config(require('./routes.js'))
.run(
	['$rootScope', '$interval', '$state',
	function($rootScope, $interval, $state) {
    /*var client = new Faye.Client('http://192.168.2.36:8000/faye');*/
		var client = new Faye.Client('http://localhost:8000/faye');

		client.subscribe('/green_button', function(data)
		{
      console.log('green button pushed');
		  $rootScope.$broadcast('green_button');
		});

		client.subscribe('/red_button', function(data)
		{
      console.log('red button pushed');
		  $rootScope.$broadcast('red_button');
		});

		client.subscribe('/door_open', function(data)
		{
      console.log('door opened');
		  $rootScope.$broadcast('door_open');
		});

		client.subscribe('/door_close', function(data)
		{
      console.log('door closed');
		  $rootScope.$broadcast('door_close');
		});

    $rootScope.green_button = () => {
      $rootScope.$broadcast('green_button');
    };

    $rootScope.red_button = () => {
      $rootScope.$broadcast('red_button');
    };

    $rootScope.door_open = true;
    $rootScope.toggle_door = () => {
      if ($rootScope.door_open) {
        $rootScope.door_open = false;
        $rootScope.$broadcast('door_close');
        console.log('door close');
      } else {
        $rootScope.door_open = true;
        $rootScope.$broadcast('door_open');
        console.log('door open');
      }
    };

    $rootScope.$on('red_button', (event, data) => {
      $state.go('home');
      $interval.cancel($rootScope.interval);
    });

    $rootScope.$on('door_open', (event, data) => {
      if (!($state.is('home') || $state.is('correct'))) {
        console.log('illegal door open');
      }
    });


    function zeroPad(number) {
      if (number < 10) {
        return "0" + number;
      } else {
        return number;
      }
    }

    $rootScope.startTimer = () => {
      $rootScope.timer = 300;
      $rootScope.minutes = zeroPad(window.Math.floor($rootScope.timer / 60));
      $rootScope.seconds = zeroPad($rootScope.timer % 60);
      $rootScope.interval = $interval(() => {
        $rootScope.timer = $rootScope.timer - 1;
        if ($rootScope.timer === 0) {
          $rootScope.$broadcast('time_up');
        }
        $rootScope.minutes = zeroPad(window.Math.floor($rootScope.timer / 60));
        $rootScope.seconds = zeroPad($rootScope.timer % 60);
      }, 1000);
    }

    var intro_sound = new Audio('/assets/intro.mp3');
    intro_sound.loop = true;
    intro_sound.play();
    setTimeout(() => {
      intro_sound.pause();
    }, 5000);

	}
]);

