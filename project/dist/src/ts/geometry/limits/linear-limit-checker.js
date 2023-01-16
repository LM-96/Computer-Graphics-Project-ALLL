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
var _LinearLimitChecker_xLimits, _LinearLimitChecker_yLimits, _LinearLimitChecker_zLimits;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinearLimitChecker = void 0;
const number_couple_1 = require("../../types/numbers/number-couple");
const limits_checker_1 = require("./limits-checker");
/**
 * The `LimitChecker` implementation that is able to check if a position is inside
 * a parallelepiped
 */
class LinearLimitChecker extends limits_checker_1.LimitsChecker {
    /**
     * Creates a linear limit checker
     * @param {number} xMin the minimum value of the x coordinate a position can have
     * @param {number} xMax the maximum value of the x coordinate a position can have
     * @param {number} yMin the minimum value of the y coordinate a position can have
     * @param {number} yMax the maximum value of the y coordinate a position can have
     * @param {number} zMin the minimum value of the z coordinate a position can have
     * @param {number} zMax the maximum value of the z coordinate a position can have
     */
    constructor(xMin, xMax, yMin, yMax, zMin, zMax) {
        super();
        _LinearLimitChecker_xLimits.set(this, void 0);
        _LinearLimitChecker_yLimits.set(this, void 0);
        _LinearLimitChecker_zLimits.set(this, void 0);
        __classPrivateFieldSet(this, _LinearLimitChecker_xLimits, (0, number_couple_1.numberCouple)(xMin, xMax), "f");
        __classPrivateFieldSet(this, _LinearLimitChecker_yLimits, (0, number_couple_1.numberCouple)(yMin, yMax), "f");
        __classPrivateFieldSet(this, _LinearLimitChecker_zLimits, (0, number_couple_1.numberCouple)(zMin, zMax), "f");
    }
    isInLimits(position) {
        return __classPrivateFieldGet(this, _LinearLimitChecker_xLimits, "f").isBetween(position.getX()) && __classPrivateFieldGet(this, _LinearLimitChecker_yLimits, "f").isBetween(position.getY()) &&
            __classPrivateFieldGet(this, _LinearLimitChecker_zLimits, "f").isBetween(position.getZ());
    }
    isOutOfLimits(position) {
        return !this.isInLimits(position);
    }
}
exports.LinearLimitChecker = LinearLimitChecker;
_LinearLimitChecker_xLimits = new WeakMap(), _LinearLimitChecker_yLimits = new WeakMap(), _LinearLimitChecker_zLimits = new WeakMap();
//# sourceMappingURL=linear-limit-checker.js.map