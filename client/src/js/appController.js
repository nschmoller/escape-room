module.exports = [
    '$rootScope', '$scope',
    function($rootScope, $scope) {

    	$scope.button = 'Not pushed';

    	$scope.$on('server.message', function(event, data)
    	{
    		$scope.button = data.state;
    		$scope.$apply();
    	});	
  	
	}
];
