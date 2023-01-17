import {Point3D} from "../point/point-3d";
import {Angle} from "../angle/angle";
import {Trio} from "../../types/triple";
import {NumberTrio} from "../../types/numbers/number-trio";

interface RelativeReferenceSystem {

    /**
     * Returns the point with the absolute coordinates of the origin of the
     * relative reference system
     */
    getCurrentOriginPosition(): Point3D

    /**
     * Returns the current absolute angles of the elementary rotation of the relative reference system around
     * the three axis of the absolute one
     */
    getCurrentRotation(): Trio<Angle>

    /**
     * Returns the current absolute scale of the scale of the relative reference system
     */
    getCurrentScale(): NumberTrio

    /**
     * Translates this relative reference system by a vector `[dx, dy, dz]`.
     * **This method internally modifies the instance and returns `this`**
     * @param {number} dx the `x` component of the translation vector
     * @param {number} dy the `y` component of the translation vector
     * @param {number} dz the `z` component of the translation vector
     * @return {RelativeReferenceSystem} this relative reference system after the translation
     */
    translate(dx: number, dy: number, dz: number): RelativeReferenceSystem

    /**
     * Rotates this relative reference system by a vector of angles `[phi, theta, psi]`
     * which contains the angles of the elementary rotations around `x`, `y` and `z`.
     * **This method internally modifies the instance and returns `this`**
     * @param {Angle} phi the angle of the rotation around `x`
     * @param {Angle} theta the angle of the rotation around `y`
     * @param {Angle} psi the angle of the rotation around `z`
     * @return {RelativeReferenceSystem}  this relative reference system after the rotation
     */
    rotate(phi: Angle, theta: Angle, psi: Angle): RelativeReferenceSystem

    /**
     * Dilates this relative reference system by a vector coefficient for the three axis.
     * **This method internally modifies the instance and returns `this`**
     * @param {number} mx the coefficient for the `x` dilation
     * @param {number} my the coefficient for the `y` dilation
     * @param {number} mz the coefficient for the `z` dilation
     * @return {RelativeReferenceSystem}  this relative reference system after the dilation
     */
    dilate(mx: number, my: number, mz: number): RelativeReferenceSystem


}