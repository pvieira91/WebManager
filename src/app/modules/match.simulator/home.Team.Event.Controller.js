define(["eventBus"], function(eventBus){


	var _controller = function($scope, service){

		$scope.events=[{player:"ABC",time:"23",type:"1"}];
		

};


	return{
		initialize: function(app){
			app.controller("HomeTeamEventController", ["$scope","MatchSimulatorService", _controller]);
		}
	};
});