define(['app/modules/match.simulator/controller',
		'app/modules/match.simulator/score.controller',
		'app/modules/match.simulator/comments.controller',
		'app/modules/match.simulator/ball.position.controller',

		'app/modules/match.simulator/service'


	], function (controller, scoreController, commentsController, ballPositionController, service) {

		function _initialize(moduleName) {
			
			if (typeof moduleName == "undefined" || moduleName == null) {
				throw new Error("webGis.disableCache: moduleName must be defined!");
			}

			var app = angular.module(moduleName,[]);
			controller.initialize(app);
			scoreController.initialize(app);
			commentsController.initialize(app);
			ballPositionController.initialize(app);
			service.initialize(app);

		};

    return {
        initialize: _initialize
    };

});