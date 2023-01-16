import {numberCouple, NumberCouple} from "../../types/numbers/number-couple";
import {LimitsChecker} from "./limits-checker";
import {Point3D} from "../point/point-3d";

/**
 * The `LimitChecker` implementation that is able to check if a position is inside
 * a parallelepiped
 */
export class LinearLimitChecker extends LimitsChecker {

    #xLimits: NumberCouple
    #yLimits: NumberCouple
    #zLimits: NumberCouple

    /**
     * Creates a linear limit checker
     * @param {number} xMin the minimum value of the x coordinate a position can have
     * @param {number} xMax the maximum value of the x coordinate a position can have
     * @param {number} yMin the minimum value of the y coordinate a position can have
     * @param {number} yMax the maximum value of the y coordinate a position can have
     * @param {number} zMin the minimum value of the z coordinate a position can have
     * @param {number} zMax the maximum value of the z coordinate a position can have
     */
    constructor(xMin: number, xMax: number, yMin: number, yMax: number, zMin: number, zMax: number) {
        super();
        this.#xLimits = numberCouple(xMin, xMax)
        this.#yLimits = numberCouple(yMin, yMax)
        this.#zLimits = numberCouple(zMin, zMax)
    }

    isInLimits(position: Point3D): boolean {
        return this.#xLimits.isBetween(position.getX()) && this.#yLimits.isBetween(position.getY()) &&
            this.#zLimits.isBetween(position.getZ())
    }

    isOutOfLimits(position: Point3D): boolean {
        return !this.isInLimits(position)
    }

}

