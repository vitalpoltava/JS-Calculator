/**
 * Singleton object that provides subscribe/publish pattern (simplified)
 */
Calculator.mediator = (function() {
    var events = {};

    return {
        /**
         * property to know that it is mediator
         */
        isMediator: true,

        /**
         * publish event/message
         * @param {string} event name
         * @returns {object} mediator
         */
        publish: function(event, args) {
            if (!events[event] || !events[event].length) return this;

            events[event].forEach(function(fn) {
                fn(event, args);
            });
            return this;
        },

        /**
         * subscribe to event
         * @param {string} event event name
         * @param {function} fn function to execute on event publish
         * @returns {object} mediator
         */
        subscribe: function(event, fn) {
            if (event && typeof fn === 'function') {
                if (!events[event]) {
                    events[event] = [];
                }
                events[event].push(fn);
            }
            return this;
        },

        /**
         * unsubscribe from event
         * @param {event} event event name
         * @returns {object} mediator
         */
        unsubscribe: function(event) {
            events[event] = [];
            return this;
        }
    };

}());
