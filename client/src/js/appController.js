module.exports = [
  '$rootScope', '$scope', '$state',
  function($rootScope, $scope, $state) {

    $scope.button_text = 'Not pushed';

    $scope.$on('server.message', function(event, data)
    {
      $state.go('start');
    });

    $scope.push_button = () => {
      $rootScope.$broadcast('server.message', { state: 'pushed' });
    };
	}
];
