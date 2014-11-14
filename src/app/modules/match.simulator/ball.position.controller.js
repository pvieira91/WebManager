define(["eventBus"], function(eventBus){


	var _controller = function($scope, service){

		$scope.position = 90;

		eventBus.subscribe("onChangeBallPosition", function(event, data){
		
			switch(data.position){
				case 1:
					$scope.position=25;
					break;
				case 2:
					$scope.position=50;
					break;
				case 3:
					$scope.position=75;
					break;
			}

		});

	};


	return{
		initialize: function(app){
			app.controller("BallPositionController", ["$scope", "MatchSimulatorService", _controller]);
		}
	};

});