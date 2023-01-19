"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformedScaleBuilder = void 0;
const number_trio_1 = require("../../types/numbers/number-trio");
class PerformedScale {
    constructor(who, from, to, coefficients = null) {
        this.who = who;
        this.from = from;
        this.to = to;
        if (coefficients == undefined) {
            this.coefficients = (0, number_trio_1.numberTrio)(to.getFirst() / from.getFirst(), to.getSecond() / from.getSecond(), to.getThird() / from.getThird());
        }
        else {
            this.coefficients = coefficients;
        }
    }
    /**
     * Applies the given `block` to this object, then returns this object
     * @param {(translation: PerformedScale) => void} block the function to apply to this object
     * @return {PerformedScale} this object
     */
    apply(block) {
        block(this);
        return this;
    }
    /**
     * Applies the given `block` to this object, then returns the result
     * of the `block` invocation
     * @param {(translation: PerformedTranslation) => R} block the function to apply to this object
     * @return {R} the result of the `block` invocation
     */
    map(block) {
        return block(this);
    }
}
exports.default = PerformedScale;
class PerformedScaleBuilder {
    constructor() {
        this.who = undefined;
        this.from = undefined;
        this.to = undefined;
        this.coefficients = undefined;
    }
    /**
     * Builds a new `PerformedScale` object throwing an error if one of the required fields is missing
     * @returns {PerformedScale} the built `PerformedScale` object
     * @throws {Error} if one of the required fields is missing
     */
    build() {
        if (this.who == undefined) {
            throw new Error("The subject of the scaling is not defined");
        }
        if (this.from == undefined) {
            throw new Error("The scale factors of the subject before the scaling are not defined");
        }
        if (this.to == undefined) {
            throw new Error("The scale factors of the subject after the scaling are not defined");
        }
        return new PerformedScale(this.who, this.from, this.to, this.coefficients);
    }
    /**
     * Clears the builder, setting all the fields to `undefined` except the `who` field
     * @returns {PerformedScaleBuilder} this builder
     */
    clear() {
        this.from = undefined;
        this.to = undefined;
        this.coefficients = undefined;
        return this;
    }
}
exports.PerformedScaleBuilder = PerformedScaleBuilder;
//# sourceMappingURL=performed-scale.js.map