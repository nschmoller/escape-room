module.exports = [
  '$rootScope', '$scope', '$state', '$interval',
  function($rootScope, $scope, $state, $interval) {
    $scope.push_button = () => {
      $rootScope.$broadcast('server.message', { state: 'pushed' });
    };

    $scope.answer = "";

    $scope.$on('green_button', (event, data) => {
      if ($scope.answer == 520) {
        $state.go('correct');
        $interval.cancel($rootScope.interval);
      } else {
        // ?
      }
    });


	}
];
