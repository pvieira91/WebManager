define(["eventBus"], function(eventBus){


	var _controller = function($scope, service){

		$scope.events=[{player:"Jogador D",time:"23",type:"2"},
		{player:"Jogador E",time:"32",type:"1"},
		{player:"Jogador F",time:"70",type:"3"},
		{player:"Jogador G",time:"87",type:"5"},
		{player:"Jogador H",time:"87",type:"6"}];
		

};


	return{
		initialize: function(app){
			app.controller("VisitorTeamEventController", ["$scope","MatchSimulatorService", _controller]);
		}
	};
});