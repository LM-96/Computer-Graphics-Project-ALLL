"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiredSignal = exports.Signal = exports.SignalName = void 0;
class SignalName {
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
class Signal {
    constructor(name, source, data) {
        this.name = name;
        this.source = source;
        this.data = data;
    }
}
exports.Signal = Signal;
class FiredSignal {
    constructor(signal, results) {
        this.signal = signal;
        this.results = results;
    }
}
exports.FiredSignal = FiredSignal;
//# sourceMappingURL=signal.js.map