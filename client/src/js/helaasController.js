module.exports = [
  '$rootScope', '$scope', '$state',
  function($rootScope, $scope, $state) {
    $scope.push_button = () => {
      $rootScope.$broadcast('server.message', { state: 'pushed' });
    };

    $scope.$on('server.message', (event, data) => {
      $state.go('puzzel');
    });
	}
];
