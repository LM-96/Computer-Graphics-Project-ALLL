"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _MappedMultipleSignalFlow_instances, _MappedMultipleSignalFlow_signalFlows, _MappedMultipleSignalFlow_getSignalFlowOrThrow;
Object.defineProperty(exports, "__esModule", { value: true });
const unsupported_signal_exception_1 = require("./exceptions/unsupported-signal-exception");
class MappedMultipleSignalFlow {
    constructor() {
        _MappedMultipleSignalFlow_instances.add(this);
        _MappedMultipleSignalFlow_signalFlows.set(this, void 0);
    }
    fire(signalName, source, data) {
        let flow = __classPrivateFieldGet(this, _MappedMultipleSignalFlow_instances, "m", _MappedMultipleSignalFlow_getSignalFlowOrThrow).call(this, signalName);
        return flow.fire(source, data);
    }
    subscribe(options) {
        let flow = __classPrivateFieldGet(this, _MappedMultipleSignalFlow_instances, "m", _MappedMultipleSignalFlow_getSignalFlowOrThrow).call(this, options.signalName);
        return flow.subscribe(options);
    }
    unsubscribe(subscriptionReceipt) {
        let flow = __classPrivateFieldGet(this, _MappedMultipleSignalFlow_instances, "m", _MappedMultipleSignalFlow_getSignalFlowOrThrow).call(this, subscriptionReceipt.signalName);
        return flow.unsubscribe(subscriptionReceipt);
    }
}
_MappedMultipleSignalFlow_signalFlows = new WeakMap(), _MappedMultipleSignalFlow_instances = new WeakSet(), _MappedMultipleSignalFlow_getSignalFlowOrThrow = function _MappedMultipleSignalFlow_getSignalFlowOrThrow(signalName) {
    let res = __classPrivateFieldGet(this, _MappedMultipleSignalFlow_signalFlows, "f").get(signalName);
    if (res == undefined)
        throw new unsupported_signal_exception_1.UnsupportedSignalException(signalName, this);
    return res;
};
//# sourceMappingURL=mapped-multiple-signal-flow.js.map