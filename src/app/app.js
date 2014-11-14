define(['app/modules/match.simulator/app'],
    function (matchSimulatorModule) {

        var _initialize = function () {

			
            //First Init Sub Modules
            matchSimulatorModule.initialize("webManagerLite.matchsimulator");

            /*Init Main Module */
            var app = angular.module('webManagerLite', ['ngRoute', 'ngAnimate', "ui.bootstrap", "webManagerLite.matchsimulator"]);

            
            app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
				$routeProvider.when('/matchsimulator', { templateUrl: 'app/modules/match.simulator/template.html', controller: 'MatchSimulatorController' });
                $routeProvider.otherwise({ redirectTo: '/matchsimulator' });
            }]);

            $(function () {
                angular.bootstrap(document, ['webManagerLite']);
            });
        };

        return {
            initialize: _initialize
        };
		
	}
);