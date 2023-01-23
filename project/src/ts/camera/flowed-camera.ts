import {numberTrio, NumberTrio} from "../types/numbers/number-trio";
import {Point3D} from "../geometry/point/point-3d";
import {Angle, degree} from "../geometry/angle/angle";
import {mutablePoint3D} from "../geometry/point/point-factory";
import SignalFlows, {SingleSignalFlow} from "../signals/flow";
import {Camera} from "./camera";
import PerformedTranslation, {PerformedTranslationBuilder} from "../geometry/data/performed-translation";
import {PerformedNumberTrioChange} from "../types/data/performed-number-trio-change";
import {PerformedObjectSet} from "../types/data/performed-object-set";
import {MeshObject} from "../obj/mesh-object";
import {SingleSignalSubscriber, SubscriptionReceipt} from "../signals/subscriptions";
import CameraSignals from "./camera-signals";
import {Signal} from "../signals/signal";
import {MeshObjectSignals} from "../obj/mesh-object-signals";
import {handler} from "../signals/options";

export default class FlowedCamera implements Camera {
    #position: Point3D;
    #up: NumberTrio;
    #target: Point3D;
    #fov: Angle;
    #lookingAtObject: boolean
    #followObjectTranslation: boolean
    #targetObject: MeshObject|null

    #lookingAtObjectReceipt: SubscriptionReceipt<MeshObject, PerformedTranslation, void>

    readonly #positionFlow: SingleSignalFlow<Camera, PerformedTranslation, void>
    readonly #upFlow: SingleSignalFlow<Camera, PerformedNumberTrioChange, void>
    readonly #targetFlow: SingleSignalFlow<Camera, PerformedObjectSet<Point3D>, void>
    readonly #fovFlow: SingleSignalFlow<Camera, PerformedObjectSet<Angle>, void>
    readonly #lookingAtObjectFlow: SingleSignalFlow<Camera, PerformedObjectSet<boolean>, void>
    readonly #followObjectTranslationFlow: SingleSignalFlow<Camera, PerformedObjectSet<boolean>, void>
    readonly #followedObjectFlow: SingleSignalFlow<Camera, PerformedObjectSet<MeshObject|null>, void>
    readonly #lookedAtObjectFlow: SingleSignalFlow<Camera, PerformedObjectSet<MeshObject|null>, void>
    readonly #performedTranslationBuilder: PerformedTranslationBuilder

    #lookAtObjectReceipt: SubscriptionReceipt<MeshObject, PerformedTranslation, void>|null = null
    #followObjectReceipt: SubscriptionReceipt<MeshObject, PerformedTranslation, void> = null
    
    constructor() {
        this.#position = mutablePoint3D(1, 1, 1);
        this.#up = numberTrio(0, 0, 1);
        this.#target = mutablePoint3D(0, 0, 0);
        this.#fov = degree(60)
        this.#lookingAtObject = false
        this.#followObjectTranslation = false
        this.#targetObject = null
        
        this.#positionFlow = SignalFlows.newSingleFlow(CameraSignals.CAMERA_TRANSLATION_SIGNAL_STRING_NAME)
        this.#upFlow = SignalFlows.newSingleFlow(CameraSignals.CAMERA_UP_SIGNAL_STRING_NAME)
        this.#targetFlow = SignalFlows.newSingleFlow(CameraSignals.CAMERA_TARGET_SIGNAL_STRING_NAME)
        this.#fovFlow = SignalFlows.newSingleFlow(CameraSignals.CAMERA_FOV_SIGNAL_STRING_NAME)
        this.#lookingAtObjectFlow = SignalFlows.newSingleFlow(CameraSignals.CAMERA_LOOKING_AT_OBJECT_SIGNAL_STRING_NAME)
        this.#followObjectTranslationFlow = SignalFlows.newSingleFlow(CameraSignals.CAMERA_FOLLOW_OBJECT_TRANSLATION_SIGNAL_STRING_NAME)
        this.#followedObjectFlow = SignalFlows.newSingleFlow(CameraSignals.CAMERA_TARGET_OBJECT_SIGNAL_STRING_NAME)
        this.#lookedAtObjectFlow = SignalFlows.newSingleFlow(CameraSignals.CAMERA_LOOKED_AT_OBJECT_SIGNAL_STRING_NAME)

        this.#performedTranslationBuilder = new PerformedTranslationBuilder()
        this.#performedTranslationBuilder.who = "camera"
    }

    lookAtObject(signal: Signal<MeshObject, PerformedTranslation, void>): void {
        this.setTarget(signal.data.to)
    }

    followObject(signal: Signal<MeshObject, PerformedTranslation, void>): void {
        let translationVector: NumberTrio = signal.data.translationVector
        this.setPosition(
            this.#position.getX() + translationVector.getFirst(),
            this.#position.getY() + translationVector.getSecond(),
            this.#position.getZ() + translationVector.getThird()
        )
    }

    calculateCameraMatrix(): number[] {
        return M4.lookAt(this.#position.toArray(), this.#target.toArray(), this.#up.toArray());
    }

    getCameraPositionSubscriber(): SingleSignalSubscriber<Camera, PerformedTranslation, void> {
        return this.#positionFlow;
    }

    getCurrentDistanceFromTarget(): NumberTrio {
        return numberTrio(
    this.#position.getX() - this.#target.getX(),
    this.#position.getY() - this.#target.getY(),
    this.#position.getZ() - this.#target.getZ()
        );
    }

    getCurrentFov(): Angle {
        return this.#fov.clone()
    }

    getCurrentPosition(): Point3D {
        return this.#position.frozen(false)
    }

    getCurrentTarget(): Point3D {
        return this.#target.frozen(false)
    }

    getCurrentUp(): NumberTrio {
        return this.#up.clone()
    }

    getFollowedObject(): MeshObject | null {
        if(this.#followObjectTranslation) {
            return this.#targetObject
        }
        return null
    }

    getFollowedObjectSubscriber(): SingleSignalSubscriber<Camera, PerformedObjectSet<MeshObject | null>, void> {
        return this.#followedObjectFlow;
    }

    getFollowingObjectSubscriber(): SingleSignalSubscriber<Camera, PerformedObjectSet<boolean>, void> {
        return this.#followObjectTranslationFlow;
    }

    getFovSubscriber(): SingleSignalSubscriber<Camera, PerformedObjectSet<Angle>, void> {
        return this.#fovFlow;
    }

    getLookedObject(): MeshObject {
        if(this.#lookingAtObject) {
            return this.#targetObject
        }
        return null
    }

    getLookedObjectSubscriber(): SingleSignalSubscriber<Camera, PerformedObjectSet<MeshObject | null>, void> {
        return this.#lookedAtObjectFlow;
    }

    getLookingAtObjectSubscriber(): SingleSignalSubscriber<Camera, PerformedObjectSet<boolean>, void> {
        return undefined;
    }

    getTargetSubscriber(): SingleSignalSubscriber<Camera, PerformedObjectSet<Point3D>, void> {
        return this.#targetFlow;
    }

    getUpSubscriber(): SingleSignalSubscriber<Camera, PerformedNumberTrioChange, void> {
        return this.#upFlow;
    }

    isFollowingObjectTranslation(): boolean {
        return this.#followObjectTranslation
    }

    isLookingAtObject(): boolean {
        return this.#lookingAtObject;
    }

    setDistanceFromTarget(distanceFromTarget: NumberTrio): void;
    setDistanceFromTarget(x: number, y: number, z: number): void;
    setDistanceFromTarget(distanceFromTarget: NumberTrio | number, y?: number, z?: number): void {
        if (typeof distanceFromTarget === "number") {
            this.#position.set(
                this.#target.getX() + distanceFromTarget,
                this.#target.getY() + y,
                this.#target.getZ() + z
            )
        } else {
            this.#position.set(
                this.#target.getX() + distanceFromTarget.getFirst(),
                this.#target.getY() + distanceFromTarget.getSecond(),
                this.#target.getZ() + distanceFromTarget.getThird()
            )
        }
    }

    setFov(fov: Angle): void {
        let oldFov = this.#fov.clone()
        this.#fov = fov
        this.#fovFlow.fire(this, new PerformedObjectSet(oldFov, this.#fov))
    }

    setPosition(position: Point3D): void;
    setPosition(x: number, y: number, z: number): void;
    setPosition(position: Point3D | number, y?: number, z?: number): void {
        this.#performedTranslationBuilder.clear()
        this.#performedTranslationBuilder.from = this.#position.clone()
        if (typeof position === "number") {
            this.#position.set(position, y, z)
        } else {
            this.#position.set(position.getX(), position.getY(), position.getZ())
        }
        this.#performedTranslationBuilder.to = this.#position.clone()
        this.#positionFlow.fire(this, this.#performedTranslationBuilder.build())
    }

    setTarget(target: Point3D): void;
    setTarget(x: number, y: number, z: number): void;
    setTarget(target: Point3D | number, y?: number, z?: number): void {
        let oldTarget = this.#target.clone()
        if (typeof target === "number") {
            this.#target.set(target, y, z)
        } else {
            this.#target.set(target.getX(), target.getY(), target.getZ())
        }
        this.#targetFlow.fire(this, new PerformedObjectSet(oldTarget, this.#target))
    }

    setUp(up: NumberTrio): void;
    setUp(x: number, y: number, z: number): void;
    setUp(up: NumberTrio | number, y?: number, z?: number): void {
        let oldUp = this.#up.clone()
        if (typeof up === "number") {
            this.#up.setAll(up, y, z)
        } else {
            this.#up.setAll(up.getFirst(), up.getSecond(), up.getThird())
        }
        this.#upFlow.fire(this, new PerformedNumberTrioChange(oldUp, this.#up))
    }

    startFollowingObject(obj: MeshObject): void {

        if(this.#followObjectTranslation) {
            this.stopFollowingObject()
        }

        let oldObject = this.#targetObject
        this.#targetObject = obj
        let oldFollowObjectTranslation = this.#followObjectTranslation

        if(!this.#lookingAtObject || (this.#lookingAtObject && this.#targetObject !== oldObject)) {
            this.startLookingAtObject(obj)
        }

        this.#followObjectTranslation = true

        this.#followObjectReceipt = MeshObjectSignals
            .getTranslationSubscriberOf(this.#targetObject)
            .subscribe(handler((signal) => {this.followObject(signal)}))

        this.#followedObjectFlow.fire(this, new PerformedObjectSet(oldObject, this.#targetObject))
        this.#followObjectTranslationFlow.fire(this,
            new PerformedObjectSet(oldFollowObjectTranslation, this.#followObjectTranslation))
    }

    startLookingAtObject(obj: MeshObject): void {

        if(this.#lookingAtObject) {
            this.stopLookingAtObject()
        }

        let oldObject = this.#targetObject
        let oldLookingAtObject = this.#lookingAtObject
        this.#targetObject = obj
        this.#lookingAtObject = true

        this.#lookAtObjectReceipt = MeshObjectSignals
            .getTranslationSubscriberOf(this.#targetObject)
            .subscribe(handler((signal) => {this.lookAtObject(signal)}))

        this.#lookedAtObjectFlow.fire(this, new PerformedObjectSet(oldObject, this.#targetObject))
        this.#lookingAtObjectFlow.fire(this, new PerformedObjectSet(oldLookingAtObject, this.#lookingAtObject))
    }

    stopFollowingObject(): void {
        if(this.#followObjectTranslation == true) {
            let oldFollowObjectTranslation = this.#followObjectTranslation

            MeshObjectSignals
                .getTranslationSubscriberOf(this.#targetObject)
                .unsubscribe(this.#followObjectReceipt)
            this.#followObjectReceipt = null

            this.#followObjectTranslation = false
            this.#followObjectTranslationFlow.fire(this,
                new PerformedObjectSet(oldFollowObjectTranslation, this.#followObjectTranslation))
        }

    }

    stopLookingAtObject(): void {
        if(this.#lookingAtObject) {
            if(this.#followObjectTranslation) {
                this.stopFollowingObject()
            }

            MeshObjectSignals
                .getTranslationSubscriberOf(this.#targetObject)
                .unsubscribe(this.#lookAtObjectReceipt)
            this.#lookAtObjectReceipt = null

            let oldLookingAtObject = this.#lookingAtObject
            this.#lookingAtObject = false
            this.#lookingAtObjectFlow.fire(this, new PerformedObjectSet(oldLookingAtObject, this.#lookingAtObject))
        }
    }


}