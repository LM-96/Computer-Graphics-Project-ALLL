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
var _FrozenPoint3D_instances, _FrozenPoint3D_x, _FrozenPoint3D_y, _FrozenPoint3D_z, _FrozenPoint3D_denyModCopy, _FrozenPoint3D_checkCopyDenied, _MutablePoint3D_x, _MutablePoint3D_y, _MutablePoint3D_z;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointFactory = exports.IllegalModificationException = void 0;
/**
 * The enumeration that represents an axis
 */
const types_1 = require("./types");
var Axis;
(function (Axis) {
    Axis[Axis["X"] = 0] = "X";
    Axis[Axis["Y"] = 1] = "Y";
    Axis[Axis["Z"] = 2] = "Z";
})(Axis || (Axis = {}));
var AngleUnit;
(function (AngleUnit) {
    AngleUnit[AngleUnit["RAD"] = 0] = "RAD";
    AngleUnit[AngleUnit["DEG"] = 1] = "DEG";
})(AngleUnit || (AngleUnit = {}));
/* UTILITIES ***************************************************************************************************** */
/**
 * An exception that is thrown when the modification of a certain value is not allowed
 */
class IllegalModificationException extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, IllegalModificationException.prototype);
    }
}
exports.IllegalModificationException = IllegalModificationException;
/* TRANSFORMATIONS *********************************************************************************************** */
/* POINTS ******************************************************************************************************** */
/**
 * Returns `true` if the given `object` is a **point**
 * @param {any} object
 * @return {boolean} `true` if the given `object` is a **point**, `false` otherwise
 */
function isPoint(object) {
    return 'getX' in object && 'getY' in object && 'getZ' in object;
}
/**
 * Returns `true` if the two objects are the same point.
 * Notice that **this function return `false` if one or both of the arguments
 * are `null` or `undefined`**
 * @param {any} point1 the first object
 * @param {any} point2 the second object
 * @return {boolean} `true` if the two objects are the same point, `false` otherwise
 */
function samePoints(point1, point2) {
    if (point1 != null && point2 != null) {
        if (isPoint(point1) && isPoint(point2)) {
            return point1.getX() === point2.getX() &&
                point1.getY() === point2.getY() &&
                point1.getZ() === point2.getZ();
        }
    }
    return false;
}
/**
 * Checks if all the given coordinates are not `null`.
 * If `throwError` is enabled, this function will immediately throw an error
 * when it will find a `null` value for a coordinate
 * @param {number} x the `x` coordinate
 * @param {number} y the `y` coordinate
 * @param {number} z the `z` coordinate
 * @param throwError the `flag` that if enabled will make this function able to throw an exception
 * @return {boolean} `true` if all the coordinates are not null, `false` otherwise
 * @throws {Error} if `throwError` is `true` and a coordinate is `null`
 */
function checkNotNullCoordinates(x, y, z, throwError = false) {
    if (x == null) {
        if (throwError) {
            throw Error("x coordinate can not be null");
        }
        return false;
    }
    if (y == null) {
        if (throwError) {
            throw Error("y coordinate can not be null");
        }
        return false;
    }
    if (z == null) {
        if (throwError) {
            throw Error("z coordinate can not be null");
        }
        return false;
    }
    return true;
}
/**
 * The abstract implementation of a `Point3D`.
 * This point can be
 *
 * - **frozen**: in this case is not possible to modify the values of the internal coordinates;
 * this kind of point can **throw an exception** or **returns a modified copy** depending on the
 * configuration
 *
 * - **mutable**: in this case is possible to modify the values of the internal coordinates using all the
 * method for these kind of purposes; these methods will return `this`
 */
class AbstractPoint3D extends types_1.AbstractFunctionalObject {
    dilate(mx, my, mz) {
        let result = this;
        if (mx != null) {
            result = result.dilateCoordinate(mx, Axis.X);
        }
        if (my != null) {
            result = result.dilateCoordinate(my, Axis.Y);
        }
        if (mz != null) {
            result = result.dilateCoordinate(mz, Axis.Z);
        }
        return result;
    }
    dilateX(mx) {
        return this.dilateCoordinate(mx, Axis.X);
    }
    dilateY(my) {
        return this.dilateCoordinate(my, Axis.Y);
    }
    dilateZ(mz) {
        return this.dilateCoordinate(mz, Axis.Z);
    }
    dilateByVector(vector) {
        return this
            .dilateCoordinate(vector.getX(), Axis.X)
            .dilateCoordinate(vector.getY(), Axis.Y)
            .dilateCoordinate(vector.getZ(), Axis.Z);
    }
    getX() {
        return this.getCoordinate(Axis.X);
    }
    getY() {
        return this.getCoordinate(Axis.Y);
    }
    getZ() {
        return this.getCoordinate(Axis.Z);
    }
    set(newX, newY, newZ) {
        let result = this;
        if (newX != null) {
            result = this.setCoordinate(newX, Axis.X);
        }
        if (newY != null) {
            result = this.setCoordinate(newY, Axis.Y);
        }
        if (newZ != null) {
            result = this.setCoordinate(newZ, Axis.Z);
        }
        return result;
    }
    setX(newX) {
        return this.setCoordinate(newX, Axis.X);
    }
    setY(newY) {
        return this.setCoordinate(newY, Axis.Y);
    }
    setZ(newZ) {
        return this.setCoordinate(newZ, Axis.Z);
    }
    translate(dx, dy, dz) {
        let result = this;
        if (dx != null) {
            result = this.translateCoordinate(dx, Axis.X);
        }
        if (dy != null) {
            result = this.translateCoordinate(dy, Axis.Y);
        }
        if (dz != null) {
            result = this.translateCoordinate(dz, Axis.Z);
        }
        return result;
    }
    translateByVector(vector) {
        return this
            .translateCoordinate(vector.getX(), Axis.X)
            .translateCoordinate(vector.getY(), Axis.Y)
            .translateCoordinate(vector.getZ(), Axis.Z);
    }
    translateX(dx) {
        return this.translateCoordinate(dx, Axis.X);
    }
    translateY(dy) {
        return this.translateCoordinate(dy, Axis.Y);
    }
    translateZ(dz) {
        return this.translateCoordinate(dz, Axis.Z);
    }
    equals(other) {
        return samePoints(this, other);
    }
    toString() {
        return "(" + this.getX() + ", " + this.getY() + ", " + this.getZ() + ")";
    }
}
/**
 * The frozen implementation of a point in 3D reference system.
 * This class extends `AbstractPoint3D` and implement `Point3D`.
 * Notice that every object of this class keeps the setting of the denying of
 * the returning modified copies.
 * If `denyModCopy` is disabled in the constructor, every method that tries to modify
 * a coordinate of this point will return a copy of this after the modification; if this
 * flag is false, then every of these methods will throw an `IllegalModificationException`
 */
class FrozenPoint3D extends AbstractPoint3D {
    constructor(x, y, z, denyModCopy = true) {
        super();
        _FrozenPoint3D_instances.add(this);
        _FrozenPoint3D_x.set(this, void 0);
        _FrozenPoint3D_y.set(this, void 0);
        _FrozenPoint3D_z.set(this, void 0);
        _FrozenPoint3D_denyModCopy.set(this, void 0);
        checkNotNullCoordinates(x, y, z, true);
        __classPrivateFieldSet(this, _FrozenPoint3D_x, x, "f");
        __classPrivateFieldSet(this, _FrozenPoint3D_y, y, "f");
        __classPrivateFieldSet(this, _FrozenPoint3D_z, z, "f");
        __classPrivateFieldSet(this, _FrozenPoint3D_denyModCopy, denyModCopy, "f");
    }
    setCoordinate(newValue, axis) {
        __classPrivateFieldGet(this, _FrozenPoint3D_instances, "m", _FrozenPoint3D_checkCopyDenied).call(this);
        switch (axis) {
            case Axis.X: {
                return new FrozenPoint3D(newValue, __classPrivateFieldGet(this, _FrozenPoint3D_y, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_z, "f"));
            }
            case Axis.Y: {
                return new FrozenPoint3D(__classPrivateFieldGet(this, _FrozenPoint3D_x, "f"), newValue, __classPrivateFieldGet(this, _FrozenPoint3D_z, "f"));
            }
            case Axis.Z: {
                return new FrozenPoint3D(__classPrivateFieldGet(this, _FrozenPoint3D_z, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_y, "f"), newValue);
            }
        }
    }
    translateCoordinate(translation, axis) {
        __classPrivateFieldGet(this, _FrozenPoint3D_instances, "m", _FrozenPoint3D_checkCopyDenied).call(this);
        switch (axis) {
            case Axis.X: {
                return new FrozenPoint3D(__classPrivateFieldGet(this, _FrozenPoint3D_x, "f") + translation, __classPrivateFieldGet(this, _FrozenPoint3D_y, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_z, "f"));
            }
            case Axis.Y: {
                return new FrozenPoint3D(__classPrivateFieldGet(this, _FrozenPoint3D_x, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_y, "f") + translation, __classPrivateFieldGet(this, _FrozenPoint3D_z, "f"));
            }
            case Axis.Z: {
                return new FrozenPoint3D(__classPrivateFieldGet(this, _FrozenPoint3D_z, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_y, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_z, "f") + translation);
            }
        }
    }
    dilateCoordinate(dilation, axis) {
        __classPrivateFieldGet(this, _FrozenPoint3D_instances, "m", _FrozenPoint3D_checkCopyDenied).call(this);
        switch (axis) {
            case Axis.X: {
                return new FrozenPoint3D(__classPrivateFieldGet(this, _FrozenPoint3D_x, "f") * dilation, __classPrivateFieldGet(this, _FrozenPoint3D_y, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_z, "f"));
            }
            case Axis.Y: {
                return new FrozenPoint3D(__classPrivateFieldGet(this, _FrozenPoint3D_x, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_y, "f") * dilation, __classPrivateFieldGet(this, _FrozenPoint3D_z, "f"));
            }
            case Axis.Z: {
                return new FrozenPoint3D(__classPrivateFieldGet(this, _FrozenPoint3D_z, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_y, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_z, "f") * dilation);
            }
        }
    }
    getCoordinate(axis) {
        switch (axis) {
            case Axis.X: {
                return __classPrivateFieldGet(this, _FrozenPoint3D_x, "f");
            }
            case Axis.Y: {
                return __classPrivateFieldGet(this, _FrozenPoint3D_y, "f");
            }
            case Axis.Z: {
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
        return new MutablePoint3D(__classPrivateFieldGet(this, _FrozenPoint3D_x, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_y, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_z, "f"));
    }
    isFrozen() {
        return true;
    }
    isUnfrozen() {
        return false;
    }
    deepCopy() {
        return new FrozenPoint3D(__classPrivateFieldGet(this, _FrozenPoint3D_x, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_y, "f"), __classPrivateFieldGet(this, _FrozenPoint3D_z, "f"));
    }
}
_FrozenPoint3D_x = new WeakMap(), _FrozenPoint3D_y = new WeakMap(), _FrozenPoint3D_z = new WeakMap(), _FrozenPoint3D_denyModCopy = new WeakMap(), _FrozenPoint3D_instances = new WeakSet(), _FrozenPoint3D_checkCopyDenied = function _FrozenPoint3D_checkCopyDenied() {
    if (__classPrivateFieldGet(this, _FrozenPoint3D_denyModCopy, "f")) {
        throw new IllegalModificationException("this point is frozen and copy is denied: unable to modify values or to return a modified copy");
    }
    else {
        console.log("warning: this point 3D is frozen: a copy will be returned");
    }
};
/**
 * The implementation of a mutable point in a 3D reference system.
 * This class extends `AbstractPoint3D` and implements `Point3D`.
 * All the methods of this class that change the value of one of the coordinates of
 * this point will return `this` object after the modification
 */
class MutablePoint3D extends AbstractPoint3D {
    constructor(x, y, z) {
        super();
        _MutablePoint3D_x.set(this, void 0);
        _MutablePoint3D_y.set(this, void 0);
        _MutablePoint3D_z.set(this, void 0);
        checkNotNullCoordinates(x, y, z, true);
        __classPrivateFieldSet(this, _MutablePoint3D_x, x, "f");
        __classPrivateFieldSet(this, _MutablePoint3D_y, y, "f");
        __classPrivateFieldSet(this, _MutablePoint3D_z, z, "f");
    }
    getCoordinate(axis) {
        switch (axis) {
            case Axis.X:
                return __classPrivateFieldGet(this, _MutablePoint3D_x, "f");
            case Axis.Y:
                return __classPrivateFieldGet(this, _MutablePoint3D_y, "f");
            case Axis.Z:
                return __classPrivateFieldGet(this, _MutablePoint3D_z, "f");
        }
    }
    setCoordinate(newValue, axis) {
        switch (axis) {
            case Axis.X: {
                __classPrivateFieldSet(this, _MutablePoint3D_x, newValue, "f");
                break;
            }
            case Axis.Y: {
                __classPrivateFieldSet(this, _MutablePoint3D_y, newValue, "f");
                break;
            }
            case Axis.Z: {
                __classPrivateFieldSet(this, _MutablePoint3D_z, newValue, "f");
                break;
            }
        }
        return this;
    }
    translateCoordinate(translation, axis) {
        switch (axis) {
            case Axis.X: {
                __classPrivateFieldSet(this, _MutablePoint3D_x, __classPrivateFieldGet(this, _MutablePoint3D_x, "f") + translation, "f");
                break;
            }
            case Axis.Y: {
                __classPrivateFieldSet(this, _MutablePoint3D_y, __classPrivateFieldGet(this, _MutablePoint3D_y, "f") + translation, "f");
                break;
            }
            case Axis.Z: {
                __classPrivateFieldSet(this, _MutablePoint3D_z, __classPrivateFieldGet(this, _MutablePoint3D_z, "f") + translation, "f");
                break;
            }
        }
        return this;
    }
    dilateCoordinate(dilation, axis) {
        switch (axis) {
            case Axis.X: {
                __classPrivateFieldSet(this, _MutablePoint3D_x, __classPrivateFieldGet(this, _MutablePoint3D_x, "f") * dilation, "f");
                break;
            }
            case Axis.Y: {
                __classPrivateFieldSet(this, _MutablePoint3D_y, __classPrivateFieldGet(this, _MutablePoint3D_y, "f") * dilation, "f");
                break;
            }
            case Axis.Z: {
                __classPrivateFieldSet(this, _MutablePoint3D_z, __classPrivateFieldGet(this, _MutablePoint3D_z, "f") * dilation, "f");
                break;
            }
        }
        return this;
    }
    frozen(denyModifiedCopy = true) {
        return new FrozenPoint3D(__classPrivateFieldGet(this, _MutablePoint3D_x, "f"), __classPrivateFieldGet(this, _MutablePoint3D_y, "f"), __classPrivateFieldGet(this, _MutablePoint3D_z, "f"), denyModifiedCopy);
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
    deepCopy() {
        return new MutablePoint3D(__classPrivateFieldGet(this, _MutablePoint3D_x, "f"), __classPrivateFieldGet(this, _MutablePoint3D_y, "f"), __classPrivateFieldGet(this, _MutablePoint3D_z, "f"));
    }
}
_MutablePoint3D_x = new WeakMap(), _MutablePoint3D_y = new WeakMap(), _MutablePoint3D_z = new WeakMap();
/**
 * A factory for the points
 */
class PointFactory {
    /**
     * Creates and return a new frozen point.
     * If `denyModifiedCopy` is set to `true`, all the methods that modify the values of the
     * coordinates of the point will throw an error. Instead, if it is `false`, all of this methods
     * will not modify the internal values of the coordinates but will return new frozen copies that
     * will contain the modification
     * @param {number} x the value of the `x` coordinate
     * @param {number} y the value of the `y` coordinate
     * @param {number} z the value of the `z` coordinate
     * @param {boolean} denyModifiedCopy the flag to deny the return of a modified copy (`true` by default)
     * @return {Point3D} the new point
     */
    static newFrozenPoint3D(x, y, z, denyModifiedCopy = true) {
        return new FrozenPoint3D(x, y, z, denyModifiedCopy);
    }
    /**
     * Creates and return a new point that is modifiable
     * @param {number} x the value of the `x` coordinate
     * @param {number} y the value of the `y` coordinate
     * @param {number} z the value of the `z` coordinate
     * @return {Point3D} the new point
     */
    static newMutablePoint3D(x, y, z) {
        return new MutablePoint3D(x, y, z);
    }
    /**
     * Returns the origin of a cartesian reference system
     * @param {boolean} frozen a flag that indicates if the returning point have to be frozen (`false`
     * by default)
     * @param {boolean} denyModifiedCopy the flag to deny the return of a modified copy if
     * the point is frozen (`true` by default)
     */
    static origin(frozen = false, denyModifiedCopy = true) {
        if (frozen) {
            return new FrozenPoint3D(0, 0, 0, denyModifiedCopy);
        }
        else {
            return new MutablePoint3D(0, 0, 0);
        }
    }
    /**
     * Creates and returns a new `Point3D`
     * @param {number} x the value of the `x` coordinate
     * @param {number} y the value of the `y` coordinate
     * @param {number} z the value of the `z` coordinate
     * @param {boolean} frozen a flag that indicates if the returning point have to be frozen (`false`
     * by default)
     * @param {boolean} denyModifiedCopy the flag to deny the return of a modified copy if
     * the point is frozen (`true` by default)
     */
    static newPoint3D(x, y, z, frozen = false, denyModifiedCopy = true) {
        if (frozen) {
            return this.newFrozenPoint3D(x, y, z, denyModifiedCopy);
        }
        else {
            return this.newMutablePoint3D(x, y, z);
        }
    }
}
exports.PointFactory = PointFactory;
//# sourceMappingURL=geometry-3d.js.map