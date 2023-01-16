import {Point3D} from "../point/point-3d";
import {PositionOutOfLimitException} from "./exceptions/position-out-of-limit-exception";

/**
 * A component able to check if a *position* (represented by a 3D point) is valid inside
 * a limited geometrical domain
 */
export abstract class LimitsChecker {

    /**
     * Checks if the given `position` is in the limits returning a `boolean`
     * @param {Point3D} position the position to check for
     * @return {boolean} `true` if the position is valid (is inside the limits)
     */
    abstract isInLimits(position: Point3D): boolean

    /**
     * Checks if the given `position` is **out** of the limits returning a `boolean`
     * @param {Point3D} position the position to check for
     * @return {boolean} `true` if the position is **not** valid (is out of the limits)
     */
    abstract isOutOfLimits(position: Point3D): boolean

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
    checkOrThrow(position: Point3D, throwError: boolean): boolean {
        let res: boolean = this.isInLimits(position)
        if(throwError && !res)
            throw new PositionOutOfLimitException(position)
        return res
    }

    /**
     * Executes the given `block` with the given `position` if this is in the limits, then returns
     * this checker. If the position is not in the limits, nothing is performed
     * @param {Point3D} position the position
     * @param {(position: Point3D) => void} block the function to be executed if the `position` is in the limits
     * @return this limit checker
     */
    ifInLimits(position: Point3D, block: (position: Point3D) => void): LimitsChecker {
        if(this.isInLimits(position))
            block(position)

        return this
    }

    /**
     * Executes the given `block` with the given `position` if this is **not** in the limits, then returns
     * this checker. If the position is in the limits, nothing is performed
     * @param {Point3D} position the position
     * @param {(position: Point3D) => void} block the function to be executed if the `position` is **out** of the limits
     * @return this limit checker
     */
    ifOutOfLimits(position: Point3D, block: (position: Point3D) => void): LimitsChecker {
        if(this.isOutOfLimits(position))
            block(position)

        return this
    }

    /**
     * Applies the given `block` with `this` as argument, then return `this`
     * @param {(limitChecker: LimitsChecker) => void} block the function to be executed
     * @return `this` object
     */
    apply(block: (limitChecker: LimitsChecker) => void): LimitsChecker {
        block(this)
        return this
    }

    /**
     * Calls the specified function `block` with this value as its argument and returns its result.
     * @param {(limitChecked: LimitsChecker) => R} block the function to be executed with this object
     * @return {R} the result of `block`
     */
    map<R>(block: (limitChecked: LimitsChecker) => R): R {
        return block(this)
    }

}