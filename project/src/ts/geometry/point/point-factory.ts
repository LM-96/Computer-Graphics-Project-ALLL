import {Point3D} from "./point-3d";
import {FrozenPoint3D} from "./frozen-point-3d";
import {MutablePoint3D} from "./mutable-point-3d";

/**
 * A factory for the points
 */
export class PointFactory {

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
    static newFrozenPoint3D(x: number, y: number, z: number, denyModifiedCopy: boolean = true): Point3D {
        return new FrozenPoint3D(x, y, z, denyModifiedCopy)
    }

    /**
     * Creates and return a new point that is modifiable
     * @param {number} x the value of the `x` coordinate
     * @param {number} y the value of the `y` coordinate
     * @param {number} z the value of the `z` coordinate
     * @return {Point3D} the new point
     */
    static newMutablePoint3D(x: number, y: number, z: number): Point3D {
        return new MutablePoint3D(x, y, z)
    }

    /**
     * Returns the origin of a cartesian reference system
     * @param {boolean} frozen a flag that indicates if the returning point have to be frozen (`false`
     * by default)
     * @param {boolean} denyModifiedCopy the flag to deny the return of a modified copy if
     * the point is frozen (`true` by default)
     */
    static origin(frozen: boolean = false, denyModifiedCopy: boolean = true): Point3D {
        if(frozen) {
            return new FrozenPoint3D(0, 0, 0, denyModifiedCopy)
        } else {
            return new MutablePoint3D(0, 0, 0)
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
    static newPoint3D(x: number, y: number, z: number,
                      frozen: boolean = false, denyModifiedCopy: boolean = true): Point3D {
        if(frozen) {
            return this.newFrozenPoint3D(x, y, z, denyModifiedCopy)
        } else {
            return this.newMutablePoint3D(x, y, z)
        }
    }
}