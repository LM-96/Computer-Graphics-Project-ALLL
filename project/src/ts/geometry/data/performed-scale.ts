import {numberTrio, NumberTrio} from "../../types/numbers/number-trio";

export default class PerformedScale {

    /**
     * The subject that is scaled
     */
    readonly who: string

    /**
     * The scale factors of the subject before the scaling
     */
    readonly from: NumberTrio

    /**
     * The scale factors of the subject after the scaling
     */
    readonly to: NumberTrio

    /**
     * The coefficients of the scaling that has been applied to the subject at the `from` scale
     */
    readonly coefficients: NumberTrio

    constructor(who: string, from: NumberTrio, to: NumberTrio, coefficients: NumberTrio = null) {
        this.who = who
        this.from = from
        this.to = to
        if(coefficients == undefined) {
            this.coefficients = numberTrio(to.getFirst() / from.getFirst(),
                to.getSecond() / from.getSecond(),
                to.getThird() / from.getThird())
        } else {
            this.coefficients = coefficients
        }
    }

    /**
     * Applies the given `block` to this object, then returns this object
     * @param {(translation: PerformedScale) => void} block the function to apply to this object
     * @return {PerformedScale} this object
     */
    apply(block: (translation: PerformedScale) => void): PerformedScale {
        block(this)
        return this
    }

    /**
     * Applies the given `block` to this object, then returns the result
     * of the `block` invocation
     * @param {(translation: PerformedTranslation) => R} block the function to apply to this object
     * @return {R} the result of the `block` invocation
     */
    map<R>(block: (translation: PerformedScale) => R): R {
        return block(this)
    }
}

export class PerformedScaleBuilder {

    who: string = undefined
    from: NumberTrio = undefined
    to: NumberTrio = undefined
    coefficients: NumberTrio = undefined

    /**
     * Builds a new `PerformedScale` object throwing an error if one of the required fields is missing
     * @returns {PerformedScale} the built `PerformedScale` object
     * @throws {Error} if one of the required fields is missing
     */
    build(): PerformedScale {
        if(this.who == undefined) {
            throw new Error("The subject of the scaling is not defined")
        }
        if(this.from == undefined) {
            throw new Error("The scale factors of the subject before the scaling are not defined")
        }
        if(this.to == undefined) {
            throw new Error("The scale factors of the subject after the scaling are not defined")
        }
        return new PerformedScale(this.who, this.from, this.to, this.coefficients)
    }

    /**
     * Clears the builder, setting all the fields to `undefined` except the `who` field
     * @returns {PerformedScaleBuilder} this builder
     */
    clear(): PerformedScaleBuilder {
        this.from = undefined
        this.to = undefined
        this.coefficients = undefined
        return this
    }
}