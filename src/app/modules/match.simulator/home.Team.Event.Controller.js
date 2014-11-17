define(["eventBus"], function(eventBus){


	var _controller = function($scope, service){

		$scope.events=[{player:"Jogador A",time:"23",type:"1"},
		{player:"Jogador B",time:"32",type:"2"},
		{player:"Jogador C",time:"70",type:"3"}];
		

};


	return{
		initialize: function(app){
			app.controller("HomeTeamEventController", ["$scope","MatchSimulatorService", _controller]);
		}
	};
});