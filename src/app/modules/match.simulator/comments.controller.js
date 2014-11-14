define(["eventBus"], function(eventBus){


	var _controller = function($scope, service){

		$scope.comment = {
			type:3,
			text:"Pre-Match",
			prefix:""
		}

		eventBus.subscribe("newComment", function(event, data){
			$scope.comment.text =  data.text;
			if(data.type==1){
				$scope.comment.prefix = service.homeTeam.name + " | ";
			}else if(data.type==2){
				$scope.comment.prefix = service.visitorTeam.name + " | ";
			}
		});

		eventBus.subscribe("onMatchEnd", function(event, data){
			$scope.comment.prefix="";
			$scope.comment.type=3;
			$scope.comment.text="End of Match";
		});

	};


	return{
		initialize: function(app){
			app.controller("CommentsController", ["$scope","MatchSimulatorService", _controller]);
		}
	};
});