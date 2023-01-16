import {AbstractPoint3D} from "./abstract-point-3d";
import {checkNotNullCoordinates, Point3D} from "./point-3d";
import {FrozenPoint3D} from "./frozen-point-3d";
import {Angle} from "../angle/angle";
import {NumMatrix} from "../matrix/matrix-types";
import {RotationMatrices} from "../matrix/rotation-matrices";
import {Axis} from "../axis";

/**
 * The implementation of a mutable point in a 3D reference system.
 * This class extends `AbstractPoint3D` and implements `Point3D`.
 * All the methods of this class that change the value of one of the coordinates of
 * this point will return `this` object after the modification
 */
export class MutablePoint3D extends AbstractPoint3D implements Point3D {
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

    rotateAround(axis: Axis, angle: Angle): Point3D {
        let rotated: NumMatrix = RotationMatrices.R(axis, angle).multiply(this.asColumnVector())
        this.#x = rotated.get(0, 0)
        this.#y = rotated.get(1, 0)
        this.#z = rotated.get(2, 0)
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

    clone(): Point3D {
        return new MutablePoint3D(this.#x, this.#y, this.#z)
    }
}