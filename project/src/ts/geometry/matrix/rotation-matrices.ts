import {Angle, AngleUnit} from "../angle/angle";
import {NumMatrix} from "./matrix-types";
import {matrix} from "./matrix";
import {Axis} from "../axis";

export class RotationMatrices {
    /**
     * Returns the matrix for the elementary angle around the `x` axis for the specified
     * angle. Multiply a point for this matrix will return the coordinates of the point after the angle
     * @param {Angle} angle the angle of the angle
     * @return {NumMatrix} the matrix for the angle
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
     * Returns the matrix for the elementary angle around the `y` axis for the specified
     * angle. Multiply a point for this matrix will return the coordinates of the point after the angle
     * @param {Angle} angle the angle of the angle
     * @return {NumMatrix} the matrix for the angle
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
     * Returns the matrix for the elementary angle around the `z` axis for the specified
     * angle. Multiply a point for this matrix will return the coordinates of the point after the angle
     * @param {Angle} angle the angle of the angle
     * @return {NumMatrix} the matrix for the angle
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
     * Return the matrix for the elementary angle around the specified axis for the specified axis.
     * Multiply a point for this matrix will return the coordinates of the point after the angle
     * @param {Axis} axis the axis around which the angle is desired to be performed
     * @param {Angle} angle the angle of the angle
     * @return {NumMatrix} the matrix for the angle
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