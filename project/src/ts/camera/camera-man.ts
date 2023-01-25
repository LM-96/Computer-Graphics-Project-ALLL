import {Camera} from "./camera";
import {MeshObject} from "../obj/mesh-object";
import {SubscriptionReceipt} from "../signals/subscriptions";
import PerformedTranslation from "../geometry/data/performed-translation";
import {PerformedPolarRotation} from "../geometry/data/performed-polar-rotation";
import {Signal} from "../signals/signal";
import {Point3D} from "../geometry/point/point-3d";
import {MeshObjectDrawer} from "../obj/mesh-object-drawer";
import {handler} from "../signals/options";
import {angle, Angle, AngleUnit} from "../geometry/angle/angle";
import {Log} from "../log/log";

export enum CameraManWorkMode {
    DISMISSED = "DISMISSED", OVER = "OVER", FIRST_PERSON = "FIRST_PERSON", THIRD_PERSON = "THIRD_PERSON"
}

export const CAMERAMAN_WORK_MODES: CameraManWorkMode[] = Object.values(CameraManWorkMode)

export class CameraMan {

    #drawer: MeshObjectDrawer
    #camera: Camera
    #target: MeshObject|null = null
    #translationReceipt: SubscriptionReceipt<MeshObject, PerformedTranslation, void>|null = null
    #rotationReceipt: SubscriptionReceipt<MeshObject, PerformedPolarRotation, any>|null = null
    #workMode: CameraManWorkMode = CameraManWorkMode.DISMISSED
    #high: number = 5
    #distance: number = 50
    #phase: number = 0

    constructor(drawer: MeshObjectDrawer) {
        this.#drawer = drawer
        this.#camera = drawer.getCamera()
    }

    private autoSet(render: boolean = true) {
        switch (this.#workMode) {
            case CameraManWorkMode.OVER:
                this.setOverTarget(render)
                break
            case CameraManWorkMode.FIRST_PERSON:
                this.setFirstPersonTarget(render)
                break
            case CameraManWorkMode.THIRD_PERSON:
                this.setThirdPersonTarget(render)
                break
        }
    }

    private setOverTarget(render: boolean = true) {
        Log.log("CameraMan | setting up over [target: " + this.#target.getName() + "]")
        let targetPosition: Point3D = this.#target.getPosition()
        this.#camera.setPosition(
            targetPosition.getX(),
            targetPosition.getY(),
            targetPosition.getZ() + this.#distance)
        this.#camera.setTarget(
            targetPosition.getX(),
            targetPosition.getY(),
            targetPosition.getZ())
        this.#camera.setUp(1, 0, 0)
        if(render){
            this.#drawer.renderScene()
        }
    }

    private setFirstPersonTarget(render: boolean = true) {
        Log.log("CameraMan | setting up to first person [target: " + this.#target.getName() + "]")
        let targetPosition: Point3D = this.#target.getPosition()
        let phi: number = this.#target.getPolarRotation().getThird().getValueIn(AngleUnit.RAD)
        this.#camera.setPosition(
            targetPosition.getX() + 5* Math.cos(phi + this.#phase),
            targetPosition.getY() + 5* Math.sin(phi + this.#phase),
            targetPosition.getZ() + this.#high)
        this.#camera.setTarget(
            targetPosition.getX() + 10* Math.cos(phi + this.#phase),
            targetPosition.getY() + 10* Math.sin(phi + this.#phase),
            targetPosition.getZ() + this.#high
        )
        this.#camera.setUp(0, 0, 1)
        if(render) {
            this.#drawer.renderScene()
        }
    }

    private setThirdPersonTarget(render: boolean = true) {
        Log.log("CameraMan | setting up to first person [target: " + this.#target.getName() + "]")
        let targetPosition: Point3D = this.#target.getPosition()
        let phi: number = this.#target.getPolarRotation().getThird().getValueIn(AngleUnit.RAD)
        this.#camera.setPosition(
            targetPosition.getX() - this.#distance* Math.cos(phi + this.#phase),
            targetPosition.getY() - this.#distance* Math.sin(phi + this.#phase),
            targetPosition.getZ() + this.#high)
        this.#camera.setTarget(
            targetPosition.getX() + 10 * Math.cos(phi + this.#phase),
            targetPosition.getY() + 10 * Math.sin(phi + this.#phase),
            targetPosition.getZ() + this.#high)
        this.#camera.setUp(0, 0, 1)
        if(render) {
            this.#drawer.renderScene()
        }
    }

    #watchingOverObject(_: Signal<MeshObject, PerformedTranslation, void>) {
        if(this.#target != null) {
            this.setOverTarget(true)
        }
    }

    #watchingFirstPersonTranslation(_: Signal<MeshObject, PerformedTranslation, void>) {
        if(this.#target != null) {
            this.setFirstPersonTarget(true)
        }
    }

    #watchingFirstPersonRotation(_: Signal<MeshObject, PerformedPolarRotation, void>) {
        if(this.#target != null) {
            this.setFirstPersonTarget(true)
        }
    }

    #watchingThirdPersonTranslation(_: Signal<MeshObject, PerformedTranslation, void>) {
        if(this.#target != null) {
            this.setThirdPersonTarget(true)
        }
    }

    #watchingThirdPersonRotation(_: Signal<MeshObject, PerformedPolarRotation, void>) {
        if(this.#target != null) {
            this.setThirdPersonTarget(true)
        }
    }

    /**
     * Hire the cameraman with the given `mode`.
     * If the cameraman was already hired with a different mode, this method will
     * change it to the desired one. If the work mode is the same as the one currently in use,
     * this method will do nothing.
     * @param {CameraManWorkMode} mode the mode
     */
    hire(mode: CameraManWorkMode) {
        if(this.#workMode != null) {
            this.dismiss()
        }
        if(this.#workMode == mode) {
            return
        }
        Log.log("CameraMan | hiring with mode " + mode + " [target: " + this.#target.getName() + "]")
        switch (mode) {
            case CameraManWorkMode.OVER: {
                this.#translationReceipt = this.#target
                    .getTranslationSubscriber()
                    .subscribe(handler((signal) => this.#watchingOverObject(signal)))
                this.setOverTarget(true)
                Log.log("CameraMan | hired with mode " + mode + " [target: " + this.#target.getName() +
                    ", translation subscriptionId: + " + this.#translationReceipt.subscriptionId + "]")
                break;
            }
            case CameraManWorkMode.FIRST_PERSON: {
                this.#translationReceipt = this.#target
                    .getTranslationSubscriber()
                    .subscribe(handler((signal) => this.#watchingFirstPersonTranslation(signal)))
                this.#rotationReceipt = this.#target
                    .getPolarRotationSubscriber()
                    .subscribe(handler((signal) => this.#watchingFirstPersonRotation(signal)))
                this.setFirstPersonTarget(true)
                Log.log("CameraMan | hired with mode " + mode + " [target: " + this.#target.getName() +
                    ", translation subscriptionId: + " + this.#translationReceipt.subscriptionId +
                    ", rotation subscriptionId: + " + this.#rotationReceipt.subscriptionId + "]")
                break;
            }
            case CameraManWorkMode.THIRD_PERSON: {
                this.#translationReceipt = this.#target
                    .getTranslationSubscriber()
                    .subscribe(handler((signal) => this.#watchingThirdPersonTranslation(signal)))
                this.#rotationReceipt = this.#target
                    .getPolarRotationSubscriber()
                    .subscribe(handler((signal) => this.#watchingThirdPersonRotation(signal)))
                this.setThirdPersonTarget(true)
                Log.log("CameraMan | hired with mode " + mode + " [target: " + this.#target.getName() +
                    ", translation subscriptionId: + " + this.#translationReceipt.subscriptionId +
                    ", rotation subscriptionId: + " + this.#rotationReceipt.subscriptionId + "]")
                break;
            }
        }

        this.#workMode = mode
    }

    /**
     * Dismiss the cameramen stopping his work.
     * The camera will not be touched anymore from the camera man after this call
     */
    dismiss() {
        Log.log("CameraMan | dismissing [current work mode: " + this.#workMode + "]")
        if(this.#translationReceipt != null) {
            this.#target.getTranslationSubscriber().unsubscribe(this.#translationReceipt)
            this.#translationReceipt = null
        }
        if(this.#rotationReceipt != null) {
            this.#target.getTranslationSubscriber().unsubscribe(this.#rotationReceipt)
            this.#rotationReceipt = null
        }
        this.#workMode = CameraManWorkMode.DISMISSED
    }

    /**
     * Set the target object the camera man has to follow.
     * If the cameramen is already working, it will dismiss the current work
     * and start following the new target with the same work mode
     * @param {MeshObject} target the target object
     */
    setTarget(target: MeshObject) {
        if(this.#workMode != null) {
            if(this.#target != target) {
                this.dismiss()
                this.#target = target
                this.hire(this.#workMode)
            }
        } else {
            this.#target = target
        }
    }

    isWorking(): boolean {
        return this.#workMode != CameraManWorkMode.DISMISSED
    }

    getTarget(): MeshObject|null {
        return this.#target
    }

    hasTarget(): boolean {
        return this.#target !== null
    }

    setHigh(high: number, renderIfWorking: boolean = true) {
        this.#high = high
        if(this.isWorking()) {
            this.autoSet(renderIfWorking)
        }
    }

    getHigh(): number {
        return this.#high
    }

    getCurrentWorkMode(): CameraManWorkMode {
        return this.#workMode
    }

    setPhase(angle: Angle) {
        this.#phase = angle.getValueIn(AngleUnit.RAD)
    }

    setDistance(distance: number, renderIfWorking: boolean = true) {
        this.#distance = distance
        if(this.isWorking()) {
            this.autoSet(renderIfWorking)
        }
    }

    getDistance(): number {
        return this.#distance
        this.autoSet(true)
    }

}