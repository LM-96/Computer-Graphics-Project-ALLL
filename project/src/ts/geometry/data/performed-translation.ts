import {Point3D} from "../point/point-3d";
import {numberTrio, NumberTrio} from "../../types/numbers/number-trio";

export default class PerformedTranslation {

    /**
     * The subject that is translated
     */
    readonly who: string

    /**
     * The position of the subject before the translation
     */
    readonly from: Point3D

    /**
     * The position of the subject after the translation
     */
    readonly to: Point3D

    /**
     * The translation vector that has been applied to the subject at the `from` position
     */
    readonly translationVector: NumberTrio

    constructor(who: string, from: Point3D, to: Point3D, translationVector: NumberTrio = null) {
        this.who = who
        this.from = from
        this.to = to
        if(translationVector == undefined) {
            this.translationVector = numberTrio(to.getX() - from.getX(),
                to.getY() - from.getY(),
                to.getZ() - from.getZ())
        } else {
            this.translationVector = translationVector
        }
    }

    /**
     * Applies the given `block` to this object, then returns this object
     * @param {(translation: PerformedTranslation) => void} block the function to apply to this object
     * @return {PerformedTranslation} this object
     */
    apply(block: (translation: PerformedTranslation) => void): PerformedTranslation {
        block(this)
        return this
    }

    /**
     * Applies the given `block` to this object, then returns the result
     * of the `block` invocation
     * @param {(translation: PerformedTranslation) => R} block the function to apply to this object
     * @return {R} the result of the `block` invocation
     */
    map<R>(block: (translation: PerformedTranslation) => R): R {
        return block(this)
    }
}

export class PerformedTranslationBuilder {
    who: string = undefined
    from: Point3D = undefined
    to: Point3D = undefined
    translationVector: NumberTrio = undefined

    /**
     * Builds a new `PerformedTranslation` object throwing an error if one of the required fields is missing
     * @returns {PerformedTranslation} the built object
     * @throws {Error} if one of the required fields is missing
     */
    build(): PerformedTranslation {
        if(this.who == undefined) {
            throw new Error("The subject of the translation is undefined")
        }
        if(this.from == undefined) {
            throw new Error("The initial position of the translation is undefined")
        }
        if(this.to == undefined) {
            throw new Error("The final position of the translation is undefined")
        }
        return new PerformedTranslation(this.who, this.from, this.to, this.translationVector)
    }

    /**
     * Clears the builder, resetting all the fields to their default value except the `who` field
     * @return {PerformedTranslationBuilder} this builder
     */
    clear(): PerformedTranslationBuilder {
        this.from = undefined
        this.to = undefined
        this.translationVector = undefined
        return this
    }

}