//var app = angular.module('webManagerLite',[]);

define(function(){
	
 var _directive = function() {
    return {
	    restrict: 'E',
		  //scope: { type: '=',player:'=', time:'=' },
	    //templateUrl: 'MatchEvent.html'
	    template: '<h3>Hello World!!</h3>'
    };
  };	
	
	
return{
	initialize: function(app){
		app.directive('matchEvent', _directive);	
	}	
	
};
	
});
