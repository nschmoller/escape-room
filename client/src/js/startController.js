module.exports = [
  '$rootScope', '$scope', '$state',
  function($rootScope, $scope, $state) {
    $scope.$on('green_button', (event, data) => {
      $state.go('puzzel');
    });
	}
];
