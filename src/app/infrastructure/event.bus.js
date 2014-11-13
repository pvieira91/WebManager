define(function () {

    var _channel = null;

    function _angularSafeApply(fn) {
        var root = _getAngularRootScope();
        var phase = root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof (fn) === 'function')) {
                fn();
            }
        } else {
            root.$apply(fn);
        }
    }

    function _getAngularRootScope() {
        if (_channel !== null) return _channel;
        
        var rootElement = angular.element(document.getElementsByTagName("body")[0]);
        if (!(rootElement && rootElement.scope())) {
            throw new Error("WebGIS: Root scope unreachable!");
        }

        var scope = rootElement.scope();
        _channel = scope.$root;
        return _channel;
    }

    function _angularPublish(eventName, eventData) {
        _angularSafeApply(function () {
            var channel = _getAngularRootScope();
            channel.$emit(eventName, eventData);
        });
    };
    
    function _angularSubscribe(eventName, eventCallback) {
        _angularSafeApply(function () {
            var channel = _getAngularRootScope();
            return channel.$on(eventName, eventCallback);
        });
    };

    function _angularUnsubscribe() {
        throw new Error("WebGIS: To be implemented _angularUnsubscribe()");
    }

    return {
        publish: function (eventName, eventData) {
            _angularPublish(eventName, eventData);
        },
        subscribe: function (eventName, eventCallback) {
            _angularSubscribe(eventName, eventCallback);
        },
        unsubscribe: function (eventName) {
            _angularUnsubscribe()
        }
    };

});