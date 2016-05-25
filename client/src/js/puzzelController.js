module.exports = [
  '$rootScope', '$scope', '$state',
  function($rootScope, $scope, $state) {
    $scope.push_button = () => {
      $rootScope.$broadcast('server.message', { state: 'pushed' });
    };

    $scope.answer = "";

    $scope.$on('server.message', (event, data) => {
      if ($scope.answer == 880) {
        $state.go('correct');
      } else {
        // ?
      }
    });
	}
];
