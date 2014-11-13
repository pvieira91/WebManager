define(['eventBus'], function (eventBus) {

    var _controller = function ($scope) {
        $scope.test = "hello world, i'm match simulator controller";

        eventBus.subscribe("teste", function (event, data) {
            $scope.test = data;
        });
		
    };

    var _initialize = function (app) {
        app.controller('MatchSimulatorController', ['$scope', _controller]);
    };

    return {
        initialize: _initialize
    };
});
