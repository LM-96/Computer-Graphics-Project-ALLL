import {
    NotifiableMeshObjCallbackContainer,
    RotationCallback,
    ScaleCallback,
    TranslationCallback
} from "./mesh-obj-callbacks";
import {Arrays} from "../types/arrays";
import { Angle } from "../geometry/angle/angle";
import { Point3D } from "../geometry/point/point-3d";
import { NumberTrio } from "../types/numbers/number-trio";
import { Couple } from "../types/pair";

export class ArrayMeshObjectCallbackContainer implements NotifiableMeshObjCallbackContainer {

    #onTranslation: Array<TranslationCallback> = new Array<TranslationCallback>()
    #onRotation: Array<RotationCallback> = new Array<RotationCallback>()
    #onScale: Array<ScaleCallback> = new Array<ScaleCallback>()

    addOnRotation(block: RotationCallback): void {
        this.#onRotation.push(block)
    }

    addOnScaled(block: ScaleCallback): void {
        this.#onScale.push(block)
    }

    addOnTranslation(block: TranslationCallback): void {
        this.#onTranslation.push(block)
    }

    removeOnRotation(block: RotationCallback): void {
        Arrays.removeFrom(this.#onRotation, block)
    }

    removeOnScaled(block: ScaleCallback): void {
        Arrays.removeFrom(this.#onScale, block)
    }

    removeOnTranslation(block: TranslationCallback): void {
        Arrays.removeFrom(this.#onTranslation, block)
    }

    notifyTranslation(oldPosition: Point3D, delta: NumberTrio, newPosition: Point3D): void {
        for(let callback of this.#onTranslation)
            callback(oldPosition, delta, newPosition)
    }

    notifyRotation(startRotation: Couple<Angle>, delta: Couple<Angle>, endRotation: Couple<Angle>): void {
        for(let callback of this.#onRotation)
            callback(startRotation, delta, endRotation)
    }

    notifyScale(startScale: NumberTrio, delta: NumberTrio, endScale: NumberTrio): void {
        for(let callback of this.#onScale)
            callback(startScale, delta, endScale)
    }
}