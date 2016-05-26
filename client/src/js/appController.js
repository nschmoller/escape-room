module.exports = [
  '$rootScope', '$scope', '$state',
  function($rootScope, $scope, $state) {

    $scope.$on('green_button', function(event, data)
    {
      console.log('green button handler');
      console.log('door status: ', $rootScope.door_open);
      if (!$rootScope.door_open) {
        $rootScope.startTimer();
        $rootScope.stopIntro();
        $rootScope.startPlaySound();
        $state.go('start');
      } else {
        console.log('display notification');
        $rootScope.playBuzzer();
        $scope.notification = "Sluit eerst de deur";
      }
    });

    $scope.$on('door_close', () => {
      $scope.notification = "";
    });
	}
];
