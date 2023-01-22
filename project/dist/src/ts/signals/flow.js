"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _SignalFlows_singleSignalFlows, _SignalFlows_newSignalFlow, _SignalFlows_getOrThrow;
Object.defineProperty(exports, "__esModule", { value: true });
const signal_1 = require("./signal");
const mapped_single_signal_flow_1 = require("./mapped-single-signal-flow");
const pair_1 = require("../types/pair");
const illegal_signal_name_exception_1 = require("./exceptions/illegal-signal-name-exception");
const options_1 = require("./options");
const log_1 = require("../log/log");
class SignalFlows {
    static newSingleFlow(signalName) {
        if (__classPrivateFieldGet(this, _a, "f", _SignalFlows_singleSignalFlows).has(signalName))
            throw new illegal_signal_name_exception_1.IllegalSignalNameException(signalName, "name already exists");
        let signalNameInst = new signal_1.SignalName(signalName);
        let flow = new mapped_single_signal_flow_1.MappedSingleSignalFlow(signalNameInst);
        __classPrivateFieldGet(this, _a, "f", _SignalFlows_singleSignalFlows).set(signalName, (0, pair_1.pairOf)(signalNameInst, flow));
        __classPrivateFieldGet(this, _a, "f", _SignalFlows_newSignalFlow).fire(null, signalName);
        log_1.Log.log("SignalSystem | registered signal " + signalName);
        return flow;
    }
    /**
     * Returns the global subscriber for the signal that is fired every time a new
     * signal is created and registered.
     * The signal will have the name `signal-system.new` and the data will be the name of the
     * new signal
     */
    static getNewSignalSubscriber() {
        return __classPrivateFieldGet(this, _a, "f", _SignalFlows_newSignalFlow);
    }
    /**
     * Returns the `SignalName` associated to the signal with the given string of name or
     * `undefined` if the name is not registered
     * @param {string} signalName the string name of the signal
     * @return {SignalName} the `SignalName` instance associated with the given `name` or `undefined`
     * if no `SignalName` is associated with the given name
     */
    static getSignalName(signalName) {
        return __classPrivateFieldGet(this, _a, "m", _SignalFlows_getOrThrow).call(this, signalName).getFirst();
    }
    static getSubscriber(signalName) {
        if (typeof signalName === "string") {
            return __classPrivateFieldGet(this, _a, "m", _SignalFlows_getOrThrow).call(this, signalName).getSecond();
        }
        else {
            return __classPrivateFieldGet(this, _a, "m", _SignalFlows_getOrThrow).call(this, signalName.name).getSecond();
        }
    }
    /**
     * Immediately subscribes to the given `signalName` if already registered or
     * asynchronous waits for the signal to be registered and then subscribes to it
     * @param {SubscriptionOptions} options the options for the subscription
     * @param {(receipt: SubscriptionReceipt) => void} whenReceiptAvailable the callback with the receipt
     * that is called when the subscription receipt is available
     */
    static subscribeWhenRegistered(signalName, options, whenReceiptAvailable = () => { }) {
        try {
            let receipt = this.getSubscriber(signalName).subscribe(options);
            whenReceiptAvailable(receipt);
            log_1.Log.log("SignalSystem | subscribed to signal " + signalName +
                " immediately with subscriptionId " + receipt.subscriptionId);
        }
        catch (e) {
            log_1.Log.log("SignalSystem | signal " + signalName + " not registered, waiting for registration");
            let newSignalReceipt = this.getNewSignalSubscriber()
                .subscribe((0, options_1.handler)((signal) => {
                if (signal.data === signalName) {
                    log_1.Log.log("SignalSystem | signal " + signalName + " registered, subscribing");
                    let receipt = this.getSubscriber(signalName).subscribe(options);
                    whenReceiptAvailable(receipt);
                    this.getNewSignalSubscriber().unsubscribe(newSignalReceipt);
                }
            }));
        }
    }
    /**
     * Gets an array containing all the signals that have correctly been registered
     * @return {Array<SignalName>} the array with all the registered signals
     */
    static getRegisteredSignals() {
        let res = [];
        __classPrivateFieldGet(this, _a, "f", _SignalFlows_singleSignalFlows).forEach((value, _) => {
            res.push(value.getFirst());
        });
        return res;
    }
}
exports.default = SignalFlows;
_a = SignalFlows, _SignalFlows_getOrThrow = function _SignalFlows_getOrThrow(signalName) {
    let signalFlow = __classPrivateFieldGet(this, _a, "f", _SignalFlows_singleSignalFlows).get(signalName);
    if (signalFlow == undefined) {
        throw new illegal_signal_name_exception_1.IllegalSignalNameException(signalName, "no signal with this name");
    }
    return signalFlow;
};
SignalFlows.NEW_SIGNAL_SIGNAL_NAME = "signal-system.new";
_SignalFlows_singleSignalFlows = { value: new Map() };
_SignalFlows_newSignalFlow = { value: new mapped_single_signal_flow_1.MappedSingleSignalFlow(new signal_1.SignalName(SignalFlows.NEW_SIGNAL_SIGNAL_NAME)) };
//# sourceMappingURL=flow.js.map