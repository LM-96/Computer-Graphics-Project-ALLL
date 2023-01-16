import {Point3D} from "../../point/point-3d";

/**
 * The exception for a position that is out of limits
 */
export class PositionOutOfLimitException extends Error {

    readonly position: Point3D

    constructor(point: Point3D) {
        super("the position " + point.toString() + " is out of limit");
        this.position = point
        Object.setPrototypeOf(this, PositionOutOfLimitException.prototype)
    }

}