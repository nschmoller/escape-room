/**
 * Router config
 * @type {Array}
 */
module.exports = [
  '$stateProvider',

  ($stateProvider) => {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'template/index.html',
            controller: 'appController',
        })
        
  }
];
