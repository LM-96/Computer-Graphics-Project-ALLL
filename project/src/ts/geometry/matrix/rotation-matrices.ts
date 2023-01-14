import {Angle, AngleUnit} from "../angle";
import {NumMatrix} from "./matrix-types";
import {matrix} from "./matrix-factory";

export class RotationMatrices {
    /**
     * Returns the matrix for the elementary rotation around the `x` axis for the specified
     * angle. Multiply a point for this matrix will return the coordinates of the point after the rotation
     * @param {Angle} angle the angle of the rotation
     * @return {NumMatrix} the matrix for the rotation
     */
    static RX(angle: Angle): NumMatrix {
        let theta: number = angle.getValueIn(AngleUnit.RAD)
        return matrix([
            [1, 0, 0],
            [0, Math.cos(theta), -1*Math.sin(theta)],
            [0, Math.sin(theta), Math.cos(theta)]
        ])
    }

    /**
     * Returns the matrix for the elementary rotation around the `y` axis for the specified
     * angle. Multiply a point for this matrix will return the coordinates of the point after the rotation
     * @param {Angle} angle the angle of the rotation
     * @return {NumMatrix} the matrix for the rotation
     */
    static RY(angle: Angle): NumMatrix {
        let theta: number = angle.getValueIn(AngleUnit.RAD)
        return matrix([
            [Math.cos(theta), 0, Math.sin(theta)],
            [0, 1, 0],
            [-1*Math.sin(theta), 0, Math.cos(theta)]
        ])
    }

    /**
     * Returns the matrix for the elementary rotation around the `z` axis for the specified
     * angle. Multiply a point for this matrix will return the coordinates of the point after the rotation
     * @param {Angle} angle the angle of the rotation
     * @return {NumMatrix} the matrix for the rotation
     */
    static RZ(angle: Angle): NumMatrix {
        let theta: number = angle.getValueIn(AngleUnit.RAD)
        return matrix([
            [Math.cos(theta), -1*Math.sin(theta), 0],
            [Math.sin(theta), Math.cos(theta), 0],
            [0, 0, 1]
        ])
    }

    /**
     * Return the matrix for the elementary rotation around the specified axis for the specified axis.
     * Multiply a point for this matrix will return the coordinates of the point after the rotation
     * @param {Axis} axis the axis around which the rotation is desired to be performed
     * @param {Angle} angle the angle of the rotation
     * @return {NumMatrix} the matrix for the rotation
     */
    static R(axis: Axis, angle: Angle): NumMatrix {
        switch (axis) {
            case Axis.X: {
                return this.RX(angle)
            }
            case Axis.Y: {
                return this.RY(angle)
            }
            case Axis.Z: {
                return this.RZ(angle)
            }
        }
    }
}