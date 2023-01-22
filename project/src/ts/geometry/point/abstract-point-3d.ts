import {Point3D, samePoints} from "./point-3d";
import {ReadablePoint3D} from "./readable-point-3d";
import {NumMatrix} from "../matrix/matrix-types";
import {frozenMatrix} from "../matrix/matrix";
import {Angle} from "../angle/angle";
import {Axis} from "../axis";

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
export abstract class AbstractPoint3D implements Point3D {

    abstract getCoordinate(axis: Axis): number
    abstract dilateCoordinate(dilation: number, axis: Axis): Point3D;
    abstract rotateAround(axis: Axis, angle: Angle): Point3D
    abstract frozen(denyModifiedCopy: boolean): Point3D;
    abstract isFrozen(): boolean;
    abstract isUnfrozen(): boolean;
    abstract setCoordinate(newValue: number, axis: Axis): Point3D;
    abstract translateCoordinate(translation: number, axis: Axis): Point3D;
    abstract unfrozen(): Point3D;
    abstract clone(): Point3D;
    
    asRowVector(): NumMatrix {
        let matrixData: Array<Array<number>>  = new Array<Array<number>>(1)
        matrixData[0][0] = this.getX(); matrixData[0][1] = this.getY(); matrixData[0][2] = this.getZ()
        return frozenMatrix(matrixData)        
    }
    
    asColumnVector(): NumMatrix {
        let matrixData: Array<Array<number>>  = new Array<Array<number>>(3)
        matrixData[0] = [this.getX()]; matrixData[1] = [this.getY()]; matrixData[2] = [this.getZ()]
        return frozenMatrix(matrixData)
    }

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
    
    rotateAroundX(angle: Angle): Point3D {
        return this.rotateAround(Axis.X, angle)
    }

    rotateAroundY(angle: Angle): Point3D {
        return this.rotateAround(Axis.Y, angle)
    }

    rotateAroundZ(angle: Angle): Point3D {
        return this.rotateAround(Axis.Z, angle)
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

    toArray(): number[] {
        return [this.getX(), this.getY(), this.getZ()]
    }

}