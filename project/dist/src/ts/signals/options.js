"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerFor = exports.handler = exports.SubscriptionOptions = void 0;
class SubscriptionOptions {
    constructor(signalName, handler) {
        this.signalName = undefined;
        this.signalName = signalName;
        this.handler = handler;
    }
}
exports.SubscriptionOptions = SubscriptionOptions;
/**
 * Creates and returns a new `SubscriptionOptions` which contains only the handler to be invoked when
 * the signal is triggered
 * @param {SignalHandler<S, D, R>} handler the asynchronous function that has to be invoked once a signal is triggered
 * @return {SubscriptionOptions<S, D, R>} the new created options ready to be passed to the `subscribe` function
 */
function handler(handler) {
    return new SubscriptionOptions(undefined, handler);
}
exports.handler = handler;
/**
 * Creates and returns a new `SubscriptionOptions` which contains the name of the signal the options will refer to
 * and the handler to be invoked when the specified signal is triggered
 * @param {SignalName} signalName the name of the signal these options refer to
 * @param {SignalHandler<S, D, R>} handler the asynchronous function that has to be invoked once a signal is triggered
 * @return {SubscriptionOptions<S, D, R>} the new created options ready to be passed to the `subscribe` function
 */
function handlerFor(signalName, handler) {
    return new SubscriptionOptions(signalName, handler);
}
exports.handlerFor = handlerFor;
//# sourceMappingURL=options.js.map