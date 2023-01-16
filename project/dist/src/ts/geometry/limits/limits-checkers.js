"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LimitsCheckers = void 0;
const unlimited_limit_checker_1 = require("./unlimited-limit-checker");
const linear_limit_checker_1 = require("./linear-limit-checker");
class LimitsCheckers {
    /**
     * Creates and return a `LimitChecked` returns always 'true' when calling its 'isInLimits'.
     * This means that this checker allows every position
     * @return {LimitsChecker} the new created `LimitChecker`
     */
    static unlimited() {
        return new unlimited_limit_checker_1.UnlimitedLimitChecker();
    }
    /**
     * Creates a linear limit checker that is able to check if a position is inside
     * a parallelepiped
     * @param {number} xMin the minimum value of the x coordinate a position can have
     * @param {number} xMax the maximum value of the x coordinate a position can have
     * @param {number} yMin the minimum value of the y coordinate a position can have
     * @param {number} yMax the maximum value of the y coordinate a position can have
     * @param {number} zMin the minimum value of the z coordinate a position can have
     * @param {number} zMax the maximum value of the z coordinate a position can have
     * @return {LimitsChecker} the new created `LimitChecker`
     */
    static linear(xMin, xMax, yMin, yMax, zMin, zMax) {
        return new linear_limit_checker_1.LinearLimitChecker(xMin, xMax, yMin, yMax, zMin, zMax);
    }
}
exports.LimitsCheckers = LimitsCheckers;
//# sourceMappingURL=limits-checkers.js.map