import {Point3D} from "../point/point-3d";
import {NumberTrio} from "../../types/numbers/number-trio";
import {Couple} from "../../types/pair";
import {Angle} from "../angle/angle";

export type TranslationCallback = (oldPosition: Point3D, delta: NumberTrio, newPosition: Point3D) => void
export type RotationCallback = (startRotation: Couple<Angle>, delta: Couple<Angle>, endRotation: Couple<Angle>) => void
export type DilationCallback = (startDilation: NumberTrio, delta: NumberTrio, endDilation: NumberTrio) => void

/**
 * A container of callback for a mesh object that can be:
 * - translated
 * - rotated
 * - scaled
 */
export interface RRSCallbackContainer {

    /**
     * Adds a *callback* that will be called when a relative reference system is **translated**
     * @param {TranslationCallback} block the function that has to be executed when the object is translated
     */
    addOnTranslation(block: TranslationCallback): void

    /**
     * Removes a *callback* that was previously registered for the translation
     * @param {TranslationCallback} block the function to be removed
     */
    removeOnTranslation(block: TranslationCallback): void

    /**
     * Adds a *callback* that will be called when a relative reference system is **rotated**
     * @param {RotationCallback} block the function that has to be executed when the object is rotated
     */
    addOnRotation(block: RotationCallback): void

    /**
     * Removes a *callback* that was previously registered for the rotation
     * @param {RotationCallback} block the
     * function to be removed
     */
    removeOnRotation(block: RotationCallback): void

    /**
     * Adds a *callback* that will be called when a relative reference system is **dilated**
     * @param {ScaleCallback} block the function that has to be executed when the object is scaled
     */
    addOnDilation(block: DilationCallback): void

    /**
     * Removes a *callback* that was previously registered for the scale
     * @param {ScaleCallback} block the function to be removed
     */
    removeOnDilation(block: DilationCallback): void

}

/**
 * A container of callback for a mesh object that can be:
 * - translated
 * - rotated
 * - scaled
 *
 * This container can also be *notified* when an operation is performed over the object, so each `notify`
 * method invokes the relative set of callbacks
 */
export interface NotifiableRRSCallbackContainer extends RRSCallbackContainer {

    /**
     * Notify a translation, invoking all the *callbacks* for the translation
     * @param {Point3D} oldPosition the position before the translation
     * @param {NumberTrio} delta the three deltas for the translation (`deltaX`, `deltaY`, `deltaZ`)
     * @param {Point3D} newPosition the position after the translation
     */
    notifyTranslation(oldPosition: Point3D, delta: NumberTrio, newPosition: Point3D): void

    /**
     * Notify a rotation, invoking all the *callbacks* for the rotation
     * @param {Couple<Angle>} startRotation the angles before the translation
     * @param {Couple<Angle>} delta the two deltas for the rotation (`deltaTheta`, `deltaPhi`)
     * @param {Couple<Angle>} endRotation the angles of the object after the rotation
     */
    notifyRotation(startRotation: Couple<Angle>, delta: Couple<Angle>, endRotation: Couple<Angle>): void

    /**
     * Notify a scale, invoking all the *callbacks* for the scale
     * @param {NumberTrio} startDilation the dilation before the *transformation*
     * @param {NumberTrio} delta the three deltas for the scale (`mX`, `mY`, `mZ`)
     * @param {NumberTrio} endDilation the dilation after the *transformation*
     */
    notifyDilation(startDilation: NumberTrio, delta: NumberTrio, endDilation: NumberTrio): void

}