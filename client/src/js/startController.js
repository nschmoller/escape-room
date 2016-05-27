module.exports = [
  '$rootScope', '$scope', '$state',
  function($rootScope, $scope, $state) {
    $scope.$on('green_button', (event, data) => {
      $state.go('puzzel');
    });

    setTimeout(() => {
      $scope.notification = "Druk op de groene knop!";
      setTimeout(() => {
        $scope.notification = "";
      }, 10000);
    }, 60000);
	}
];
