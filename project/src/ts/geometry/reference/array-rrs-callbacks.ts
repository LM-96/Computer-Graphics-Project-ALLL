import {RotationCallback, DilationCallback, TranslationCallback} from "./rrs-callbacks";
import {Arrays} from "../../types/arrays";
import {Point3D} from "../point/point-3d";
import {NumberTrio} from "../../types/numbers/number-trio";
import {Couple} from "../../types/pair";
import {Angle} from "../angle/angle";

export class ArrayRRSCallbackContainer {
    #onTranslation: Array<TranslationCallback> = new Array<TranslationCallback>()
    #onRotation: Array<RotationCallback> = new Array<RotationCallback>()
    #onDilation: Array<DilationCallback> = new Array<DilationCallback>()

    addOnRotation(block: RotationCallback): void {
        this.#onRotation.push(block)
    }

    addOnDilation(block: DilationCallback): void {
        this.#onDilation.push(block)
    }

    addOnTranslation(block: TranslationCallback): void {
        this.#onTranslation.push(block)
    }

    removeOnRotation(block: RotationCallback): void {
        Arrays.removeFrom(this.#onRotation, block)
    }

    removeOnDilation(block: DilationCallback): void {
        Arrays.removeFrom(this.#onDilation, block)
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
        for(let callback of this.#onDilation)
            callback(startScale, delta, endScale)
    }
}