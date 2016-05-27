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
.controller('helaasController', require('./helaasController.js'))
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
      $rootScope.$apply();
		});

		client.subscribe('/red_button', function(data)
		{
      console.log('red button pushed');
		  $rootScope.$broadcast('red_button');
      $rootScope.$apply();
		});

		client.subscribe('/door_open', function(data)
		{
      console.log('door opened');
      $rootScope.door_open = true;
		  $rootScope.$broadcast('door_open');
      $rootScope.$apply();
		});

		client.subscribe('/door_close', function(data)
		{
      console.log('door closed');
      $rootScope.door_open = false;
		  $rootScope.$broadcast('door_close');
      $rootScope.$apply();
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

    $rootScope.skip_timer = () => {
      $rootScope.timer = 5;
      $rootScope.play_sound.currentTime = 295;
    };

    $rootScope.$on('red_button', (event, data) => {
      $state.go('home');
      $rootScope.stopTimer();
      $rootScope.stopAlarm();
      $rootScope.stopIntro();
      $rootScope.stopPlaySound();
      $rootScope.startIntro();
      $rootScope.notification = "";
    });

    $rootScope.$on('door_open', (event, data) => {
      if (!($state.is('home') || $state.is('correct'))) {
        console.log('illegal door open');
        $rootScope.notification = "Sluit de deur";
        $rootScope.playAlarm();
      }
    });

    $rootScope.$on('door_close', () => {
      $rootScope.notification = "";
      $rootScope.stopAlarm();
    });

    $rootScope.$on('time_up', () => {
      $rootScope.stopTimer();
      $state.go('helaas');
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
        $rootScope.minutes = zeroPad(window.Math.floor($rootScope.timer / 60));
        $rootScope.seconds = zeroPad($rootScope.timer % 60);
        if ($rootScope.timer === 0) {
          $rootScope.$broadcast('time_up');
        }
      }, 1000);
    };

    $rootScope.stopTimer = () => {
      console.log('stop timer');
      $interval.cancel($rootScope.interval);
      $rootScope.minutes = null;
      console.log('minutes: ', $rootScope.minutes);
      $rootScope.seconds = null;
    };

    $rootScope.startIntro = () => {
      $rootScope.intro_sound = new Audio('/assets/intro.mp3');
      $rootScope.intro_sound.loop = true;
      $rootScope.intro_sound.play();
    };

    $rootScope.stopIntro = () => {
      if ($rootScope.intro_sound) {
        $rootScope.intro_sound.pause();
      }
    };

    $rootScope.startPlaySound = () => {
      $rootScope.play_sound = new Audio('/assets/spel.mp3');
      $rootScope.play_sound.play();
    };

    $rootScope.stopPlaySound = () => {
      if ($rootScope.play_sound) {
        $rootScope.play_sound.pause();
      }
    };

    $rootScope.playBuzzer = () => {
      $rootScope.buzzer_sound = new Audio('/assets/buzzer.mp3');
      $rootScope.buzzer_sound.play();
    };

    $rootScope.playApplause = () => {
      $rootScope.applause_sound = new Audio('/assets/applause.mp3');
      $rootScope.applause_sound.play();
    };

    $rootScope.playAlarm = () => {
      $rootScope.alarm_sound = new Audio('/assets/alarm.mp3');
      $rootScope.alarm_sound.loop = true;
      $rootScope.alarm_sound.play();
    };

    $rootScope.stopAlarm = () => {
      if ($rootScope.alarm_sound) {
        $rootScope.alarm_sound.pause();
      }
    };

    $rootScope.startIntro();
	}
]);

