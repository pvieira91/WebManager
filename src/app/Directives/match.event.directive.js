//var app = angular.module('webManagerLite',[]);

define(function(){
	
 var _directive = function() {
    return {
	    restrict: 'E',
		scope: { type: '=',player:'=', time:'=' },
	    templateUrl: '/app/directives/templates/matchEvent.html'
	   
    };
  };	
	
	
return{
	initialize: function(app){
		app.directive('matchEvent', _directive);	
	}	
	
};
	
});
