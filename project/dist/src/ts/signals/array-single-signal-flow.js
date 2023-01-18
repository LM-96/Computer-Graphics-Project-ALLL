"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _MappedSignalFlow_id, _MappedSignalFlow_subscriptions;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MappedSignalFlow = void 0;
const signal_1 = require("./signal");
const subscriptions_1 = require("./subscriptions");
/**
 * An implementation of `SingleSignalFlow` based on a map
 */
class MappedSignalFlow {
    constructor() {
        _MappedSignalFlow_id.set(this, void 0);
        _MappedSignalFlow_subscriptions.set(this, new Map());
    }
    subscribe(options) {
        let res = new subscriptions_1.SubscriptionReceipt(this.signalName.name + "#" + __classPrivateFieldGet(this, _MappedSignalFlow_id, "f").toString(), this.signalName, subscriptions_1.SubscriptionStatus.ACCEPTED);
        let subscription = new subscriptions_1.Subscription(res, options);
        __classPrivateFieldGet(this, _MappedSignalFlow_subscriptions, "f").set(res.subscriptionId, subscription);
        return res;
    }
    unsubscribe(subscriptionReceipt) {
        if (__classPrivateFieldGet(this, _MappedSignalFlow_subscriptions, "f").delete(subscriptionReceipt.subscriptionId)) {
            return (0, subscriptions_1.withSubscriptionStatusChanged)(subscriptionReceipt, subscriptions_1.SubscriptionStatus.UNSUBSCRIBED);
        }
        return null;
    }
    fire(source, data) {
        let signal = new signal_1.Signal(this.signalName, source, data);
        let results = new Map();
        let currentResult;
        for (let subscription of __classPrivateFieldGet(this, _MappedSignalFlow_subscriptions, "f").values()) {
            currentResult = subscription.options.handler(signal);
            results.set(subscription.receipt.subscriptionId, currentResult);
        }
        return new signal_1.FiredSignal(signal, results);
    }
}
exports.MappedSignalFlow = MappedSignalFlow;
_MappedSignalFlow_id = new WeakMap(), _MappedSignalFlow_subscriptions = new WeakMap();
//# sourceMappingURL=array-single-signal-flow.js.map