module.exports = [
  '$rootScope', '$scope', '$state', '$interval', '$window',
  function($rootScope, $scope, $state, $interval, $window) {
    $window.document.getElementById('answer').focus();

    $scope.answer = "";
    $scope.tip = 0;
    $scope.tips = [
      "Tip 1: Niet alle kaarten zijn programmeertalen",
      "Tip 2: Vervang de tekens door de cijfers",
      "Tip 3: Je hebt in totaal 7 kaarten nodig",
      "Tip 4: Leg de kaarten op alfabetische volgorde",
      "Tip 5: De kaarten vormen samen een som",
      "Tip 6: Vul het antwoord van de som hieronder in",
      "Tip 7: Bali, violet en wurgslang zijn GEEN programmeertalen",
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
        $scope.notification = "Jammer, probeer het nog eens...";
        $rootScope.playBuzzer();
        setTimeout(() => {
          $scope.notification = $scope.tips[$scope.tip];
          $scope.tip = $scope.tip + 1;
        }, 3000);
      }
    });


	}
];
