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
var _PerformedNumberTrioChangeBuilder_oldValue, _PerformedNumberTrioChangeBuilder_newValue;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformedNumberTrioChangeBuilder = exports.PerformedNumberTrioChange = void 0;
class PerformedNumberTrioChange {
    constructor(oldValue, newValue) {
        this.oldValue = oldValue;
        this.newValue = newValue;
        this.difference = oldValue.sub(newValue.getFirst(), newValue.getSecond(), newValue.getThird());
    }
}
exports.PerformedNumberTrioChange = PerformedNumberTrioChange;
class PerformedNumberTrioChangeBuilder {
    constructor() {
        _PerformedNumberTrioChangeBuilder_oldValue.set(this, void 0);
        _PerformedNumberTrioChangeBuilder_newValue.set(this, void 0);
    }
    /**
     * Builds a PerformedNumberTrioChange object throwing an error if one of the required fields is missing
     * @returns {PerformedNumberTrioChange} the built PerformedNumberTrioChange object
     * @throws {Error} if one of the required fields is missing
     */
    build() {
        if (__classPrivateFieldGet(this, _PerformedNumberTrioChangeBuilder_oldValue, "f") == null) {
            throw new Error("Old value not set");
        }
        if (__classPrivateFieldGet(this, _PerformedNumberTrioChangeBuilder_newValue, "f") == null) {
            throw new Error("New value not set");
        }
        return new PerformedNumberTrioChange(__classPrivateFieldGet(this, _PerformedNumberTrioChangeBuilder_oldValue, "f"), __classPrivateFieldGet(this, _PerformedNumberTrioChangeBuilder_newValue, "f"));
    }
    /**
     * Clears the builder by setting all fields to null
     */
    clear() {
        __classPrivateFieldSet(this, _PerformedNumberTrioChangeBuilder_oldValue, null, "f");
        __classPrivateFieldSet(this, _PerformedNumberTrioChangeBuilder_newValue, null, "f");
    }
}
exports.PerformedNumberTrioChangeBuilder = PerformedNumberTrioChangeBuilder;
_PerformedNumberTrioChangeBuilder_oldValue = new WeakMap(), _PerformedNumberTrioChangeBuilder_newValue = new WeakMap();
//# sourceMappingURL=performed-number-trio-change.js.map