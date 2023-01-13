"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _ObservablePoint3D_point3D;
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_point_3d_1 = require("./abstract-point-3d");
class ObservablePoint3D extends abstract_point_3d_1.AbstractPoint3D {
    constructor(point3D) {
        super();
        _ObservablePoint3D_point3D.set(this, void 0);
        __classPrivateFieldSet(this, _ObservablePoint3D_point3D, point3D, "f");
    }
    getCoordinate(axis) {
        throw new Error("Method not implemented.");
    }
    dilateCoordinate(dilation, axis) {
        throw new Error("Method not implemented.");
    }
    frozen(denyModifiedCopy) {
        throw new Error("Method not implemented.");
    }
    isFrozen() {
        throw new Error("Method not implemented.");
    }
    isUnfrozen() {
        throw new Error("Method not implemented.");
    }
    setCoordinate(newValue, axis) {
        throw new Error("Method not implemented.");
    }
    translateCoordinate(translation, axis) {
        throw new Error("Method not implemented.");
    }
    unfrozen() {
        throw new Error("Method not implemented.");
    }
    clone() {
        throw new Error("Method not implemented.");
    }
}
_ObservablePoint3D_point3D = new WeakMap();
//# sourceMappingURL=observable-point-3d.js.map