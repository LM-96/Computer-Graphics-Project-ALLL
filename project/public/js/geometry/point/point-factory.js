"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointFactory = void 0;
const frozen_point_3d_1 = require("./frozen-point-3d");
const mutable_point_3d_1 = require("./mutable-point-3d");
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
        return new frozen_point_3d_1.FrozenPoint3D(x, y, z, denyModifiedCopy);
    }
    /**
     * Creates and return a new point that is modifiable
     * @param {number} x the value of the `x` coordinate
     * @param {number} y the value of the `y` coordinate
     * @param {number} z the value of the `z` coordinate
     * @return {Point3D} the new point
     */
    static newMutablePoint3D(x, y, z) {
        return new mutable_point_3d_1.MutablePoint3D(x, y, z);
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
            return new frozen_point_3d_1.FrozenPoint3D(0, 0, 0, denyModifiedCopy);
        }
        else {
            return new mutable_point_3d_1.MutablePoint3D(0, 0, 0);
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
//# sourceMappingURL=point-factory.js.map