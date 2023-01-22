"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SyncFiredSignal_result;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncFiredSignal = exports.FiredSignal = exports.Signal = exports.SignalName = void 0;
/**
 * The name of a signal
 */
class SignalName {
    constructor(signalName) {
        this.name = signalName;
    }
    equals(other) {
        if (other != undefined) {
            if (other instanceof SignalName) {
                return other.name == this.name;
            }
        }
        return false;
    }
}
exports.SignalName = SignalName;
/**
 * A signal that is currently firing
 */
class Signal {
    constructor(name, source, data) {
        this.name = name;
        this.source = source;
        this.data = data;
    }
    clone() {
        return new Signal(this.name, this.source, this.data);
    }
}
exports.Signal = Signal;
/**
 * A signal that has previously been fired.
 * It contains also the firing signal that was received from the handlers and the that
 * in which the signal was fired
 */
class FiredSignal {
    constructor(signal) {
        /**
         * The time in which the signal was fired
         */
        this.date = new Date();
        this.signal = signal;
    }
}
exports.FiredSignal = FiredSignal;
/**
 * A synchronous fired signal.
 * This signal contains the result of the executed handlers associated by the subscription id
 */
class SyncFiredSignal extends FiredSignal {
    constructor(signal, result) {
        super(signal);
        _SyncFiredSignal_result.set(this, new Map());
        __classPrivateFieldSet(this, _SyncFiredSignal_result, result, "f");
    }
    /**
     * Gets the result of the given subscription
     * @param {string} subscriptionId the id of the desired subscription
     * @return {Result<R>} the result for the specified subscription or `undefined` if no
     * result is present for that subscription
     */
    getResultOf(subscriptionId) {
        return __classPrivateFieldGet(this, _SyncFiredSignal_result, "f").get(subscriptionId);
    }
}
exports.SyncFiredSignal = SyncFiredSignal;
_SyncFiredSignal_result = new WeakMap();
//# sourceMappingURL=signal.js.map