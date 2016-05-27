module.exports = [
  '$rootScope', '$scope', '$state', '$interval', '$window',
  function($rootScope, $scope, $state, $interval, $window) {
    $window.document.getElementById('answer').focus();

    $scope.answer = "";
    $scope.tip = 0;
    $scope.tips = [
      "Tip 1: Druk op de groene knop voor meer tips",
      "Tip 2: Schrijf de kaarten op papier, met tekens",
      "Tip 3: Alle kaarten vormen samen een som",
      "Tip 4: Niet alle kaarten zijn programmeertalen",
      "Tip 5: Vervang de tekens door de cijfers",
      "Tip 6: De * bij javascript is vermenigvuldigen",
      "Tip 7: Er zijn in totaal 14 kaarten",
      "Tip 8: Van de 14 kaarten heb je er 11 nodig",
      "Tip 9: Bali, violet en wurgslang zijn GEEN programmeertalen",
      "Nu moet je het echt zelf doen. De tips zijn op!"
    ];

    $scope.$on('green_button', (event, data) => {
      if ($scope.answer == 520) {
        setTimeout(() => {
          $rootScope.stopPlaySound();
        }, 2000);
        $rootScope.playApplause();
        $state.go('correct');
        $interval.cancel($rootScope.interval);
        setTimeout(() => {
          $rootScope.red_button();
        }, 60000);
      } else {
        $rootScope.playBuzzer();
        $scope.notification = $scope.tips[$scope.tip];
        $scope.tip = $scope.tip + 1;
        if ($scope.tip === 10) {
          $scope.tip = 0;
        }
      }
    });

    setTimeout(() => {
      $scope.notification = $scope.tips[$scope.tip];
      $scope.tip = $scope.tip + 1;
    }, 60000);

	}
];
