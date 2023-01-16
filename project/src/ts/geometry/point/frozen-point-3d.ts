import {checkNotNullCoordinates, Point3D} from "./point-3d";
import {AbstractPoint3D} from "./abstract-point-3d";
import {IllegalModificationException} from "../../types/exceptions/illegal-modification-exception";
import {MutablePoint3D} from "./mutable-point-3d";
import {Angle} from "../angle/angle";
import {RotationMatrices} from "../matrix/rotation-matrices";
import {NumMatrix} from "../matrix/matrix-types";
import {Axis} from "../axis"

/**
 * The frozen implementation of a point in 3D reference system.
 * This class extends `AbstractPoint3D` and implement `Point3D`.
 * Notice that every object of this class keeps the setting of the denying of
 * the returning modified copies.
 * If `denyModCopy` is disabled in the constructor, every method that tries to modify
 * a coordinate of this point will return a copy of this after the modification; if this
 * flag is false, then every of these methods will throw an `IllegalModificationException`
 */
export class FrozenPoint3D extends AbstractPoint3D implements Point3D{

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

    rotateAround(axis: Axis, angle: Angle): Point3D {
        let rotated: NumMatrix = this.asColumnVector().multiply(RotationMatrices.R(axis, angle))
        return new FrozenPoint3D(rotated.get(0, 0), rotated.get(1, 0),
            rotated.get(2, 0), this.#denyModCopy)
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

    clone(): Point3D {
        return new FrozenPoint3D(this.#x, this.#y, this.#z)
    }

}