"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RotationMatrices = void 0;
const angle_1 = require("../angle");
const matrix_factory_1 = require("./matrix-factory");
class RotationMatrices {
    /**
     * Returns the matrix for the elementary rotation around the `x` axis for the specified
     * angle. Multiply a point for this matrix will return the coordinates of the point after the rotation
     * @param {Angle} angle the angle of the rotation
     * @return {NumMatrix} the matrix for the rotation
     */
    static RX(angle) {
        let theta = angle.getValueIn(angle_1.AngleUnit.RAD);
        return (0, matrix_factory_1.matrix)([
            [1, 0, 0],
            [0, Math.cos(theta), -1 * Math.sin(theta)],
            [0, Math.sin(theta), Math.cos(theta)]
        ]);
    }
    /**
     * Returns the matrix for the elementary rotation around the `y` axis for the specified
     * angle. Multiply a point for this matrix will return the coordinates of the point after the rotation
     * @param {Angle} angle the angle of the rotation
     * @return {NumMatrix} the matrix for the rotation
     */
    static RY(angle) {
        let theta = angle.getValueIn(angle_1.AngleUnit.RAD);
        return (0, matrix_factory_1.matrix)([
            [Math.cos(theta), 0, Math.sin(theta)],
            [0, 1, 0],
            [-1 * Math.sin(theta), 0, Math.cos(theta)]
        ]);
    }
    /**
     * Returns the matrix for the elementary rotation around the `z` axis for the specified
     * angle. Multiply a point for this matrix will return the coordinates of the point after the rotation
     * @param {Angle} angle the angle of the rotation
     * @return {NumMatrix} the matrix for the rotation
     */
    static RZ(angle) {
        let theta = angle.getValueIn(angle_1.AngleUnit.RAD);
        return (0, matrix_factory_1.matrix)([
            [Math.cos(theta), -1 * Math.sin(theta), 0],
            [Math.sin(theta), Math.cos(theta), 0],
            [0, 0, 1]
        ]);
    }
    /**
     * Return the matrix for the elementary rotation around the specified axis for the specified axis.
     * Multiply a point for this matrix will return the coordinates of the point after the rotation
     * @param {Axis} axis the axis around which the rotation is desired to be performed
     * @param {Angle} angle the angle of the rotation
     * @return {NumMatrix} the matrix for the rotation
     */
    static R(axis, angle) {
        switch (axis) {
            case Axis.X: {
                return this.RX(angle);
            }
            case Axis.Y: {
                return this.RY(angle);
            }
            case Axis.Z: {
                return this.RZ(angle);
            }
        }
    }
}
exports.RotationMatrices = RotationMatrices;
//# sourceMappingURL=rotation-matrices.js.map