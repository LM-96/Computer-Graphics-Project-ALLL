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
var _MutablePoint3D_x, _MutablePoint3D_y, _MutablePoint3D_z;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MutablePoint3D = void 0;
const abstract_point_3d_1 = require("./abstract-point-3d");
const point_3d_1 = require("./point-3d");
const frozen_point_3d_1 = require("./frozen-point-3d");
const rotation_matrices_1 = require("../matrix/rotation-matrices");
const axis_1 = require("../axis");
/**
 * The implementation of a mutable point in a 3D reference system.
 * This class extends `AbstractPoint3D` and implements `Point3D`.
 * All the methods of this class that change the value of one of the coordinates of
 * this point will return `this` object after the modification
 */
class MutablePoint3D extends abstract_point_3d_1.AbstractPoint3D {
    constructor(x, y, z) {
        super();
        _MutablePoint3D_x.set(this, void 0);
        _MutablePoint3D_y.set(this, void 0);
        _MutablePoint3D_z.set(this, void 0);
        (0, point_3d_1.checkNotNullCoordinates)(x, y, z, true);
        __classPrivateFieldSet(this, _MutablePoint3D_x, x, "f");
        __classPrivateFieldSet(this, _MutablePoint3D_y, y, "f");
        __classPrivateFieldSet(this, _MutablePoint3D_z, z, "f");
    }
    getCoordinate(axis) {
        switch (axis) {
            case axis_1.Axis.X:
                return __classPrivateFieldGet(this, _MutablePoint3D_x, "f");
            case axis_1.Axis.Y:
                return __classPrivateFieldGet(this, _MutablePoint3D_y, "f");
            case axis_1.Axis.Z:
                return __classPrivateFieldGet(this, _MutablePoint3D_z, "f");
        }
    }
    setCoordinate(newValue, axis) {
        switch (axis) {
            case axis_1.Axis.X: {
                __classPrivateFieldSet(this, _MutablePoint3D_x, newValue, "f");
                break;
            }
            case axis_1.Axis.Y: {
                __classPrivateFieldSet(this, _MutablePoint3D_y, newValue, "f");
                break;
            }
            case axis_1.Axis.Z: {
                __classPrivateFieldSet(this, _MutablePoint3D_z, newValue, "f");
                break;
            }
        }
        return this;
    }
    translateCoordinate(translation, axis) {
        switch (axis) {
            case axis_1.Axis.X: {
                __classPrivateFieldSet(this, _MutablePoint3D_x, __classPrivateFieldGet(this, _MutablePoint3D_x, "f") + translation, "f");
                break;
            }
            case axis_1.Axis.Y: {
                __classPrivateFieldSet(this, _MutablePoint3D_y, __classPrivateFieldGet(this, _MutablePoint3D_y, "f") + translation, "f");
                break;
            }
            case axis_1.Axis.Z: {
                __classPrivateFieldSet(this, _MutablePoint3D_z, __classPrivateFieldGet(this, _MutablePoint3D_z, "f") + translation, "f");
                break;
            }
        }
        return this;
    }
    dilateCoordinate(dilation, axis) {
        switch (axis) {
            case axis_1.Axis.X: {
                __classPrivateFieldSet(this, _MutablePoint3D_x, __classPrivateFieldGet(this, _MutablePoint3D_x, "f") * dilation, "f");
                break;
            }
            case axis_1.Axis.Y: {
                __classPrivateFieldSet(this, _MutablePoint3D_y, __classPrivateFieldGet(this, _MutablePoint3D_y, "f") * dilation, "f");
                break;
            }
            case axis_1.Axis.Z: {
                __classPrivateFieldSet(this, _MutablePoint3D_z, __classPrivateFieldGet(this, _MutablePoint3D_z, "f") * dilation, "f");
                break;
            }
        }
        return this;
    }
    rotateAround(axis, angle) {
        let rotated = rotation_matrices_1.RotationMatrices.R(axis, angle).multiply(this.asColumnVector());
        __classPrivateFieldSet(this, _MutablePoint3D_x, rotated.get(0, 0), "f");
        __classPrivateFieldSet(this, _MutablePoint3D_y, rotated.get(1, 0), "f");
        __classPrivateFieldSet(this, _MutablePoint3D_z, rotated.get(2, 0), "f");
        return this;
    }
    frozen(denyModifiedCopy = true) {
        return new frozen_point_3d_1.FrozenPoint3D(__classPrivateFieldGet(this, _MutablePoint3D_x, "f"), __classPrivateFieldGet(this, _MutablePoint3D_y, "f"), __classPrivateFieldGet(this, _MutablePoint3D_z, "f"), denyModifiedCopy);
    }
    isFrozen() {
        return false;
    }
    isUnfrozen() {
        return true;
    }
    unfrozen() {
        return this;
    }
    clone() {
        return new MutablePoint3D(__classPrivateFieldGet(this, _MutablePoint3D_x, "f"), __classPrivateFieldGet(this, _MutablePoint3D_y, "f"), __classPrivateFieldGet(this, _MutablePoint3D_z, "f"));
    }
}
exports.MutablePoint3D = MutablePoint3D;
_MutablePoint3D_x = new WeakMap(), _MutablePoint3D_y = new WeakMap(), _MutablePoint3D_z = new WeakMap();
//# sourceMappingURL=mutable-point-3d.js.map