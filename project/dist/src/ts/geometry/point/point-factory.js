"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.origin = exports.mutablePoint3D = exports.frozenPoint3D = exports.point3D = exports.PointFactory = void 0;
const frozen_point_3d_1 = require("./frozen-point-3d");
const mutable_point_3d_1 = require("./mutable-point-3d");
const triple_1 = require("../../types/triple");
const illegal_argument_exception_1 = require("../../types/exceptions/illegal-argument-exception");
const abstract_matrix_1 = require("../matrix/abstract-matrix");
const types_1 = require("../../types/types");
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
     * @param {boolean} denyModifiedCopy the flag to deny the return of a modified copy (`false` by default)
     * @return {Point3D} the new point
     */
    static newFrozenPoint3D(x, y, z, denyModifiedCopy = false) {
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
    static newPoint3D(x, y, z, frozen = true, denyModifiedCopy = false) {
        if (frozen) {
            return this.newFrozenPoint3D(x, y, z, denyModifiedCopy);
        }
        else {
            return this.newMutablePoint3D(x, y, z);
        }
    }
}
exports.PointFactory = PointFactory;
function point3D(xOrData, y, z) {
    if (typeof xOrData == "number") {
        return PointFactory.newPoint3D(xOrData, y, z);
    }
    else if (xOrData instanceof triple_1.Triple) {
        return PointFactory.newPoint3D(xOrData.getFirst(), xOrData.getSecond(), xOrData.getThird());
    }
    else if (xOrData instanceof (Array)) {
        if (xOrData.length != 3)
            throw new illegal_argument_exception_1.IllegalArgumentException("the array must have exactly 3 elements and not [" + xOrData.length + "]");
        return PointFactory.newPoint3D(xOrData[0], xOrData[1], xOrData[2]);
    }
    else if (xOrData instanceof abstract_matrix_1.AbstractMatrix) {
        if (xOrData.rowSize() == 1 && xOrData.columnSize() == 3) {
            return PointFactory.newPoint3D(xOrData.get(0, 0), xOrData.get(0, 1), xOrData.get(0, 2));
        }
        else if (xOrData.rowSize() == 3 && xOrData.columnSize() == 1) {
            return PointFactory.newPoint3D(xOrData.get(0, 0), xOrData.get(1, 0), xOrData.get(2, 0));
        }
        else {
            throw new illegal_argument_exception_1.IllegalArgumentException("the matrix must have dimension 1x3 or 3x1 and not [" +
                xOrData.rowSize() + "x" + xOrData.columnSize() + "]");
        }
    }
    throw new illegal_argument_exception_1.IllegalArgumentException("invalid parameter type [" + (0, types_1.getTypeName)(xOrData) + "]");
}
exports.point3D = point3D;
function frozenPoint3D(xOrData, y, z) {
    if (typeof xOrData == "number") {
        return PointFactory.newPoint3D(xOrData, y, z, true, false);
    }
    else if (xOrData instanceof triple_1.Triple) {
        return PointFactory.newPoint3D(xOrData.getFirst(), xOrData.getSecond(), xOrData.getThird(), true, false);
    }
    else if (xOrData instanceof (Array)) {
        if (xOrData.length != 3)
            throw new illegal_argument_exception_1.IllegalArgumentException("the array must have exactly 3 elements and not [" + xOrData.length + "]");
        return PointFactory.newPoint3D(xOrData[0], xOrData[1], xOrData[2], true, false);
    }
    else if (xOrData instanceof abstract_matrix_1.AbstractMatrix) {
        if (xOrData.rowSize() == 1 && xOrData.columnSize() == 3) {
            return PointFactory.newPoint3D(xOrData.get(0, 0), xOrData.get(0, 1), xOrData.get(0, 2), true, false);
        }
        else if (xOrData.rowSize() == 3 && xOrData.columnSize() == 1) {
            return PointFactory.newPoint3D(xOrData.get(0, 0), xOrData.get(1, 0), xOrData.get(2, 0), true, false);
        }
        else {
            throw new illegal_argument_exception_1.IllegalArgumentException("the matrix must have dimension 1x3 or 3x1 and not [" +
                xOrData.rowSize() + "x" + xOrData.columnSize() + "]");
        }
    }
    throw new illegal_argument_exception_1.IllegalArgumentException("invalid parameter type [" + (0, types_1.getTypeName)(xOrData) + "]");
}
exports.frozenPoint3D = frozenPoint3D;
function mutablePoint3D(xOrData, y, z) {
    if (typeof xOrData == "number") {
        return PointFactory.newPoint3D(xOrData, y, z, false);
    }
    else if (xOrData instanceof triple_1.Triple) {
        return PointFactory.newPoint3D(xOrData.getFirst(), xOrData.getSecond(), xOrData.getThird(), false);
    }
    else if (xOrData instanceof (Array)) {
        if (xOrData.length != 3)
            throw new illegal_argument_exception_1.IllegalArgumentException("the array must have exactly 3 elements and not [" + xOrData.length + "]");
        return PointFactory.newPoint3D(xOrData[0], xOrData[1], xOrData[2], false);
    }
    else if (xOrData instanceof abstract_matrix_1.AbstractMatrix) {
        if (xOrData.rowSize() == 1 && xOrData.columnSize() == 3) {
            return PointFactory.newPoint3D(xOrData.get(0, 0), xOrData.get(0, 1), xOrData.get(0, 2), false);
        }
        else if (xOrData.rowSize() == 3 && xOrData.columnSize() == 1) {
            return PointFactory.newPoint3D(xOrData.get(0, 0), xOrData.get(1, 0), xOrData.get(2, 0), false);
        }
        else {
            throw new illegal_argument_exception_1.IllegalArgumentException("the matrix must have dimension 1x3 or 3x1 and not [" +
                xOrData.rowSize() + "x" + xOrData.columnSize() + "]");
        }
    }
    throw new illegal_argument_exception_1.IllegalArgumentException("invalid parameter type [" + (0, types_1.getTypeName)(xOrData) + "]");
}
exports.mutablePoint3D = mutablePoint3D;
/**
 * Creates and returns a new `Point3D` that is located into the **origin** (0, 0, 0)
 * @param {boolean} frozen a flag that indicates if the returning point have to be frozen (`false`
 * by default)
 * @param {boolean} denyModifiedCopy the flag to deny the return of a modified copy if
 * the point is frozen (`true` by default)
 * @return the new point that coincide with the origin
 */
function origin(frozen = true, denyModifiedCopy = false) {
    return PointFactory.newPoint3D(0, 0, 0, frozen, denyModifiedCopy);
}
exports.origin = origin;
//# sourceMappingURL=point-factory.js.map