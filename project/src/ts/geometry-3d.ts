/**
 * The enumeration that represents an axis
 */
enum Axis{
    X, Y, Z
}

enum AngleUnit {
    RAD, DEG
}

/* UTILITIES ***************************************************************************************************** */
/**
 * An exception that is thrown when the modification of a certain value is not allowed
 */
export class IllegalModificationException extends Error {

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, IllegalModificationException.prototype)
    }

}

/**
 * An object that has also functional methods like `apply` or `map`
 */
interface FunctionalObject<T> {

    /**
     * Calls the specified function block with this value as its argument and returns its result
     * @param {(any) => any} mapper the function to be invoked
     */
    map<R>(mapper: (T) => R): R

    /**
     * Calls the specified function `block` with this value as its argument and returns this value.
     * The return value of `block` will be ignored
     * @param {(any) => (any)} block the function to be applied on this object
     */
    apply(block: (T) => any): T

}

/**
 * The abstract implementation of a `FunctionalObject`
 */
abstract class AbstractFunctionalObject<T> implements FunctionalObject<T>{

    map<R>(mapper: (T) => R): R {
        return mapper(this)
    }

    apply(block: (T) => any): T {
        return block(this)
    }

}

/* POINTS ******************************************************************************************************** */
/**
 * Returns `true` if the given `object` is a **point**
 * @param {any} object
 * @return {boolean} `true` if the given `object` is a **point**, `false` otherwise
 */
function isPoint(object: any): boolean {
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
function samePoints(point1: any, point2: any): boolean {
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
function checkNotNullCoordinates(x: number|null, y: number|null,
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

/**
 * A point in a 3D reference system that is only readable
 */
export interface ReadablePoint3D {

    /**
     * Returns the value of the specified coordinate of the point
     * @param {Axis} axis the axis of the coordinate
     * @return {number} the value of the specified coordinate of the point
     */
    getCoordinate(axis: Axis): number;

    getX(): number;
    getY(): number;
    getZ(): number;

    equals(other: any): boolean;
    toString(): string;
}

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
export interface Point3D extends ReadablePoint3D, FunctionalObject<Point3D> {

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
    deepCopy(): Point3D
}

/**
 * The abstract implementation of a `Point3D`.
 * This point can be
 *
 * - **frozen**: in this case is not possible to modify the values of the internal coordinates;
 * this kind of point can **throw an exception** or **returns a modified copy** depending on the
 * configuration
 *
 * - **mutable**: in this case is possible to modify the values of the internal coordinates using all the
 * method for these kind of purposes; these methods will return `this`
 */
abstract class AbstractPoint3D extends AbstractFunctionalObject<Point3D> implements Point3D {

    abstract getCoordinate(axis: Axis): number
    abstract dilateCoordinate(dilation: number, axis: Axis): Point3D;
    abstract frozen(denyModifiedCopy: boolean): Point3D;
    abstract isFrozen(): boolean;
    abstract isUnfrozen(): boolean;
    abstract setCoordinate(newValue: number, axis: Axis): Point3D;
    abstract translateCoordinate(translation: number, axis: Axis): Point3D;
    abstract unfrozen(): Point3D;
    abstract deepCopy(): Point3D;

    dilate(mx: number | null, my: number | null, mz: number | null): Point3D {
        let result: Point3D = this
        if(mx != null) {
            result = result.dilateCoordinate(mx, Axis.X)
        }
        if(my != null) {
            result = result.dilateCoordinate(my, Axis.Y)
        }
        if(mz != null) {
            result = result.dilateCoordinate(mz, Axis.Z)
        }
        return result
    }

    dilateX(mx: number): Point3D {
        return this.dilateCoordinate(mx, Axis.X)
    }

    dilateY(my: number): Point3D {
        return this.dilateCoordinate(my, Axis.Y)
    }

    dilateZ(mz: number): Point3D {
        return this.dilateCoordinate(mz, Axis.Z)
    }

    dilateByVector(vector: Point3D): Point3D {
        return this
            .dilateCoordinate(vector.getX(), Axis.X)
            .dilateCoordinate(vector.getY(), Axis.Y)
            .dilateCoordinate(vector.getZ(), Axis.Z)
    }

    getX(): number {
        return this.getCoordinate(Axis.X)
    }

    getY(): number {
        return this.getCoordinate(Axis.Y)
    }

    getZ(): number {
        return this.getCoordinate(Axis.Z)
    }

    set(newX: number | null, newY: number | null, newZ: number | null): Point3D {
        let result: Point3D = this
        if(newX != null) {
            result = this.setCoordinate(newX, Axis.X)
        }
        if(newY != null) {
            result = this.setCoordinate(newY, Axis.Y)
        }
        if(newZ != null) {
            result = this.setCoordinate(newZ, Axis.Z)
        }
        return result
    }

    setX(newX: number): Point3D {
        return this.setCoordinate(newX, Axis.X)
    }

    setY(newY: number): Point3D {
        return this.setCoordinate(newY, Axis.Y)
    }

    setZ(newZ: number): Point3D {
        return this.setCoordinate(newZ, Axis.Z)
    }

    translate(dx: number | null, dy: number | null, dz: number | null): Point3D {
        let result: Point3D = this
        if(dx != null) {
            result = this.translateCoordinate(dx, Axis.X)
        }
        if(dy != null) {
            result = this.translateCoordinate(dy, Axis.Y)
        }
        if(dz != null) {
            result = this.translateCoordinate(dz, Axis.Z)
        }
        return result
    }

    translateByVector(vector: ReadablePoint3D): Point3D {
        return this
            .translateCoordinate(vector.getX(), Axis.X)
            .translateCoordinate(vector.getY(), Axis.Y)
            .translateCoordinate(vector.getZ(), Axis.Z)
    }

    translateX(dx: number): Point3D {
        return this.translateCoordinate(dx, Axis.X)
    }

    translateY(dy: number): Point3D {
        return this.translateCoordinate(dy, Axis.Y)
    }

    translateZ(dz: number): Point3D {
        return this.translateCoordinate(dz, Axis.Z)
    }

    equals(other: any): boolean {
        return samePoints(this, other)
    }

    toString(): string {
        return "(" + this.getX() + ", " + this.getY() + ", " + this.getZ() + ")"
    }

}

/**
 * The frozen implementation of a point in 3D reference system.
 * This class extends `AbstractPoint3D` and implement `Point3D`.
 * Notice that every object of this class keeps the setting of the denying of
 * the returning modified copies.
 * If `denyModCopy` is disabled in the constructor, every method that tries to modify
 * a coordinate of this point will return a copy of this after the modification; if this
 * flag is false, then every of these methods will throw an `IllegalModificationException`
 */
class FrozenPoint3D extends AbstractPoint3D implements Point3D{

    readonly #x: number
    readonly #y: number
    readonly #z: number
    readonly #denyModCopy: boolean

    constructor(x: number, y: number, z: number, denyModCopy: boolean = true) {
        super();
        checkNotNullCoordinates(x, y, z, true)

        this.#x = x
        this.#y = y
        this.#z = z
        this.#denyModCopy = denyModCopy
    }

    #checkCopyDenied() {
        if(this.#denyModCopy) {
            throw new IllegalModificationException(
                "this point is frozen and copy is denied: unable to modify values or to return a modified copy")
        }
        else {
            console.log("warning: this point 3D is frozen: a copy will be returned")
        }
    }

    setCoordinate(newValue: number, axis: Axis): Point3D {
        this.#checkCopyDenied()
        switch (axis) {
            case Axis.X: {
                return new FrozenPoint3D(newValue, this.#y, this.#z)
            }
            case Axis.Y: {
                return new FrozenPoint3D(this.#x, newValue, this.#z)
            }
            case Axis.Z: {
                return new FrozenPoint3D(this.#z, this.#y, newValue)
            }
        }
    }

    translateCoordinate(translation: number, axis: Axis): Point3D {
        this.#checkCopyDenied()
        switch (axis) {
            case Axis.X: {
                return new FrozenPoint3D(this.#x + translation, this.#y, this.#z)
            }
            case Axis.Y: {
                return new FrozenPoint3D(this.#x, this.#y + translation, this.#z)
            }
            case Axis.Z: {
                return new FrozenPoint3D(this.#z, this.#y, this.#z + translation)
            }
        }
    }

    dilateCoordinate(dilation: number, axis: Axis): Point3D {
        this.#checkCopyDenied()
        switch (axis) {
            case Axis.X: {
                return new FrozenPoint3D(this.#x * dilation, this.#y, this.#z)
            }
            case Axis.Y: {
                return new FrozenPoint3D(this.#x, this.#y * dilation, this.#z)
            }
            case Axis.Z: {
                return new FrozenPoint3D(this.#z, this.#y, this.#z * dilation)
            }
        }
    }

    getCoordinate(axis: Axis): number {
        switch (axis) {
            case Axis.X: {
                return this.#x
            }
            case Axis.Y: {
                return this.#y
            }
            case Axis.Z: {
                return this.#z
            }
        }
    }

    frozen(denyModifiedCopy: boolean): Point3D {
        if(this.#denyModCopy === denyModifiedCopy) {
            return this
        }
        else {
            return new FrozenPoint3D(this.#x, this.#y, this.#z, denyModifiedCopy)
        }
    }

    unfrozen(): Point3D {
        return new MutablePoint3D(this.#x, this.#y, this.#z)
    }

    isFrozen(): boolean {
        return true
    }

    isUnfrozen(): boolean {
        return false
    }

    deepCopy(): Point3D {
        return new FrozenPoint3D(this.#x, this.#y, this.#z)
    }

}

/**
 * The implementation of a mutable point in a 3D reference system.
 * This class extends `AbstractPoint3D` and implements `Point3D`.
 * All the methods of this class that change the value of one of the coordinates of
 * this point will return `this` object after the modification
 */
class MutablePoint3D extends AbstractPoint3D implements Point3D {
    #x: number
    #y: number
    #z: number

    constructor(x: number, y: number, z: number) {
        super();
        checkNotNullCoordinates(x, y, z, true)

        this.#x = x
        this.#y = y
        this.#z = z
    }

    getCoordinate(axis: Axis): number {
        switch (axis) {
            case Axis.X:
                return this.#x
            case Axis.Y:
                return this.#y
            case Axis.Z:
                return this.#z
        }
    }

    setCoordinate(newValue: number, axis: Axis): Point3D {
        switch (axis) {
            case Axis.X: {
                this.#x = newValue
                break
            }
            case Axis.Y: {
                this.#y = newValue
                break
            }
            case Axis.Z: {
                this.#z = newValue
                break
            }
        }
        return this
    }

    translateCoordinate(translation: number, axis: Axis): Point3D {
        switch (axis) {
            case Axis.X: {
                this.#x += translation
                break
            }
            case Axis.Y: {
                this.#y += translation
                break
            }
            case Axis.Z: {
                this.#z += translation
                break
            }
        }
        return this
    }

    dilateCoordinate(dilation: number, axis: Axis): Point3D {
        switch (axis) {
            case Axis.X: {
                this.#x *= dilation
                break
            }
            case Axis.Y: {
                this.#y *= dilation
                break
            }
            case Axis.Z: {
                this.#z *= dilation
                break
            }
        }
        return this
    }

    frozen(denyModifiedCopy: boolean = true): Point3D {
        return new FrozenPoint3D(this.#x, this.#y, this.#z, denyModifiedCopy)
    }

    isFrozen(): boolean {
        return false;
    }

    isUnfrozen(): boolean {
        return true;
    }

    unfrozen(): Point3D {
        return this;
    }

    deepCopy(): Point3D {
        return new MutablePoint3D(this.#x, this.#y, this.#z)
    }
}

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
}