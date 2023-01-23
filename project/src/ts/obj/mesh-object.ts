import {Point3D} from "../geometry/point/point-3d";
import {NumberCouple} from "../types/numbers/number-couple";
import {NumberTrio} from "../types/numbers/number-trio";
import {SingleSignalSubscriber} from "../signals/subscriptions";
import PerformedTranslation from "../geometry/data/performed-translation";
import {PositionOutOfLimitException} from "../geometry/limits/exceptions/position-out-of-limit-exception";
import {PerformedPolarRotation} from "../geometry/data/performed-polar-rotation";
import PerformedScale from "../geometry/data/performed-scale";
import {Couple} from "../types/pair";
import {Angle} from "../geometry/angle/angle";
import {LimitsChecker} from "../geometry/limits/limits-checker";
import {Trio} from "../types/triple";

export interface MeshObject {

    /**
     * Returns a `boolean` that indicates if the object is hidden or not
     */
    getHidden(): boolean

    /**
     * Returns the name of the mesh object
     * @returns {string} the name of the mesh object
     */
    getName(): string;

    /**
     * Returns the current position of this object.
     * The returned point is a *clone* of the internal position the, every change to the returned point
     * will not affect the internal position.
     * @returns {Point3D} the current position of this object
     */
    getPosition(): Point3D

    /**
     * Returns the current rotation of the object considering the polar angles (psi, theta, phi).
     * The returned couple is a *clone* of the internal rotation, every change to the returned couple
     * will not affect the internal rotation
     * @return {NumberCouple} the current rotation of the object considering the polar angles (psi, theta, phi)
     * as a couple of numbers
     */
    getPolarRotation(): Trio<Angle>

    /**
     * Returns the current scale of the axis of the object.
     * The returned trio is a *clone* of the internal scale, every change to the returned trio
     * will not affect the internal scale
     * @return {NumberTrio} the current scale of the axis of the object as a trio of numbers
     */
    getCurrentScale(): NumberTrio

    /**
     * Returns the current limit checker the object is using to constrain its movement.
     * For now, the limit checker only check the position of the vertex; by default
     * the object has no limit (this method returns an `UnlimitedLimitChecker`)
     * @return {LimitsChecker} the current limit checker the object is using to constrain its movement
     */
    getLimitsChecker(): LimitsChecker

    /**
     * Returns the subscriber to the signals emitted by the object each time it is translated
     * @return {SingleSignalSubscriber<PerformedTranslation>} the subscriber to the signals
     * emitted by the object each time it is translated
     */
    getTranslationSubscriber(): SingleSignalSubscriber<MeshObject, PerformedTranslation, void>

    /**
     * Returns the subscriber to the signals emitted by the object each time it is rotated
     * @returns {SingleSignalSubscriber<PerformedPolarRotation, void>} the subscriber to the signals
     * emitted by the object each time it is rotated
     */
    getPolarRotationSubscriber(): SingleSignalSubscriber<MeshObject, PerformedPolarRotation, void>

    /**
     * Returns the subscriber to the signals emitted by the object each time it is scaled
     * @returns {SingleSignalSubscriber<PerformedScale, void>} the subscriber to the signals
     */
    getScaleSubscriber(): SingleSignalSubscriber<MeshObject, PerformedScale, void>

    /**
     * Sets the hidden state of the object
     * @param {boolean} hidden the new hidden state of the object
     */
    setHidden(hidden: boolean): void

    /**
     * Sets the limits checker the object will use to constrain its movement
     * @param {LimitsChecker} limitsChecker the limits checker the object will use to constrain its movement
     */
    setLimitsChecker(limitsChecker: LimitsChecker): void

    /**
     * Sets the position of the object to the given point
     * @param {Point3D} position the new position of the object
     * @throws {PositionOutOfLimitException} if the new position is out of the limits
     */
    setPosition(position: Point3D): void;

    /**
     * Sets the position of the object to the given coordinates
     * @param {number} x the new x coordinate of the object
     * @param {number} y the new y coordinate of the object
     * @param {number} z the new z coordinate of the object
     * @throws {PositionOutOfLimitException} if the new position is out of the limits
     */
    setPosition(x: number, y: number, z: number): void;

    /**
     * Sets the polar rotation of the object to the given angles
     * @param {Angle} theta the new theta angle of the object
     * @param {Angle} phi the new phi angle of the object
     */
    setPolarRotation(psi: Angle, theta: Angle, phi: Angle): void;

    /**
     * Sets the scale of the object to the given scale
     * @param {NumberTrio} scale the new scale of the object
     */
    setScale(scale: NumberTrio): void;

    /**
     * Sets the scale of the object to the given scale
     * @param {number} x the new x scale of the object
     * @param {number} y the new y scale of the object
     * @param {number} z the new z scale of the object
     */
    setScale(x: number, y: number, z: number): void;

    /**
     * Inits this object to make it drawable with `WebGL`
     * @param {WebGLRenderingContext} gl the *WebGL* context
     */
    glInit(gl: WebGLRenderingContext): void

    /**
     * Draws this object using the given context
     * @param {WebGLRenderingContext} gl the *WebGL* context to use to draw this object
     * @param {object} programInfo the program information object generate by `webgl-util`
     */
    draw(gl: WebGLRenderingContext, programInfo: object): void

    /**
     * Draws this object using the given context, cleaning the scene if required
     * @param {WebGLRenderingContext} gl the *WebGL* context to use to draw this object
     * @param {object} programInfo the program information object generate by `webgl-util`
     * @param {boolean} clear if `true`, the scene will be cleaned before drawing this object
     */
    draw(gl: WebGLRenderingContext, programInfo: object, clear: boolean): void

}