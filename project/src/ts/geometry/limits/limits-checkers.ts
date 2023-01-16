import {LimitsChecker} from "./limits-checker";
import {UnlimitedLimitChecker} from "./unlimited-limit-checker";
import {LinearLimitChecker} from "./linear-limit-checker";

export class LimitsCheckers {

    /**
     * Creates and return a `LimitChecked` returns always 'true' when calling its 'isInLimits'.
     * This means that this checker allows every position
     * @return {LimitsChecker} the new created `LimitChecker`
     */
    static unlimited(): LimitsChecker {
        return new UnlimitedLimitChecker()
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
    static linear(xMin: number, xMax: number, yMin: number, yMax: number, zMin: number, zMax: number): LimitsChecker {
        return new LinearLimitChecker(xMin, xMax, yMin, yMax, zMin, zMax)
    }

}