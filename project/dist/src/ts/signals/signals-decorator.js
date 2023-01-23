"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsubscribeWhen = exports.subscribeWhen = exports.SignalListener = exports.OnSignalMethod = exports.OnSignalSubMethod = exports.OnSignal = void 0;
const log_1 = require("../log/log");
const flow_1 = require("./flow");
const options_1 = require("./options");
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
function OnSignal(signalName) {
    return function (target, propertyKey, descriptor) {
        log_1.Log.log("onSignal | registering signal handler for signal " + signalName + " on method " + propertyKey);
        let options = (0, options_1.handler)((signal) => {
            return descriptor.value(signal);
        });
        flow_1.default.subscribeWhenRegistered(signalName, options);
    };
}
exports.OnSignal = OnSignal;
exports.OnSignalSubMethod = Symbol("OnSignalMethod");
function OnSignalMethod(signalName) {
    return function (target, propertyKey, descriptor) {
        log_1.Log.log("onSignal | registering signal handler for signal " + signalName + " on method " + propertyKey);
        target[exports.OnSignalSubMethod] = target[exports.OnSignalSubMethod] || new Map();
        target[exports.OnSignalSubMethod].set(propertyKey, signalName);
    };
}
exports.OnSignalMethod = OnSignalMethod;
function SignalListener(Base) {
    return class extends Base {
        constructor(...args) {
            super(...args);
            const onSignalMethods = Base.prototype[exports.OnSignalSubMethod];
            if (onSignalMethods != undefined) {
                onSignalMethods.forEach((signalName, methodName) => {
                    let options = (0, options_1.handler)((signal) => {
                        return this[methodName](signal);
                    });
                    flow_1.default.subscribeWhenRegistered(signalName, options);
                });
            }
        }
    };
}
exports.SignalListener = SignalListener;
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
//# sourceMappingURL=signals-decorator.js.map