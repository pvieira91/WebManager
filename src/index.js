require.config({
    baseUrl: '/',
    paths: {
		"eventBus": "app/infrastructure/event.bus",
		"simulatorCore" : "app/modules/match.simulator/simulator.core"
    },
	 shim: {
       
    }
});

require(['App/app'], function (app) {
    app.initialize();
});
