"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _SignalFlows_singleSignalFlows, _SignalFlows_getOrThrow;
Object.defineProperty(exports, "__esModule", { value: true });
const signal_1 = require("./signal");
const mapped_single_signal_flow_1 = require("./mapped-single-signal-flow");
const pair_1 = require("../types/pair");
const illegal_signal_name_exception_1 = require("./exceptions/illegal-signal-name-exception");
class SignalFlows {
    static newSingleFlow(signalName) {
        if (__classPrivateFieldGet(this, _a, "f", _SignalFlows_singleSignalFlows).has(signalName))
            throw new illegal_signal_name_exception_1.IllegalSignalNameException(signalName, "name already exists");
        let signalNameInst = new signal_1.SignalName(signalName);
        let flow = new mapped_single_signal_flow_1.MappedSingleSignalFlow(signalNameInst);
        __classPrivateFieldGet(this, _a, "f", _SignalFlows_singleSignalFlows).set(signalName, (0, pair_1.pairOf)(signalNameInst, flow));
        return flow;
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
    /**
     * Returns the global subscriber for the given `signalName`
     * @param signalName
     */
    static getSubscriber(signalName) {
        return __classPrivateFieldGet(this, _a, "m", _SignalFlows_getOrThrow).call(this, signalName).getSecond();
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
_SignalFlows_singleSignalFlows = { value: new Map() };
//# sourceMappingURL=flow.js.map