"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractPoint3D = void 0;
const point_3d_1 = require("./point-3d");
const matrix_1 = require("../matrix/matrix");
const axis_1 = require("../axis");
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
class AbstractPoint3D {
    asRowVector() {
        let matrixData = new Array(1);
        matrixData[0][0] = this.getX();
        matrixData[0][1] = this.getY();
        matrixData[0][2] = this.getZ();
        return (0, matrix_1.frozenMatrix)(matrixData);
    }
    asColumnVector() {
        let matrixData = new Array(3);
        matrixData[0] = [this.getX()];
        matrixData[1] = [this.getY()];
        matrixData[2] = [this.getZ()];
        return (0, matrix_1.frozenMatrix)(matrixData);
    }
    dilate(mx, my, mz) {
        let result = this;
        if (mx != null) {
            result = result.dilateCoordinate(mx, axis_1.Axis.X);
        }
        if (my != null) {
            result = result.dilateCoordinate(my, axis_1.Axis.Y);
        }
        if (mz != null) {
            result = result.dilateCoordinate(mz, axis_1.Axis.Z);
        }
        return result;
    }
    dilateX(mx) {
        return this.dilateCoordinate(mx, axis_1.Axis.X);
    }
    dilateY(my) {
        return this.dilateCoordinate(my, axis_1.Axis.Y);
    }
    dilateZ(mz) {
        return this.dilateCoordinate(mz, axis_1.Axis.Z);
    }
    dilateByVector(vector) {
        return this
            .dilateCoordinate(vector.getX(), axis_1.Axis.X)
            .dilateCoordinate(vector.getY(), axis_1.Axis.Y)
            .dilateCoordinate(vector.getZ(), axis_1.Axis.Z);
    }
    getX() {
        return this.getCoordinate(axis_1.Axis.X);
    }
    getY() {
        return this.getCoordinate(axis_1.Axis.Y);
    }
    getZ() {
        return this.getCoordinate(axis_1.Axis.Z);
    }
    rotateAroundX(angle) {
        return this.rotateAround(axis_1.Axis.X, angle);
    }
    rotateAroundY(angle) {
        return this.rotateAround(axis_1.Axis.Y, angle);
    }
    rotateAroundZ(angle) {
        return this.rotateAround(axis_1.Axis.Z, angle);
    }
    set(newX, newY, newZ) {
        let result = this;
        if (newX != null) {
            result = this.setCoordinate(newX, axis_1.Axis.X);
        }
        if (newY != null) {
            result = this.setCoordinate(newY, axis_1.Axis.Y);
        }
        if (newZ != null) {
            result = this.setCoordinate(newZ, axis_1.Axis.Z);
        }
        return result;
    }
    setX(newX) {
        return this.setCoordinate(newX, axis_1.Axis.X);
    }
    setY(newY) {
        return this.setCoordinate(newY, axis_1.Axis.Y);
    }
    setZ(newZ) {
        return this.setCoordinate(newZ, axis_1.Axis.Z);
    }
    translate(dx, dy, dz) {
        let result = this;
        if (dx != null) {
            result = this.translateCoordinate(dx, axis_1.Axis.X);
        }
        if (dy != null) {
            result = this.translateCoordinate(dy, axis_1.Axis.Y);
        }
        if (dz != null) {
            result = this.translateCoordinate(dz, axis_1.Axis.Z);
        }
        return result;
    }
    translateByVector(vector) {
        return this
            .translateCoordinate(vector.getX(), axis_1.Axis.X)
            .translateCoordinate(vector.getY(), axis_1.Axis.Y)
            .translateCoordinate(vector.getZ(), axis_1.Axis.Z);
    }
    translateX(dx) {
        return this.translateCoordinate(dx, axis_1.Axis.X);
    }
    translateY(dy) {
        return this.translateCoordinate(dy, axis_1.Axis.Y);
    }
    translateZ(dz) {
        return this.translateCoordinate(dz, axis_1.Axis.Z);
    }
    equals(other) {
        return (0, point_3d_1.samePoints)(this, other);
    }
    toString() {
        return "(" + this.getX() + ", " + this.getY() + ", " + this.getZ() + ")";
    }
    toArray() {
        return [this.getX(), this.getY(), this.getZ()];
    }
}
exports.AbstractPoint3D = AbstractPoint3D;
//# sourceMappingURL=abstract-point-3d.js.map