"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformedPolarRotationBuilder = exports.PerformedPolarRotation = void 0;
const triple_1 = require("../../types/triple");
class PerformedPolarRotation {
    constructor(who, from, to, delta = null) {
        this.who = who;
        this.from = from;
        this.to = to;
        if (delta == undefined) {
            this.delta = (0, triple_1.trioOf)(to.getFirst().clone().subtract(from.getFirst()), to.getSecond().clone().subtract(from.getSecond()), to.getThird().clone().subtract(from.getThird()));
        }
        else {
            this.delta = delta;
        }
    }
    /**
     * Applies the given `block` to this object, then returns this object
     * @param {(translation: PerformedPolarRotation) => void} block the function to apply to this object
     * @return {PerformedPolarRotation} this object
     */
    apply(block) {
        block(this);
        return this;
    }
    /**
     * Applies the given `block` to this object, then returns the result
     * of the `block` invocation
     * @param {(translation: PerformedPolarRotation) => R} block the function to apply to this object
     * @return {R} the result of the `block` invocation
     */
    map(block) {
        return block(this);
    }
}
exports.PerformedPolarRotation = PerformedPolarRotation;
class PerformedPolarRotationBuilder {
    constructor() {
        this.who = undefined;
        this.from = undefined;
        this.to = undefined;
        this.delta = undefined;
    }
    /**
     * Builds a new `PerformedPolarRotation` object throwing an error if one of the required fields is missing
     * @returns {PerformedPolarRotation} the built object
     * @throws {Error} if one of the required fields is missing
     */
    build() {
        if (this.who == undefined) {
            throw new Error("The subject of the rotation is not defined");
        }
        if (this.from == undefined) {
            throw new Error("The initial rotation of the subject is not defined");
        }
        if (this.to == undefined) {
            throw new Error("The final rotation of the subject is not defined");
        }
        return new PerformedPolarRotation(this.who, this.from, this.to, this.delta);
    }
    /**
     * Clears the builder, setting all the fields to `undefined` except the `who` field
     * @returns {PerformedPolarRotationBuilder} this builder
     */
    clear() {
        this.from = undefined;
        this.to = undefined;
        this.delta = undefined;
        return this;
    }
}
exports.PerformedPolarRotationBuilder = PerformedPolarRotationBuilder;
//# sourceMappingURL=performed-polar-rotation.js.map