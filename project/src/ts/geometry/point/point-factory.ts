import {Point3D} from "./point-3d";
import {FrozenPoint3D} from "./frozen-point-3d";
import {MutablePoint3D} from "./mutable-point-3d";
import {Trio, Triple} from "../../types/triple";
import {NumMatrix} from "../matrix/matrix-types";
import {IllegalArgumentException} from "../../types/exceptions/illegal-argument-exception";
import {AbstractMatrix} from "../matrix/abstract-matrix";
import {getTypeName} from "../../types/types";

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
     * @param {boolean} denyModifiedCopy the flag to deny the return of a modified copy (`false` by default)
     * @return {Point3D} the new point
     */
    static newFrozenPoint3D(x: number, y: number, z: number, denyModifiedCopy: boolean = false): Point3D {
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
                      frozen: boolean = true, denyModifiedCopy: boolean = false): Point3D {
        if(frozen) {
            return this.newFrozenPoint3D(x, y, z, denyModifiedCopy)
        } else {
            return this.newMutablePoint3D(x, y, z)
        }
    }
}

/**
 * Creates a new point 3D using the default implementation starting from the value of the coordinates
 * @param {number} x the `x` coordinate
 * @param {number} y the `y` coordinate
 * @param {number} z the `z` coordinate
 * @return {Point3D} the new point
 */
export function point3D(x: number, y: number, z: number): Point3D
/**
 * Creates a new point 3D using the default implementation starting from a `Trio` of number
 * @param {Trio<number>} coordinate the `Trio` of number
 * @return {Point3D} the new point
 */
export function point3D(coordinate: Trio<number>): Point3D
/**
 * Creates a new point 3D using the default implementation starting from an array of number.
 * The array must have exactly three elements otherwise `IllegalArgumentException` is thrown
 * @param {Array<number>} array the array which contains the coordinates
 * @return {Point3D} the new point
 * @throws {IllegalArgumentException} if the array has not exactly three elements
 */
export function point3D(array: Array<number>): Point3D
/**
 * Creates a new point 3D using the default implementation starting from a matrix of number.
 * The matrix must be *1x3* or *3x1* otherwise `IllegalArgumentException` is thrown
 * @param {NumMatrix} matrix the matrix which is a *row* array or a *column* array containing the coordinates
 * of the point
 * @return {Point3D} the new point
 * @throws {IllegalArgumentException} if the matrix is not *1x3* or *3x1*
 */
export function point3D(matrix: NumMatrix): Point3D
export function point3D(xOrData: number|Trio<number>|Array<number>|NumMatrix, y?: number, z?: number): Point3D {
    if(typeof xOrData == "number") {
        return PointFactory.newPoint3D(xOrData, y, z)
    }
    else if(xOrData instanceof Triple) {
        return PointFactory.newPoint3D(xOrData.getFirst(), xOrData.getSecond(), xOrData.getThird())
    }
    else if(xOrData instanceof Array<number>) {
        if(xOrData.length != 3)
            throw new IllegalArgumentException(
                "the array must have exactly 3 elements and not [" + xOrData.length + "]")
        return PointFactory.newPoint3D(xOrData[0], xOrData[1], xOrData[2])
    }
    else if(xOrData instanceof AbstractMatrix) {
        if(xOrData.rowSize() == 1 && xOrData.columnSize() == 3) {
            return PointFactory.newPoint3D(xOrData.get(0, 0), xOrData.get(0, 1),
                xOrData.get(0, 2))
        } else if(xOrData.rowSize() == 3 && xOrData.columnSize() == 1) {
            return PointFactory.newPoint3D(xOrData.get(0, 0), xOrData.get(1, 0),
                xOrData.get(2, 0))
        } else {
            throw new IllegalArgumentException("the matrix must have dimension 1x3 or 3x1 and not [" +
                xOrData.rowSize() + "x" + xOrData.columnSize() + "]")
        }
    }
    throw new IllegalArgumentException("invalid parameter type [" + getTypeName(xOrData) + "]")
}

/**
 * Creates a new point 3D using the default **frozen** implementation starting from the value of the coordinates
 * @param {number} x the `x` coordinate
 * @param {number} y the `y` coordinate
 * @param {number} z the `z` coordinate
 * @return {Point3D} the new point
 */
export function frozenPoint3D(x: number, y: number, z: number): Point3D
/**
 * Creates a new point 3D using the default **frozen** implementation starting from a `Trio` of number
 * @param {Trio<number>} coordinate the `Trio` of number
 * @return {Point3D} the new point
 */
export function frozenPoint3D(coordinate: Trio<number>): Point3D
/**
 * Creates a new point 3D using the default **frozen** implementation starting from an array of number.
 * The array must have exactly three elements otherwise `IllegalArgumentException` is thrown
 * @param {Array<number>} array the array which contains the coordinates
 * @return {Point3D} the new point
 * @throws {IllegalArgumentException} if the array has not exactly three elements
 */
export function frozenPoint3D(array: Array<number>): Point3D
/**
 * Creates a new point 3D using the default **frozen** implementation starting from a matrix of number.
 * The matrix must be *1x3* or *3x1* otherwise `IllegalArgumentException` is thrown
 * @param {NumMatrix} matrix the matrix which is a *row* array or a *column* array containing the coordinates
 * of the point
 * @return {Point3D} the new point
 * @throws {IllegalArgumentException} if the matrix is not *1x3* or *3x1*
 */
export function frozenPoint3D(matrix: NumMatrix): Point3D
export function frozenPoint3D(xOrData: number|Trio<number>|Array<number>|NumMatrix, y?: number, z?: number): Point3D {
    if(typeof xOrData == "number") {
        return PointFactory.newPoint3D(xOrData, y, z, true, false)
    }
    else if(xOrData instanceof Triple) {
        return PointFactory.newPoint3D(xOrData.getFirst(), xOrData.getSecond(), xOrData.getThird(), true, false)
    }
    else if(xOrData instanceof Array<number>) {
        if(xOrData.length != 3)
            throw new IllegalArgumentException(
                "the array must have exactly 3 elements and not [" + xOrData.length + "]")
        return PointFactory.newPoint3D(xOrData[0], xOrData[1], xOrData[2], true, false)
    }
    else if(xOrData instanceof AbstractMatrix) {
        if(xOrData.rowSize() == 1 && xOrData.columnSize() == 3) {
            return PointFactory.newPoint3D(xOrData.get(0, 0), xOrData.get(0, 1),
                xOrData.get(0, 2), true, false)
        } else if(xOrData.rowSize() == 3 && xOrData.columnSize() == 1) {
            return PointFactory.newPoint3D(xOrData.get(0, 0), xOrData.get(1, 0),
                xOrData.get(2, 0), true, false)
        } else {
            throw new IllegalArgumentException("the matrix must have dimension 1x3 or 3x1 and not [" +
                xOrData.rowSize() + "x" + xOrData.columnSize() + "]")
        }
    }
    throw new IllegalArgumentException("invalid parameter type [" + getTypeName(xOrData) + "]")
}

/**
 * Creates a new point 3D using the default **mutable** implementation starting from the value of the coordinates
 * @param {number} x the `x` coordinate
 * @param {number} y the `y` coordinate
 * @param {number} z the `z` coordinate
 * @return {Point3D} the new point
 */
export function mutablePoint3D(x: number, y: number, z: number): Point3D
/**
 * Creates a new point 3D using the default **mutable** implementation starting from a `Trio` of number
 * @param {Trio<number>} coordinate the `Trio` of number
 * @return {Point3D} the new point
 */
export function mutablePoint3D(coordinate: Trio<number>): Point3D
/**
 * Creates a new point 3D using the default **mutable** implementation starting from an array of number.
 * The array must have exactly three elements otherwise `IllegalArgumentException` is thrown
 * @param {Array<number>} array the array which contains the coordinates
 * @return {Point3D} the new point
 * @throws {IllegalArgumentException} if the array has not exactly three elements
 */
export function mutablePoint3D(array: Array<number>): Point3D
/**
 * Creates a new point 3D using the default **mutable** implementation starting from a matrix of number.
 * The matrix must be *1x3* or *3x1* otherwise `IllegalArgumentException` is thrown
 * @param {NumMatrix} matrix the matrix which is a *row* array or a *column* array containing the coordinates
 * of the point
 * @return {Point3D} the new point
 * @throws {IllegalArgumentException} if the matrix is not *1x3* or *3x1*
 */
export function mutablePoint3D(matrix: NumMatrix): Point3D
export function mutablePoint3D(xOrData: number|Trio<number>|Array<number>|NumMatrix, y?: number, z?: number): Point3D {
    if(typeof xOrData == "number") {
        return PointFactory.newPoint3D(xOrData, y, z, false)
    }
    else if(xOrData instanceof Triple) {
        return PointFactory.newPoint3D(xOrData.getFirst(), xOrData.getSecond(), xOrData.getThird(), false)
    }
    else if(xOrData instanceof Array<number>) {
        if(xOrData.length != 3)
            throw new IllegalArgumentException(
                "the array must have exactly 3 elements and not [" + xOrData.length + "]")
        return PointFactory.newPoint3D(xOrData[0], xOrData[1], xOrData[2], false)
    }
    else if(xOrData instanceof AbstractMatrix) {
        if(xOrData.rowSize() == 1 && xOrData.columnSize() == 3) {
            return PointFactory.newPoint3D(xOrData.get(0, 0), xOrData.get(0, 1),
                xOrData.get(0, 2), false)
        } else if(xOrData.rowSize() == 3 && xOrData.columnSize() == 1) {
            return PointFactory.newPoint3D(xOrData.get(0, 0), xOrData.get(1, 0),
                xOrData.get(2, 0), false)
        } else {
            throw new IllegalArgumentException("the matrix must have dimension 1x3 or 3x1 and not [" +
                xOrData.rowSize() + "x" + xOrData.columnSize() + "]")
        }
    }
    throw new IllegalArgumentException("invalid parameter type [" + getTypeName(xOrData) + "]")
}

/**
 * Creates and returns a new `Point3D` that is located into the **origin** (0, 0, 0)
 * @param {boolean} frozen a flag that indicates if the returning point have to be frozen (`false`
 * by default)
 * @param {boolean} denyModifiedCopy the flag to deny the return of a modified copy if
 * the point is frozen (`true` by default)
 * @return the new point that coincide with the origin
 */
export function origin(frozen: boolean = true, denyModifiedCopy: boolean = false): Point3D {
    return PointFactory.newPoint3D(0, 0, 0, frozen, denyModifiedCopy)
}