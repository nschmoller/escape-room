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

