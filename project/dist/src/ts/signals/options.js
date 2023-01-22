"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsubscribeWhen = exports.subscribeWhen = exports.onSignal = exports.handlerFor = exports.handler = exports.SubscriptionOptions = void 0;
const flow_1 = require("./flow");
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
class SignalSubscriptionContinuation {
    constructor() {
        this.subscribeWhen = null;
        this.subscribeWhenData = null;
        this.unsubscribeWhen = null;
        this.unsubscribeWhenData = null;
    }
}
const SignalToRegister = Symbol("SignalToRegister");
function getOrCreateSignalSubscriptionContinuation(target, propertyKey) {
    target[SignalToRegister] = target[SignalToRegister] || new Map();
    let signalSubscriptionContinuation = target[SignalToRegister].get(propertyKey);
    if (signalSubscriptionContinuation == undefined) {
        signalSubscriptionContinuation = new SignalSubscriptionContinuation();
        target[SignalToRegister].set(propertyKey, signalSubscriptionContinuation);
    }
    return signalSubscriptionContinuation;
}
/**
 * Register a method as a signal handler for the give `signalName`
 * @param {string} signalName the name of the signal to subscribe to
 * @param {(receipt: SubscriptionReceipt<S, D, R>) => void} withReceipt the function that will be invoked
 * when the subscription is completed
 */
function onSignal(signalName) {
    return function (target, propertyKey, descriptor) {
        let options = handler((signal) => {
            return descriptor.value(signal);
        });
        flow_1.default.subscribeWhenRegistered(signalName, options);
    };
}
exports.onSignal = onSignal;
function subscribeWhen(otherSignal, signalData) {
    return function (target, propertyKey, descriptor) {
        let continuation = getOrCreateSignalSubscriptionContinuation(target, propertyKey);
        continuation.subscribeWhen = otherSignal;
        continuation.subscribeWhenData = signalData;
    };
}
exports.subscribeWhen = subscribeWhen;
function unsubscribeWhen(otherSignal, signalData) {
    return function (target, propertyKey, descriptor) {
        let continuation = getOrCreateSignalSubscriptionContinuation(target, propertyKey);
        continuation.unsubscribeWhen = otherSignal;
        continuation.unsubscribeWhenData = signalData;
    };
}
exports.unsubscribeWhen = unsubscribeWhen;
//# sourceMappingURL=options.js.map