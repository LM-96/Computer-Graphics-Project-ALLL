import {NumberTrio} from "../types/numbers/number-trio";
import {Point3D} from "../geometry/point/point-3d";
import {Angle} from "../geometry/angle/angle";
import {MeshObject} from "../obj/mesh-object";
import {SingleSignalSubscriber} from "../signals/subscriptions";
import PerformedTranslation from "../geometry/data/performed-translation";
import {PerformedObjectSet} from "../types/data/performed-object-set";
import {PerformedNumberTrioChange} from "../types/data/performed-number-trio-change";

export interface Camera {

    /**
     * Returns a copy of the camera's position
     */
    getCurrentPosition(): Point3D;

    /**
     * Returns a copy of the camera's up vector
     */
    getCurrentUp(): NumberTrio;

    /**
     * Returns a copy of the camera's target
     */
    getCurrentTarget(): Point3D;

    /**
     * Returns a copy of the camera's field of view
     */
    getCurrentFov(): Angle;

    /**
     * Returns a copy of the camera's distance from the target
     */
    getCurrentDistanceFromTarget(): NumberTrio;

    /**
     * Returns whether the camera is looking at an object
     */
    isLookingAtObject(): boolean;

    /**
     * Returns whether the camera is following the translation of an object
     */
    isFollowingObjectTranslation(): boolean;

    /**
     * Sets the camera's position to the given point
     * @param {Point3D} position the new position
     */
    setPosition(position: Point3D): void;

    /**
     * Sets the camera's position to the given coordinates
     * @param {number} x the new x coordinate
     * @param {number} y the new y coordinate
     * @param {number} z the new z coordinate
     */
    setPosition(x: number, y: number, z: number): void;

    /**
     * Sets the camera's up vector to the given vector
     * @param {NumberTrio} up the new up vector
     */
    setUp(up: NumberTrio): void;

    /**
     * Sets the camera's up vector to the given coordinates
     * @param {number} x the new x coordinate
     * @param {number} y the new y coordinate
     * @param {number} z the new z coordinate
     */
    setUp(x: number, y: number, z: number): void;

    /**
     * Sets the camera's field of view to the given angle
     * @param {Angle} fov the new field of view
     */
    setFov(fov: Angle): void;

    /**
     * Sets the target of the camera to the given point.
     * If the camera is looking at an object, when the object is moved, the camera will follow it again
     * @param {Point3D} target the new target
     */
    setTarget(target: Point3D): void;

    /**
     * Sets the target of the camera to the given coordinates.
     * If the camera is looking at an object, when the object is moved, the camera will follow it again
     * @param {number} x the new x coordinate
     * @param {number} y the new y coordinate
     * @param {number} z the new z coordinate
     */
    setTarget(x: number, y: number, z: number): void;

    /**
     * Sets the position of the camera to the given distance from the target
     * @param {NumberTrio} distanceFromTarget the distance from target
     */
    setDistanceFromTarget(distanceFromTarget: NumberTrio): void;

    /**
     * Sets the distance from the target of the camera to the given coordinates
     * @param {number} x the new x coordinate
     * @param {number} y the new y coordinate
     * @param {number} z the new z coordinate
     */
    setDistanceFromTarget(x: number, y: number, z: number): void;

    /**
     * Makes the camera look at the given object until `stopLookingAtObject()` is called.
     * If the object is moved, the camera will continue to look at it, automatically updating its target
     * and distance from target
     * @param {MeshObject} obj the object to look at
     */
    startLookingAtObject(obj: MeshObject): void;

    /**
     * Makes the camera stop looking at the object it is currently looking at.
     * The target of the camera will be set to the current object's position, but it will not
     * follow the object's translation (same for the distance from target)
     */
    stopLookingAtObject(): void;

    /**
     * Returns the object the camera is currently looking at, or null if it is not looking at any object.
     * If this camera is also *following* the object, this method will return the same object as
     * `getFollowedObject()`
     */
    getLookedObject(): MeshObject|null;

    /**
     * Makes the camera follow the translation of the given object until
     * `stopFollowingObjectTranslation()` is called.
     * When the camera is following an object, the distance from target will be fixed and will not
     * change when the object is moved (but the position of the camera will change).
     * This method is a *super set* of `startLookingAtObject()`, so if you call this method, the camera
     * will be looking at the object, and will also follow its translation
     */
    startFollowingObject(obj: MeshObject): void;

    /**
     * Makes the camera stop following the translation of the object it is currently following.
     * The target of the camera will be set to the current object's position, but it will not
     * follow the object's translation (same for the distance from target)
     */
    stopFollowingObject(): void;

    /**
     * Returns the object the camera is currently following, or null if it is not following any object
     * @returns {MeshObject} the object the camera is currently following, or null if it is not following any object
     */
    getFollowedObject(): MeshObject|null;

    /**
     * Returns the subscriber for the signal that is fired when the camera's position changes
     * @returns {SingleSignalSubscriber<PerformedTranslation>} the subscriber for the signal
     * that is fired when the camera's position changes
     */
    getCameraPositionSubscriber(): SingleSignalSubscriber<Camera, PerformedTranslation, void>

    /**
     * Returns the subscriber for the signal that is fired when the camera's up vector changes
     * @returns {SingleSignalSubscriber<PerformedNumberTrioChange>} the subscriber for the signal
     * that is fired when the camera's up vector changes
     */
    getUpSubscriber(): SingleSignalSubscriber<Camera, PerformedNumberTrioChange, void>

    /**
     * Returns the subscriber for the signal that is fired when the camera's target changes
     * @returns {SingleSignalSubscriber<PerformedObjectSet<Point3D>>} the subscriber for the signal
     * that is fired when the camera's target changes
     */
    getTargetSubscriber(): SingleSignalSubscriber<Camera, PerformedObjectSet<Point3D>, void>

    /**
     * Returns the subscriber for the signal that is fired when the camera's field of view changes
     * @returns {SingleSignalSubscriber<PerformedObjectSet<Angle>>} the subscriber for the signal
     * that is fired when the camera's field of view changes
     */
    getFovSubscriber(): SingleSignalSubscriber<Camera, PerformedObjectSet<Angle>, void>

    /**
     * Returns the subscriber for the signal that is fired when the camera starts or stops looking at an object
     * @returns {SingleSignalSubscriber<PerformedObjectSet<boolean>>} the subscriber for the signal
     * that is fired when the camera starts or stops looking at an object
     */
    getLookingAtObjectSubscriber(): SingleSignalSubscriber<Camera, PerformedObjectSet<boolean>, void>

    /**
     * Returns the subscriber for the signal that is fired when the camera starts or stops following an object
     * @returns {SingleSignalSubscriber<PerformedObjectSet<boolean>>} the subscriber for the signal
     * that is fired when the camera starts or stops following an object
     */
    getFollowingObjectSubscriber(): SingleSignalSubscriber<Camera, PerformedObjectSet<boolean>, void>

    /**
     * Returns the subscriber for the signal that is fired when the object the camera is looking at is changed
     * @returns {SingleSignalSubscriber<PerformedObjectSet<MeshObject>>} the subscriber for the signal
     * that is fired when the object the camera is looking at is changed
     */
    getLookedObjectSubscriber(): SingleSignalSubscriber<Camera, PerformedObjectSet<MeshObject|null>, void>

    /**
     * Returns the subscriber for the signal that is fired when the object the camera has to follow is changed
     * @returns {SingleSignalSubscriber<PerformedObjectSet<MeshObject>>} the subscriber for the signal
     * that is fired when the object the camera has to follow is changed
     */
    getFollowedObjectSubscriber(): SingleSignalSubscriber<Camera, PerformedObjectSet<MeshObject|null>, void>

    /**
     * Calculates the camera matrix for `WebGL`
     */
    calculateCameraMatrix(): number[]

}