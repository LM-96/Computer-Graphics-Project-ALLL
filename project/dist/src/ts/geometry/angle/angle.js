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
var _Angle_value, _Angle_unit;
Object.defineProperty(exports, "__esModule", { value: true });
exports.degree = exports.radians = exports.deg2Rad = exports.rad2Deg = exports.angle = exports.Angle = exports.AngleUnit = void 0;
var AngleUnit;
(function (AngleUnit) {
    AngleUnit["RAD"] = "rad";
    AngleUnit["DEG"] = "deg";
})(AngleUnit = exports.AngleUnit || (exports.AngleUnit = {}));
class Angle {
    constructor(value, unit) {
        _Angle_value.set(this, void 0);
        _Angle_unit.set(this, void 0);
        __classPrivateFieldSet(this, _Angle_value, value, "f");
        __classPrivateFieldSet(this, _Angle_unit, unit, "f");
    }
    /**
     * Returns the value of this angle
     * @return {number} the value of this angle
     */
    getValue() {
        return __classPrivateFieldGet(this, _Angle_value, "f");
    }
    /**
     * Returns the value of this angle in the desired unit
     * @param {AngleUnit} unit the desired unit of the value of this angle
     * @return {number} the value of this angle
     */
    getValueIn(unit) {
        if (__classPrivateFieldGet(this, _Angle_unit, "f") == unit)
            return __classPrivateFieldGet(this, _Angle_value, "f");
        return this.cloneAndConvert(unit).getValue();
    }
    /**
     * Sets the value of this angle preserving the unit
     * @param {number} value the value of the angle
     */
    setValue(value) {
        __classPrivateFieldSet(this, _Angle_value, value, "f");
    }
    /**
     * Gets the unit of this angle
     * @return the unit of this angle
     */
    getUnit() {
        return __classPrivateFieldGet(this, _Angle_unit, "f");
    }
    /**
     * Converts this angle to the desired unit.
     * **The conversion is internal** so this object will be updated
     * with the desired unit and the value will be automatically converted.
     *
     * If it's needed a copy of this angle with the modified unit, please consider
     * using `copyAndConvert()` instead.
     * This method returns this angle
     * @param {AngleUnit} unit the desired target unit
     * @return {Angle} this angle
     */
    convert(unit) {
        if (__classPrivateFieldGet(this, _Angle_unit, "f") != unit) {
            if (__classPrivateFieldGet(this, _Angle_unit, "f") == AngleUnit.RAD && unit == AngleUnit.DEG) {
                __classPrivateFieldSet(this, _Angle_value, rad2Deg(__classPrivateFieldGet(this, _Angle_value, "f")), "f");
            }
            else if (__classPrivateFieldGet(this, _Angle_unit, "f") == AngleUnit.DEG && unit == AngleUnit.RAD) {
                __classPrivateFieldSet(this, _Angle_value, deg2Rad(__classPrivateFieldGet(this, _Angle_value, "f")), "f");
            }
            __classPrivateFieldSet(this, _Angle_unit, unit, "f");
        }
        return this;
    }
    clone() {
        return new Angle(__classPrivateFieldGet(this, _Angle_value, "f"), __classPrivateFieldGet(this, _Angle_unit, "f"));
    }
    /**
     * Clones this angle and convert it to the desired unit
     * @param {AngleUnit} unit the desired unit of the angle
     * @return {Angle} the clone converted to the desired unit
     */
    cloneAndConvert(unit) {
        return this.clone().convert(unit);
    }
    /**
     * Aligns this angle to unit of measurement of the other angle.
     * This method basically converts this angle to unit of measure of the given one and
     * returns this angle after the conversion
     * @param {Angle} other the other angle
     * @return {Angle} this angle after the alignment
     */
    alignWith(other) {
        return this.convert(other.getUnit());
    }
    /**
     * Checks if the `other` object is an `Angle` *equals* to this.
     * The equality is checked considering also the `unit, so
     * @param other
     */
    equals(other) {
        if (other != undefined) {
            if (other instanceof Angle) {
                if (__classPrivateFieldGet(this, _Angle_unit, "f") !== __classPrivateFieldGet(other, _Angle_unit, "f")) {
                    other = other.cloneAndConvert(__classPrivateFieldGet(this, _Angle_unit, "f"));
                    return __classPrivateFieldGet(other, _Angle_unit, "f") == __classPrivateFieldGet(this, _Angle_unit, "f") && __classPrivateFieldGet(other, _Angle_value, "f") == __classPrivateFieldGet(this, _Angle_value, "f");
                }
            }
        }
        return false;
    }
    toString() {
        return __classPrivateFieldGet(this, _Angle_value, "f") + " " + __classPrivateFieldGet(this, _Angle_unit, "f");
    }
    add(value, unit) {
        if (typeof value == "number") {
            if (unit == undefined) {
                unit = __classPrivateFieldGet(this, _Angle_unit, "f");
            }
            value = new Angle(value, unit).convert(__classPrivateFieldGet(this, _Angle_unit, "f"));
        }
        else {
            value = value.cloneAndConvert(__classPrivateFieldGet(this, _Angle_unit, "f"));
        }
        __classPrivateFieldSet(this, _Angle_value, __classPrivateFieldGet(this, _Angle_value, "f") + __classPrivateFieldGet(value, _Angle_value, "f"), "f");
        return this;
    }
    subtract(value, unit) {
        if (typeof value == "number") {
            if (unit == undefined) {
                unit = __classPrivateFieldGet(this, _Angle_unit, "f");
            }
            value = new Angle(value, unit).convert(__classPrivateFieldGet(this, _Angle_unit, "f"));
        }
        else {
            value = value.cloneAndConvert(__classPrivateFieldGet(this, _Angle_unit, "f"));
        }
        __classPrivateFieldSet(this, _Angle_value, __classPrivateFieldGet(this, _Angle_value, "f") - __classPrivateFieldGet(value, _Angle_value, "f"), "f");
        return this;
    }
    /**
     * Multiply the internal value of this angle by the given `factor`.<br>
     * **This method modify the internal value of this angle**, putting the result
     * of the operation into the `value` of this angle.
     * @param {number} factor the factor to be used for the multiplication
     * @return {Angle} this angle after the multiplication
     */
    multiply(factor) {
        __classPrivateFieldSet(this, _Angle_value, __classPrivateFieldGet(this, _Angle_value, "f") * factor, "f");
        return this;
    }
    /**
     * Divide the internal value of this angle by the given `factor`.<br>
     * **This method modify the internal value of this angle**, putting the result
     * of the operation into the `value` of this angle.
     * @param {number} factor the factor to be used for the division
     * @return {Angle} this angle after the division
     */
    divide(factor) {
        __classPrivateFieldSet(this, _Angle_value, __classPrivateFieldGet(this, _Angle_value, "f") * factor, "f");
        return this;
    }
}
exports.Angle = Angle;
_Angle_value = new WeakMap(), _Angle_unit = new WeakMap();
/**
 * Creates and return a new angle given a value and a unit.
 * The default unit is *radians*
 * @param {number} value the value of the angle
 * @param {AngleUnit} unit the unit of measurement of the angle (*radians* ad default)
 * @return {Angle} the new angle
 */
function angle(value, unit = AngleUnit.RAD) {
    return new Angle(value, unit);
}
exports.angle = angle;
/**
 * Converts an angle in radians to degree
 * @param {number} angle the value of the angle in radians
 * @return {number} the value of the angle in degree
 */
function rad2Deg(angle) {
    return (180 * angle) / Math.PI;
}
exports.rad2Deg = rad2Deg;
/**
 * Converts an angle in degree to radians
 * @param {number} angle the value of the angle in degree
 * @return {number} the value of the angle in radians
 */
function deg2Rad(angle) {
    return (Math.PI * angle) / 180;
}
exports.deg2Rad = deg2Rad;
/**
 * Creates and returns a new angle in *radians* with the given value
 * @param {number} value the value of the angle in *radians*
 * @return {Angle} the new angle in radians
 */
function radians(value) {
    return angle(value, AngleUnit.RAD);
}
exports.radians = radians;
/**
 * Creates and returns a new angle in *degree* with the given value
 * @param {number} value the value of the angle in *degree*
 * @return {Angle} the new angle in radians
 */
function degree(value) {
    return angle(value, AngleUnit.DEG);
}
exports.degree = degree;
//# sourceMappingURL=angle.js.map