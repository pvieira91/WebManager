define(['app/modules/match.simulator/controller'], function (controller) {

		function _initialize(moduleName) {
			alert("Init match simulator module");
			if (typeof moduleName == "undefined" || moduleName == null) {
				throw new Error("webGis.disableCache: moduleName must be defined!");
			}

			var app = angular.module(moduleName,[]);
			controller.initialize(app);
		};

    return {
        initialize: _initialize
    };

});