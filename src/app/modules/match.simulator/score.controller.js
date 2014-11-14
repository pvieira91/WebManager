define(["eventBus"], function(eventBus){

	var _controller = function($scope){
		
		
		$scope.homeTeam={
			goals:0,
			name:"N/A"
		};

		$scope.visitorTeam={
			goals:0,
			name:"N/A"
		};

		eventBus.subscribe("preMatch", function(event, data){
				$scope.homeTeam.goals = data.homeTeam.goals;
				$scope.homeTeam.name = data.homeTeam.name;
				$scope.visitorTeam.goals = data.visitorTeam.goals;
				$scope.visitorTeam.name = data.visitorTeam.name;
		});

		eventBus.subscribe("onGoal", function(event, data){
			switch(data.teamType){
				case 1:
					$scope.homeTeam.goals++;
				break;
				case 2:
					$scope.visitorTeam.goals++;
				break;
			}
		});

		function init(){
			eventBus.publish("preMatch",
            {
                homeTeam:{
                    goals:0,
                    name:"FC Porto"
                },
                visitorTeam:{
                    goals:0,
                    name:"SL Benfica"
                }
            });
		}
		init();
	};

	return {
		initialize: function(app){

			app.controller("ScoreController", ["$scope", _controller])
		}
	};

});