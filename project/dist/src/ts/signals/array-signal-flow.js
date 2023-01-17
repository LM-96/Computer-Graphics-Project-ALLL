"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ArraySingleSignalFlow_id, _ArraySingleSignalFlow_subscriptions;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArraySingleSignalFlow = void 0;
const signal_1 = require("./signal");
const subscriptions_1 = require("./subscriptions");
/**
 * A `flow` of signal intended as a component able to *accept* subscriptions and to *trigger* signals notifying
 * the subscribers.
 * This flow is *single* in the sense that is dedicated only to a specific *SignalName*
 */
class ArraySingleSignalFlow {
    constructor() {
        _ArraySingleSignalFlow_id.set(this, void 0);
        _ArraySingleSignalFlow_subscriptions.set(this, new Map());
    }
    subscribe(options) {
        let res = new subscriptions_1.SubscriptionReceipt(this.signalName.name + "#" + __classPrivateFieldGet(this, _ArraySingleSignalFlow_id, "f").toString(), this.signalName);
        let subscription = new subscriptions_1.Subscription(res, options);
        __classPrivateFieldGet(this, _ArraySingleSignalFlow_subscriptions, "f").set(res.subscriptionId, subscription);
        return res;
    }
    unsubscribe(subscriptionReceipt) {
        __classPrivateFieldGet(this, _ArraySingleSignalFlow_subscriptions, "f").delete(subscriptionReceipt.subscriptionId);
    }
    fire(source, data) {
        let signal = new signal_1.Signal(this.signalName, source, data);
        let results = new Map();
        let currentResult;
        for (let subscription of __classPrivateFieldGet(this, _ArraySingleSignalFlow_subscriptions, "f").values()) {
            currentResult = subscription.options.handler(signal);
            results.set(subscription.receipt.subscriptionId, currentResult);
        }
        return new signal_1.FiredSignal(signal, results);
    }
}
exports.ArraySingleSignalFlow = ArraySingleSignalFlow;
_ArraySingleSignalFlow_id = new WeakMap(), _ArraySingleSignalFlow_subscriptions = new WeakMap();
//# sourceMappingURL=array-signal-flow.js.map