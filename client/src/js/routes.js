/**
 * Router config
 * @type {Array}
 */
module.exports = [
  '$stateProvider',
  '$locationProvider',
  '$urlRouterProvider',

  ($stateProvider, $locationProvider, $urlRouterProvider) => {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'template/index.html',
        controller: 'appController',
      })
      .state('start', {
        url: '/start',
        templateUrl: 'template/start.html',
        controller: 'startController',
      })
      .state('puzzel', {
        url: '/puzzel',
        templateUrl: 'template/puzzel.html',
        controller: 'puzzelController',
      })
      .state('correct', {
        url: '/correct',
        templateUrl: 'template/correct.html',
        controller: 'correctController',
      })
      .state('helaas', {
        url: '/helaas',
        templateUrl: 'template/helaas.html',
        controller: 'helaasController',
      })
  }
];
