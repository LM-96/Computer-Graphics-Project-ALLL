"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ArraySignalSubscriber_handlers;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArraySignalSubscriber = exports.FiredSignal = exports.Signal = exports.SignalName = void 0;
const arrays_1 = require("../types/arrays");
class SignalName {
}
exports.SignalName = SignalName;
class Signal {
    constructor(name, source, data) {
        this.name = name;
        this.source = source;
        this.data = data;
    }
}
exports.Signal = Signal;
class FiredSignal {
    constructor(signal, handlerPromises) {
        this.signal = signal;
        this.handlerPromises = handlerPromises;
    }
}
exports.FiredSignal = FiredSignal;
class ArraySignalSubscriber {
    constructor() {
        _ArraySignalSubscriber_handlers.set(this, []);
    }
    subscribe(handler) {
        __classPrivateFieldGet(this, _ArraySignalSubscriber_handlers, "f").push(handler);
    }
    unsubscribe(handler) {
        arrays_1.Arrays.removeFrom(__classPrivateFieldGet(this, _ArraySignalSubscriber_handlers, "f"), handler);
    }
    fire(signalName, source, data) {
        let signal = new Signal(signalName, source, data);
        let promises = [];
        for (let handler of __classPrivateFieldGet(this, _ArraySignalSubscriber_handlers, "f"))
            promises.push(handler.handle(signal));
        return new FiredSignal(signal, promises);
    }
}
exports.ArraySignalSubscriber = ArraySignalSubscriber;
_ArraySignalSubscriber_handlers = new WeakMap();
//# sourceMappingURL=signal.js.map