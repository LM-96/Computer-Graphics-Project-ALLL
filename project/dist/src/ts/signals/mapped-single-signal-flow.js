"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _MappedSingleSignalFlow_id, _MappedSingleSignalFlow_subscriptions;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MappedSingleSignalFlow = void 0;
const signal_1 = require("./signal");
const subscriptions_1 = require("./subscriptions");
const result_1 = require("../types/result");
const log_1 = require("../log/log");
/**
 * An implementation of `SingleSignalFlow` based on a map
 */
class MappedSingleSignalFlow {
    constructor(signalName) {
        _MappedSingleSignalFlow_id.set(this, 0);
        _MappedSingleSignalFlow_subscriptions.set(this, new Map());
        this.signalName = signalName;
    }
    subscribe(options) {
        var _a;
        let res = new subscriptions_1.SubscriptionReceipt(this.signalName.name + "#" + __classPrivateFieldGet(this, _MappedSingleSignalFlow_id, "f").toString(), this.signalName, subscriptions_1.SubscriptionStatus.ACCEPTED);
        __classPrivateFieldSet(this, _MappedSingleSignalFlow_id, (_a = __classPrivateFieldGet(this, _MappedSingleSignalFlow_id, "f"), _a++, _a), "f");
        let subscription = new subscriptions_1.Subscription(res, options);
        __classPrivateFieldGet(this, _MappedSingleSignalFlow_subscriptions, "f").set(res.subscriptionId, subscription);
        return res;
    }
    unsubscribe(subscriptionReceipt) {
        if (__classPrivateFieldGet(this, _MappedSingleSignalFlow_subscriptions, "f").delete(subscriptionReceipt.subscriptionId)) {
            return (0, subscriptions_1.withSubscriptionStatusChanged)(subscriptionReceipt, subscriptions_1.SubscriptionStatus.UNSUBSCRIBED);
        }
        return null;
    }
    fire(source, data) {
        log_1.Log.log("SignalSystem | firing signal " + this.signalName.name);
        let signal = new signal_1.Signal(this.signalName, source, data);
        let results = new Map();
        let currentResult;
        for (let subscription of __classPrivateFieldGet(this, _MappedSingleSignalFlow_subscriptions, "f").values()) {
            log_1.Log.log("SignalSystem | firing signal " + this.signalName.name + " to subscriber " + subscription.receipt.subscriptionId);
            currentResult = (0, result_1.resultOf)(subscription.options.handler, signal.clone());
            results.set(subscription.receipt.subscriptionId, currentResult);
        }
        log_1.Log.log("SignalSystem | signal " + this.signalName.name + " fired");
        return new signal_1.SyncFiredSignal(signal, results);
    }
}
exports.MappedSingleSignalFlow = MappedSingleSignalFlow;
_MappedSingleSignalFlow_id = new WeakMap(), _MappedSingleSignalFlow_subscriptions = new WeakMap();
//# sourceMappingURL=mapped-single-signal-flow.js.map