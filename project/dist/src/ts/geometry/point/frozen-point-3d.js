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
var _FrozenPoint3D_instances, _FrozenPoint3D_x, _FrozenPoint3D_y, _FrozenPoint3D_z, _FrozenPoint3D_denyModCopy, _FrozenPoint3D_checkCopyDenied;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrozenPoint3D = void 0;
const point_3d_1 = require("./point-3d");
const abstract_point_3d_1 = require("./abstract-point-3d");
const illegal_modification_exception_1 = require("../../types/exceptions/illegal-modification-exception");
const mutable_point_3d_1 = require("./mutable-point-3d");
const rotation_matrices_1 = require("../matrix/rotation-matrices");
const axis_1 = require("../axis");
/**
 * The frozen implementation of a point in 3D reference system.
 * This class extends `AbstractPoint3D` and implement `Point3D`.
 * Notice that every object of this class keeps the setting of the denying of
 * the returning modified copies.
 * If `denyModCopy` is disabled in the constructor, every method that tries to modify
 * a coordinate of this point will return a copy of this after the modification; if this
 * flag is false, then every of these methods will throw an `IllegalModificationException`
 */
class FrozenPoint3D extends abstract_point_3d_1.AbstractPoint3D {
    constructor(x, y, z, denyModCopy = true) {
        super();
        _FrozenPoint3D_instances.add(this);
        _FrozenPoint3D_x.set(this, void 0);
        _FrozenPoint3D_y.set(this, void 0);
        _FrozenPoint3D_z.set(this, void 0);
        _FrozenPoint3D_denyModCopy.set(this, void 0);
        (0, point_3d_1.checkNotNullCoordinates)(x, y, z, true);
        __classPrivateFieldSet(this, _FrozenPoint3D_x, x, "f");
        __classPrivateFieldSet(this, _FrozenPoint3D_y, y, "f");
        __classPrivateFieldSet(this, _FrozenPoint3D_z, z, "f");
        __classPrivateFieldSet(this, _FrozenPoint3D_denyModCopy, denyModCopy, "f");
    }
    setCoordinate(newValue, axis) {
        __classPrivateFieldGet(this, _FrozenPoint3D_instances, "m", _FrozenPoint3D_checkCopyDenied).call(this);
        switch (axis) {
            case axis_1.Axis.X: {
                return new FrozenPoint3D(newValue, __classPrivateFieldGet(this, _FrozenPoint3D_y, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_z, "f"));
            }
            case axis_1.Axis.Y: {
                return new FrozenPoint3D(__classPrivateFieldGet(this, _FrozenPoint3D_x, "f"), newValue, __classPrivateFieldGet(this, _FrozenPoint3D_z, "f"));
            }
            case axis_1.Axis.Z: {
                return new FrozenPoint3D(__classPrivateFieldGet(this, _FrozenPoint3D_z, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_y, "f"), newValue);
            }
        }
    }
    translateCoordinate(translation, axis) {
        __classPrivateFieldGet(this, _FrozenPoint3D_instances, "m", _FrozenPoint3D_checkCopyDenied).call(this);
        switch (axis) {
            case axis_1.Axis.X: {
                return new FrozenPoint3D(__classPrivateFieldGet(this, _FrozenPoint3D_x, "f") + translation, __classPrivateFieldGet(this, _FrozenPoint3D_y, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_z, "f"));
            }
            case axis_1.Axis.Y: {
                return new FrozenPoint3D(__classPrivateFieldGet(this, _FrozenPoint3D_x, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_y, "f") + translation, __classPrivateFieldGet(this, _FrozenPoint3D_z, "f"));
            }
            case axis_1.Axis.Z: {
                return new FrozenPoint3D(__classPrivateFieldGet(this, _FrozenPoint3D_z, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_y, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_z, "f") + translation);
            }
        }
    }
    dilateCoordinate(dilation, axis) {
        __classPrivateFieldGet(this, _FrozenPoint3D_instances, "m", _FrozenPoint3D_checkCopyDenied).call(this);
        switch (axis) {
            case axis_1.Axis.X: {
                return new FrozenPoint3D(__classPrivateFieldGet(this, _FrozenPoint3D_x, "f") * dilation, __classPrivateFieldGet(this, _FrozenPoint3D_y, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_z, "f"));
            }
            case axis_1.Axis.Y: {
                return new FrozenPoint3D(__classPrivateFieldGet(this, _FrozenPoint3D_x, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_y, "f") * dilation, __classPrivateFieldGet(this, _FrozenPoint3D_z, "f"));
            }
            case axis_1.Axis.Z: {
                return new FrozenPoint3D(__classPrivateFieldGet(this, _FrozenPoint3D_z, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_y, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_z, "f") * dilation);
            }
        }
    }
    rotateAround(axis, angle) {
        let rotated = this.asColumnVector().multiply(rotation_matrices_1.RotationMatrices.R(axis, angle));
        return new FrozenPoint3D(rotated.get(0, 0), rotated.get(1, 0), rotated.get(2, 0), __classPrivateFieldGet(this, _FrozenPoint3D_denyModCopy, "f"));
    }
    getCoordinate(axis) {
        switch (axis) {
            case axis_1.Axis.X: {
                return __classPrivateFieldGet(this, _FrozenPoint3D_x, "f");
            }
            case axis_1.Axis.Y: {
                return __classPrivateFieldGet(this, _FrozenPoint3D_y, "f");
            }
            case axis_1.Axis.Z: {
                return __classPrivateFieldGet(this, _FrozenPoint3D_z, "f");
            }
        }
    }
    frozen(denyModifiedCopy) {
        if (__classPrivateFieldGet(this, _FrozenPoint3D_denyModCopy, "f") === denyModifiedCopy) {
            return this;
        }
        else {
            return new FrozenPoint3D(__classPrivateFieldGet(this, _FrozenPoint3D_x, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_y, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_z, "f"), denyModifiedCopy);
        }
    }
    unfrozen() {
        return new mutable_point_3d_1.MutablePoint3D(__classPrivateFieldGet(this, _FrozenPoint3D_x, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_y, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_z, "f"));
    }
    isFrozen() {
        return true;
    }
    isUnfrozen() {
        return false;
    }
    clone() {
        return new FrozenPoint3D(__classPrivateFieldGet(this, _FrozenPoint3D_x, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_y, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_z, "f"));
    }
}
exports.FrozenPoint3D = FrozenPoint3D;
_FrozenPoint3D_x = new WeakMap(), _FrozenPoint3D_y = new WeakMap(), _FrozenPoint3D_z = new WeakMap(), _FrozenPoint3D_denyModCopy = new WeakMap(), _FrozenPoint3D_instances = new WeakSet(), _FrozenPoint3D_checkCopyDenied = function _FrozenPoint3D_checkCopyDenied() {
    if (__classPrivateFieldGet(this, _FrozenPoint3D_denyModCopy, "f")) {
        throw new illegal_modification_exception_1.IllegalModificationException("this point is frozen and copy is denied: unable to modify values or to return a modified copy");
    }
    else {
        console.log("warning: this point 3D is frozen: a copy will be returned");
    }
};
//# sourceMappingURL=frozen-point-3d.js.map