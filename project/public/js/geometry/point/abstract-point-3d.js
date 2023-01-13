"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractPoint3D = void 0;
const functional_1 = require("../../types/functional");
const point_3d_1 = require("./point-3d");
const matrix_factory_1 = require("../matrix/matrix-factory");
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
class AbstractPoint3D extends functional_1.AbstractFunctionalObject {
    asRowVector() {
        let matrixData = new Array(1);
        matrixData[0][0] = this.getX();
        matrixData[0][1] = this.getY();
        matrixData[0][2] = this.getZ();
        return (0, matrix_factory_1.frozenMatrix)(matrixData);
    }
    asColumnVector() {
        let matrixData = new Array(3);
        matrixData[0] = [this.getX()];
        matrixData[1] = [this.getY()];
        matrixData[2] = [this.getZ()];
        return (0, matrix_factory_1.frozenMatrix)(matrixData);
    }
    dilate(mx, my, mz) {
        let result = this;
        if (mx != null) {
            result = result.dilateCoordinate(mx, Axis.X);
        }
        if (my != null) {
            result = result.dilateCoordinate(my, Axis.Y);
        }
        if (mz != null) {
            result = result.dilateCoordinate(mz, Axis.Z);
        }
        return result;
    }
    dilateX(mx) {
        return this.dilateCoordinate(mx, Axis.X);
    }
    dilateY(my) {
        return this.dilateCoordinate(my, Axis.Y);
    }
    dilateZ(mz) {
        return this.dilateCoordinate(mz, Axis.Z);
    }
    dilateByVector(vector) {
        return this
            .dilateCoordinate(vector.getX(), Axis.X)
            .dilateCoordinate(vector.getY(), Axis.Y)
            .dilateCoordinate(vector.getZ(), Axis.Z);
    }
    getX() {
        return this.getCoordinate(Axis.X);
    }
    getY() {
        return this.getCoordinate(Axis.Y);
    }
    getZ() {
        return this.getCoordinate(Axis.Z);
    }
    rotateAroundX(angle) {
        return this.rotateAround(Axis.X, angle);
    }
    rotateAroundY(angle) {
        return this.rotateAround(Axis.X, angle);
    }
    rotateAroundZ(angle) {
        return this.rotateAround(Axis.X, angle);
    }
    set(newX, newY, newZ) {
        let result = this;
        if (newX != null) {
            result = this.setCoordinate(newX, Axis.X);
        }
        if (newY != null) {
            result = this.setCoordinate(newY, Axis.Y);
        }
        if (newZ != null) {
            result = this.setCoordinate(newZ, Axis.Z);
        }
        return result;
    }
    setX(newX) {
        return this.setCoordinate(newX, Axis.X);
    }
    setY(newY) {
        return this.setCoordinate(newY, Axis.Y);
    }
    setZ(newZ) {
        return this.setCoordinate(newZ, Axis.Z);
    }
    translate(dx, dy, dz) {
        let result = this;
        if (dx != null) {
            result = this.translateCoordinate(dx, Axis.X);
        }
        if (dy != null) {
            result = this.translateCoordinate(dy, Axis.Y);
        }
        if (dz != null) {
            result = this.translateCoordinate(dz, Axis.Z);
        }
        return result;
    }
    translateByVector(vector) {
        return this
            .translateCoordinate(vector.getX(), Axis.X)
            .translateCoordinate(vector.getY(), Axis.Y)
            .translateCoordinate(vector.getZ(), Axis.Z);
    }
    translateX(dx) {
        return this.translateCoordinate(dx, Axis.X);
    }
    translateY(dy) {
        return this.translateCoordinate(dy, Axis.Y);
    }
    translateZ(dz) {
        return this.translateCoordinate(dz, Axis.Z);
    }
    equals(other) {
        return (0, point_3d_1.samePoints)(this, other);
    }
    toString() {
        return "(" + this.getX() + ", " + this.getY() + ", " + this.getZ() + ")";
    }
}
exports.AbstractPoint3D = AbstractPoint3D;
//# sourceMappingURL=abstract-point-3d.js.map