import {Couple, coupleOf} from "../../types/pair";
import {Angle} from "../angle/angle";

export class PerformedPolarRotation {

    /**
     * The subject that is rotated
     */
    readonly who: string

    /**
     * The polar angles of the subject before the rotation
     */
    readonly from: Couple<Angle>

    /**
     * The polar angles of the subject after the rotation
     */
    readonly to: Couple<Angle>

    /**
     * The delta of the rotation that has been applied to the subject at the `from` rotation
     */
    readonly delta: Couple<Angle>

    constructor(who: string, from: Couple<Angle>, to: Couple<Angle>, delta: Couple<Angle> = null) {
        this.who = who
        this.from = from
        this.to = to
        if(delta == undefined) {
            this.delta = coupleOf<Angle>(to.getFirst().clone().subtract(from.getFirst()),
                to.getSecond().clone().subtract(from.getSecond()))
        } else {
            this.delta = delta
        }
    }

    /**
     * Applies the given `block` to this object, then returns this object
     * @param {(translation: PerformedPolarRotation) => void} block the function to apply to this object
     * @return {PerformedPolarRotation} this object
     */
    apply(block: (translation: PerformedPolarRotation) => void): PerformedPolarRotation {
        block(this)
        return this
    }

    /**
     * Applies the given `block` to this object, then returns the result
     * of the `block` invocation
     * @param {(translation: PerformedPolarRotation) => R} block the function to apply to this object
     * @return {R} the result of the `block` invocation
     */
    map<R>(block: (translation: PerformedPolarRotation) => R): R {
        return block(this)
    }
}

export class PerformedPolarRotationBuilder {

    who: string = undefined
    from: Couple<Angle> = undefined
    to: Couple<Angle> = undefined
    delta: Couple<Angle> = undefined

    /**
     * Builds a new `PerformedPolarRotation` object throwing an error if one of the required fields is missing
     * @returns {PerformedPolarRotation} the built object
     * @throws {Error} if one of the required fields is missing
     */
    build(): PerformedPolarRotation {
        if (this.who == undefined) {
            throw new Error("The subject of the rotation is not defined")
        }
        if (this.from == undefined) {
            throw new Error("The initial rotation of the subject is not defined")
        }
        if (this.to == undefined) {
            throw new Error("The final rotation of the subject is not defined")
        }
        return new PerformedPolarRotation(this.who, this.from, this.to, this.delta)
    }

    /**
     * Clears the builder, setting all the fields to `undefined` except the `who` field
     * @returns {PerformedPolarRotationBuilder} this builder
     */
    clear(): PerformedPolarRotationBuilder {
        this.from = undefined
        this.to = undefined
        this.delta = undefined
        return this
    }
}