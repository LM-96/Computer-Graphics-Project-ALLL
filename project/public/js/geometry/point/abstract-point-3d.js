"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractPoint3D = void 0;
const types_1 = require("../../types/types");
const point_3d_1 = require("./point-3d");
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
class AbstractPoint3D extends types_1.AbstractFunctionalObject {
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