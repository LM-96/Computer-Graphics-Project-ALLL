"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformedTranslationBuilder = void 0;
const number_trio_1 = require("../../types/numbers/number-trio");
class PerformedTranslation {
    constructor(who, from, to, translationVector = null) {
        this.who = who;
        this.from = from;
        this.to = to;
        if (translationVector == undefined) {
            this.translationVector = (0, number_trio_1.numberTrio)(to.getX() - from.getX(), to.getY() - from.getY(), to.getZ() - from.getZ());
        }
        else {
            this.translationVector = translationVector;
        }
    }
    /**
     * Applies the given `block` to this object, then returns this object
     * @param {(translation: PerformedTranslation) => void} block the function to apply to this object
     * @return {PerformedTranslation} this object
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
exports.default = PerformedTranslation;
class PerformedTranslationBuilder {
    constructor() {
        this.who = undefined;
        this.from = undefined;
        this.to = undefined;
        this.translationVector = undefined;
    }
    /**
     * Builds a new `PerformedTranslation` object throwing an error if one of the required fields is missing
     * @returns {PerformedTranslation} the built object
     * @throws {Error} if one of the required fields is missing
     */
    build() {
        if (this.who == undefined) {
            throw new Error("The subject of the translation is undefined");
        }
        if (this.from == undefined) {
            throw new Error("The initial position of the translation is undefined");
        }
        if (this.to == undefined) {
            throw new Error("The final position of the translation is undefined");
        }
        return new PerformedTranslation(this.who, this.from, this.to, this.translationVector);
    }
    /**
     * Clears the builder, resetting all the fields to their default value except the `who` field
     * @return {PerformedTranslationBuilder} this builder
     */
    clear() {
        this.from = undefined;
        this.to = undefined;
        this.translationVector = undefined;
        return this;
    }
}
exports.PerformedTranslationBuilder = PerformedTranslationBuilder;
//# sourceMappingURL=performed-translation.js.map