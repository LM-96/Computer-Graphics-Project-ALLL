import {Camera} from "./camera";
import {MeshObject} from "../obj/mesh-object";
import {SubscriptionReceipt} from "../signals/subscriptions";
import PerformedTranslation from "../geometry/data/performed-translation";
import {PerformedPolarRotation} from "../geometry/data/performed-polar-rotation";
import {Signal} from "../signals/signal";
import {Point3D} from "../geometry/point/point-3d";
import {MeshObjectDrawer} from "../obj/mesh-object-drawer";
import {handler} from "../signals/options";

enum CameraManWorkMode {
    OVER = 0
}

class CameraMan {

    #drawer: MeshObjectDrawer
    #camera: Camera
    #target: MeshObject|null = null
    #translationReceipt: SubscriptionReceipt<MeshObject, PerformedTranslation, void>|null = null
    #rotationReceipt: SubscriptionReceipt<MeshObject, PerformedPolarRotation, any>|null = null
    #workMode: CameraManWorkMode|null = null
    #hight: number = 0

    constructor(drawer: MeshObjectDrawer) {
        this.#camera = drawer.getCamera()
        this.#drawer = drawer
    }

    #watchingOverObject(signal: Signal<MeshObject, PerformedTranslation, void>) {
        if(this.#target != null) {
            let targetPosition: Point3D = this.#target.getPosition()
            this.#camera.setPosition(
                targetPosition.getY(),
                targetPosition.getY(),
                targetPosition.getZ() + this.getHigh())
            this.#drawer.renderScene()
        }
    }

    /**
     * Hire the cameraman with the given `mode`.
     * @param mode
     */
    hire(mode: CameraManWorkMode) {
        if(this.#workMode != null) {
            this.dismiss()
        }


        switch (mode) {
            case CameraManWorkMode.OVER: {
                this.#translationReceipt = this.#target
                    .getTranslationSubscriber()
                    .subscribe(handler((signal) => this.#watchingOverObject(signal)))
            }
        }

        this.#workMode = mode
    }

    /**
     * Dismiss the cameramen stopping his work.
     * The camera will not be touched anymore from the camera man after this call
     */
    dismiss() {
        if(this.#translationReceipt != null) {
            this.#target.getTranslationSubscriber().unsubscribe(this.#translationReceipt)
            this.#translationReceipt = null
        }
        if(this.#rotationReceipt != null) {
            this.#target.getTranslationSubscriber().unsubscribe(this.#rotationReceipt)
            this.#rotationReceipt = null
        }
        this.#workMode = null
    }

    /**
     * Set the target object the camera man has to follow.
     * If the cameramen is already working, it will dismiss the current work
     * and start following the new target with the same work mode
     * @param {MeshObject} target the target object
     */
    setTarget(target: MeshObject) {
        if(this.#workMode != null) {
            this.dismiss()
            this.#target = target
            this.hire(this.#workMode)
        } else {
            this.#target = target
        }
    }

    getTarget(): MeshObject|null {
        return this.#target
    }

    hasTarget(): boolean {
        return this.#target !== null
    }

    setHigh(high: number) {
        this.#hight = high
    }

    getHigh(): number {
        return this.#hight
    }

}