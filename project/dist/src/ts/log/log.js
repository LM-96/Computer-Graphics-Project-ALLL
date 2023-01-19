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
var _a, _Log_logEnabled;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
class Log {
    static enableLog() {
        __classPrivateFieldSet(Log, _a, true, "f", _Log_logEnabled);
    }
    static disableLog() {
        __classPrivateFieldSet(Log, _a, false, "f", _Log_logEnabled);
    }
    static log(message, ...optionalParams) {
        if (__classPrivateFieldGet(Log, _a, "f", _Log_logEnabled)) {
            console.log(message, ...optionalParams);
        }
    }
    static logNamed(name, message, ...optionalParams) {
        if (__classPrivateFieldGet(Log, _a, "f", _Log_logEnabled)) {
            console.log(name + " | " + message, ...optionalParams);
        }
    }
    static logError(message, ...optionalParams) {
        if (__classPrivateFieldGet(Log, _a, "f", _Log_logEnabled)) {
            console.error(message, ...optionalParams);
        }
    }
    static logWarning(message, ...optionalParams) {
        if (__classPrivateFieldGet(Log, _a, "f", _Log_logEnabled)) {
            console.warn(message, ...optionalParams);
        }
    }
    static logInfo(message, ...optionalParams) {
        if (__classPrivateFieldGet(Log, _a, "f", _Log_logEnabled)) {
            console.info(message, ...optionalParams);
        }
    }
    static logDebug(message, ...optionalParams) {
        if (__classPrivateFieldGet(Log, _a, "f", _Log_logEnabled)) {
            console.debug(message, ...optionalParams);
        }
    }
    static logTrace(message, ...optionalParams) {
        if (__classPrivateFieldGet(Log, _a, "f", _Log_logEnabled)) {
            console.trace(message);
        }
    }
}
exports.Log = Log;
_a = Log;
_Log_logEnabled = { value: void 0 };
//# sourceMappingURL=log.js.map