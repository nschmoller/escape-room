module.exports = [
  '$rootScope', '$scope', '$state',
  function($rootScope, $scope, $state) {
    setTimeout(() => {
      $rootScope.red_button();
    }, 60000);
	}
];
