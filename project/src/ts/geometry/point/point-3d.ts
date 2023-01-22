import {ReadablePoint3D} from "./readable-point-3d";
import {Cloneable} from "../../types/cloneable";
import {NumMatrix} from "../matrix/matrix-types";
import {Angle} from "../angle/angle";
import {Axis} from "../axis";

/**
 * A point in a 3D system reference.
 * This point can be
 *
 * - **frozen**: in this case is not possible to modify the values of the internal coordinates;
 * this kind of point can **throw an exception** or **returns a modified copy** depending on the
 * configuration
 *
 * - **mutable**: in this case is possible to modify the values of the internal coordinates using all the
 * method for these kind of purposes; these methods will return `this`
 */
export interface Point3D extends ReadablePoint3D, Cloneable<Point3D> {

    /**
     * Sets the value of the coordinate of he specified axis of this point
     * @param {number} newValue the new value of the coordinate
     * @param {Axis} axis the axis of the coordinate
     * @return {Point3D} `this` if this point is mutable, a modified copy if is frozen
     * @throws {IllegalModificationException} if this point is **frozen** and the
     * return of the modified copy is not allowed
     */
    setCoordinate(newValue: number, axis: Axis): Point3D

    /**
     * Translates the value of the coordinate of the specified axis of this point
     * @param {number} translation the coefficient of the translation
     * @param {Axis} axis the axis that has to be dilated
     * @return {Point3D} `this` if this point is mutable, a modified copy if is frozen
     * @throws {IllegalModificationException} if this point is **frozen** and the
     * return of the modified copy is not allowed
     */
    translateCoordinate(translation: number, axis: Axis): Point3D

    /**
     * Dilates the value of the coordinate of the specified axis of this point
     * @param {number} dilation the coefficient of the dilation
     * @param {Axis} axis the axis that has to be dilated
     * @return {Point3D} `this` if this point is mutable, a modified copy if is frozen
     * @throws {IllegalModificationException} if this point is **frozen** and the
     * return of the modified copy is not allowed
     */
    dilateCoordinate(dilation: number, axis: Axis): Point3D

    /**
     * Rotates this point around the specified axis with the given angle
     * @param {Axis} axis the axis the point is rotating around
     * @param {Angle} angle the angle of the angle
     * @return {Point3D} `this` if this point is mutable, a modified copy if is frozen
     * @throws {IllegalModificationException} if this point is **frozen** and the
     * return of the modified copy is not allowed
     */
    rotateAround(axis: Axis, angle: Angle): Point3D

    /**
     * Sets the `x` coordinate of this point
     * @param {number} newX the new value of the `x` coordinate
     * @return {Point3D} `this` if this point is mutable, a modified copy if is frozen
     * @throws {IllegalModificationException} if this point is **frozen** and the
     * return of the modified copy is not allowed
     */
    setX(newX: number): Point3D

    /**
     * Sets the `y` coordinate of this point
     * @param {number} newY the new value of the `y` coordinate
     * @return {Point3D} `this` if this point is mutable, a modified copy if is frozen
     * @throws {IllegalModificationException} if this point is **frozen** and the
     * return of the modified copy is not allowed
     */
    setY(newY: number): Point3D

    /**
     * Sets the `z` coordinate of this point
     * @param {number} newZ the new value of the `z` coordinate
     * @return {Point3D} `this` if this point is mutable, a modified copy if is frozen
     * @throws {IllegalModificationException} if this point is **frozen** and the
     * return of the modified copy is not allowed
     */
    setZ(newZ: number): Point3D

    /**
     * Sets all the coordinates of this point.
     * This method will skip eventual `null` or `undefined` coordinates passed as parameters
     *
     * @param {number|null} newX the new value of the `x` coordinate
     * @param {number|null} newY the new value of the `y` coordinate
     * @param {number|null} newZ the new value of the `z` coordinate
     * @return {Point3D} `this` if this point is mutable, a modified copy if is frozen
     * @throws {IllegalModificationException} if this point is **frozen** and the
     * return of the modified copy is not allowed
     */
    set(newX: number|null, newY: number|null, newZ: number|null): Point3D

    /**
     * Translates the `x` coordinate of this point using `dx` for the transformation
     * @param {number} dx the coefficient of the translation
     * @return {Point3D} `this` if this point is mutable, a modified copy if is frozen
     * @throws {IllegalModificationException} if this point is **frozen** and the
     * return of the modified copy is not allowed
     */
    translateX(dx: number): Point3D

    /**
     * Translates the `y` coordinate of this point using `dx` for the transformation
     * @param {number} dy the coefficient of the translation
     * @return {Point3D} `this` if this point is mutable, a modified copy if is frozen
     * @throws {IllegalModificationException} if this point is **frozen** and the
     * return of the modified copy is not allowed
     */
    translateY(dy: number): Point3D

    /**
     * Translates the `z` coordinate of this point using `dx` for the transformation
     * @param {number} dz the coefficient of the translation
     * @return {Point3D} `this` if this point is mutable, a modified copy if is frozen
     * @throws {IllegalModificationException} if this point is **frozen** and the
     * return of the modified copy is not allowed
     */
    translateZ(dz: number): Point3D

    /**
     * Translates all the coordinates of this point using `dx`, `dy` and `dz` for the transformation
     * of the relative coordinate.
     * This method will skip eventual `null` or `undefined` coefficient passed as parameters
     *
     * @param {number|null} dx the coefficient of the translation for the `x` coordinate
     * @param {number|null} dy the coefficient of the translation for the `y` coordinate
     * @param {number|null} dz the coefficient of the translation for the `z` coordinate
     * @return {Point3D} `this` if this point is mutable, a modified copy if is frozen
     * @throws {IllegalModificationException} if this point is **frozen** and the
     * return of the modified copy is not allowed
     */
    translate(dx: number|null, dy: number|null, dz: number|null): Point3D

    /**
     * Translates this point by applying a vector for the transformation
     * @param {Point3D} vector the vector that will be used for the translation intended as
     * a point that contains `T(dx, dy, dz)`
     * @return {Point3D} `this` if this point is mutable, a modified copy if is frozen
     * @throws {IllegalModificationException} if this point is **frozen** and the
     * return of the modified copy is not allowed
     */
    translateByVector(vector: ReadablePoint3D): Point3D

    /**
     * Dilates the `x` coordinate of this point using `mx` as the coefficient of dilation
     * @param {number} mx the coefficient of the dilation
     * @return {Point3D} `this` if this point is mutable, a modified copy if is frozen
     * @throws {IllegalModificationException} if this point is **frozen** and the
     * return of the modified copy is not allowed
     */
    dilateX(mx: number): Point3D

    /**
     * Dilates the `y` coordinate of this point using `mx` as the coefficient of dilation
     * @param {number} my the coefficient of the dilation
     * @return {Point3D} `this` if this point is mutable, a modified copy if is frozen
     * @throws {IllegalModificationException} if this point is **frozen** and the
     * return of the modified copy is not allowed
     */
    dilateY(my: number): Point3D

    /**
     * Dilates the `z` coordinate of this point using `mx` as the coefficient of dilation
     * @param {number} mz the coefficient of the dilation
     * @return {Point3D} `this` if this point is mutable, a modified copy if is frozen
     * @throws {IllegalModificationException} if this point is **frozen** and the
     * return of the modified copy is not allowed
     */
    dilateZ(mz: number): Point3D

    /**
     * Dilates all the coordinates of this point using `mx`, `my` and `mz` as coefficients
     * of the relative coordinate.
     * This method will skip eventual `null` or `undefined` coefficient passed as parameters
     *
     * @param {number|null} mx the coefficient of the dilation for the `x` coordinate
     * @param {number|null} my the coefficient of the dilation for the `y` coordinate
     * @param {number|null} mz the coefficient of the dilation for the `z` coordinate
     * @return {Point3D} `this` if this point is mutable, a modified copy if is frozen
     * @throws {IllegalModificationException} if this point is **frozen** and the
     * return of the modified copy is not allowed
     */
    dilate(mx: number|null, my: number|null, mz: number|null): Point3D

    /**
     * Dilates this point by applying a vector for the transformation
     * @param {Point3D} vector the vector that will be used for the dilation intended as
     * a point that contains `T(mx, my, mz)` (the coefficients of the dilation)
     * @return {Point3D} `this` if this point is mutable, a modified copy if is frozen
     * @throws {IllegalModificationException} if this point is **frozen** and the
     * return of the modified copy is not allowed
     */
    dilateByVector(vector: Point3D): Point3D

    /**
     * Rotate this point around the `x` axis with the given angle
     * @param {Angle} angle the angle of the angle
     * @return {Point3D} `this` if this point is mutable, a modified copy if is frozen
     * @throws {IllegalModificationException} if this point is **frozen** and the
     * return of the modified copy is not allowed
     */
    rotateAroundX(angle: Angle): Point3D

    /**
     * Rotate this point around the `y` axis with the given angle
     * @param {Angle} angle the angle of the angle
     * @return {Point3D} `this` if this point is mutable, a modified copy if is frozen
     * @throws {IllegalModificationException} if this point is **frozen** and the
     * return of the modified copy is not allowed
     */
    rotateAroundY(angle: Angle): Point3D

    /**
     * Rotate this point around the `z` axis with the given angle
     * @param {Angle} angle the angle of the angle
     * @return {Point3D} `this` if this point is mutable, a modified copy if is frozen
     * @throws {IllegalModificationException} if this point is **frozen** and the
     * return of the modified copy is not allowed
     */
    rotateAroundZ(angle: Angle): Point3D

    /**
     * Returns:
     * - **this point** if is already frozen and has the same setting for the
     * `denyModifiedCopy`;
     * - a **new** frozen point if this is already frozen but has a different setting for
     * `denyModifiedCopy`;
     * - a **new** frozen copy of this point if is not frozen.
     *
     * This method should be used only to **convert an `unfrozen` point to the `frozen`** equivalent
     * or to modify the setting of the denying of the returning modified copies:
     * if is needed to obtain a copy, please consider using `deepCopy` instead
     * @param denyModifiedCopy
     */
    frozen(denyModifiedCopy: boolean): Point3D

    /**
     * Returns:
     * - **this point** if is already not frozen
     * - a **new** unfrozen copy of the point if this is frozen
     * This method should be used only to **convert an `frozen` point to the `unfrozen`** equivalent:
     * if is needed to obtain a copy, please consider using `deepCopy` instead
     */
    unfrozen(): Point3D

    /**
     * Returns `true` if this point is frozen
     */
    isFrozen(): boolean

    /**
     * Returns `true` if this point is not frozen
     */
    isUnfrozen(): boolean

    /**
     * Returns a **deep copy** of this point.
     * This method is different from `unfrozen` and `frozen` because it always returns
     * a new copy that is the same type of point of this, keeping the eventual setting
     * about the denying of the returning modified copy
     */
    clone(): Point3D

    /**
     * Returns a `1x3` matrix that is a **row vector** with the values of the coordinates
     * of this point
     */
    asRowVector(): NumMatrix

    /**
     * Returns a `3x1` matrix that is a **column vector** with the values of the coordinates
     * of this point
     */
    asColumnVector(): NumMatrix

    /**
     * Returns an array with the values of the coordinates of this point
     */
    toArray(): number[]
}

/**
 * Returns `true` if the given `object` is a **point**
 * @param {any} object
 * @return {boolean} `true` if the given `object` is a **point**, `false` otherwise
 */
export function isPoint(object: any): boolean {
    return 'getX' in object && 'getY' in object && 'getZ' in object
}

/**
 * Returns `true` if the two objects are the same point.
 * Notice that **this function return `false` if one or both of the arguments
 * are `null` or `undefined`**
 * @param {any} point1 the first object
 * @param {any} point2 the second object
 * @return {boolean} `true` if the two objects are the same point, `false` otherwise
 */
export function samePoints(point1: any, point2: any): boolean {
    if(point1 != null && point2 != null) {
        if(isPoint(point1) && isPoint(point2)) {
            return point1.getX() === point2.getX() &&
                point1.getY() === point2.getY() &&
                point1.getZ() === point2.getZ()
        }
    }

    return false
}

/**
 * Checks if all the given coordinates are not `null`.
 * If `throwError` is enabled, this function will immediately throw an error
 * when it will find a `null` value for a coordinate
 * @param {number} x the `x` coordinate
 * @param {number} y the `y` coordinate
 * @param {number} z the `z` coordinate
 * @param throwError the `flag` that if enabled will make this function able to throw an exception
 * @return {boolean} `true` if all the coordinates are not null, `false` otherwise
 * @throws {Error} if `throwError` is `true` and a coordinate is `null`
 */
export function checkNotNullCoordinates(x: number|null, y: number|null,
                                        z: number|null, throwError: boolean = false): boolean {
    if(x == null) {
        if (throwError) {
            throw Error("x coordinate can not be null")
        }
        return false
    }
    if(y == null) {
        if (throwError) {
            throw Error("y coordinate can not be null")
        }
        return false
    }
    if(z == null) {
        if (throwError) {
            throw Error("z coordinate can not be null")
        }
        return false
    }
    return true
}