require.config({
    baseUrl: '/',
    paths: {
		"eventBus": "app/infrastructure/event.bus"
    },
	 shim: {
       
    }
});

require(['App/app'], function (app) {
    app.initialize();
});
