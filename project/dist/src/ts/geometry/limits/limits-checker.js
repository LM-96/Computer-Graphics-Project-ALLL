"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LimitsChecker = void 0;
const position_out_of_limit_exception_1 = require("./exceptions/position-out-of-limit-exception");
/**
 * A component able to check if a *position* (represented by a 3D point) is valid inside
 * a limited geometrical domain
 */
class LimitsChecker {
    /**
     * Checks if the given `position` is in the limits returning a `boolean`.
     * This method also **allows to throw an exception** instead of returning a result by setting
     * the `throwError` parameter
     * @param {Point3D} position the position to check for
     * @param {boolean} throwError a flag that, if `true`, make this method throwing
     * an error instead of returning the result
     * @return {boolean} `true` if the position is valid (is inside the limit)
     * @throws {PositionOutOfLimitException} if the position is not in the limits and `throwError` is set to `true`
     */
    checkOrThrow(position, throwError) {
        let res = this.isInLimits(position);
        if (throwError && !res)
            throw new position_out_of_limit_exception_1.PositionOutOfLimitException(position);
        return res;
    }
    /**
     * Executes the given `block` with the given `position` if this is in the limits, then returns
     * this checker. If the position is not in the limits, nothing is performed
     * @param {Point3D} position the position
     * @param {(position: Point3D) => void} block the function to be executed if the `position` is in the limits
     * @return this limit checker
     */
    ifInLimits(position, block) {
        if (this.isInLimits(position))
            block(position);
        return this;
    }
    /**
     * Executes the given `block` with the given `position` if this is **not** in the limits, then returns
     * this checker. If the position is in the limits, nothing is performed
     * @param {Point3D} position the position
     * @param {(position: Point3D) => void} block the function to be executed if the `position` is **out** of the limits
     * @return this limit checker
     */
    ifOutOfLimits(position, block) {
        if (this.isOutOfLimits(position))
            block(position);
        return this;
    }
    /**
     * Applies the given `block` with `this` as argument, then return `this`
     * @param {(limitChecker: LimitsChecker) => void} block the function to be executed
     * @return `this` object
     */
    apply(block) {
        block(this);
        return this;
    }
    /**
     * Calls the specified function `block` with this value as its argument and returns its result.
     * @param {(limitChecked: LimitsChecker) => R} block the function to be executed with this object
     * @return {R} the result of `block`
     */
    map(block) {
        return block(this);
    }
}
exports.LimitsChecker = LimitsChecker;
//# sourceMappingURL=limits-checker.js.map