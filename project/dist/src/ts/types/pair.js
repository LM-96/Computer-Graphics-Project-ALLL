"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Pair_first, _Pair_second;
Object.defineProperty(exports, "__esModule", { value: true });
exports.coupleAsColumnArray = exports.coupleAsRowArray = exports.coupleOf = exports.pairOf = exports.Pair = exports.PairPosition = void 0;
const index_out_of_bound_exception_1 = require("./exceptions/index-out-of-bound-exception");
const equatable_1 = require("./equatable");
const cloneable_1 = require("./cloneable");
const matrix_1 = require("../geometry/matrix/matrix");
const triple_1 = require("./triple");
/**
 * An enumeration that allow to access the element to a specific position
 * in a `Pair` instance
 */
var PairPosition;
(function (PairPosition) {
    PairPosition[PairPosition["FIRST"] = 0] = "FIRST";
    PairPosition[PairPosition["SECOND"] = 1] = "SECOND";
})(PairPosition = exports.PairPosition || (exports.PairPosition = {}));
/**
 * A pair of two elements
 */
class Pair {
    constructor(first, second) {
        _Pair_first.set(this, null);
        _Pair_second.set(this, null);
        __classPrivateFieldSet(this, _Pair_first, first, "f");
        __classPrivateFieldSet(this, _Pair_second, second, "f");
    }
    /**
     * Gets the element at the specified position
     * @param {PairPosition} position the position of the element to get
     * @return {F|S} the desired element
     * @throws {IndexOutOfBoundException} if the index is not valid
     */
    get(position) {
        switch (position) {
            case PairPosition.FIRST || 0: return __classPrivateFieldGet(this, _Pair_first, "f");
            case PairPosition.SECOND || 1: return __classPrivateFieldGet(this, _Pair_second, "f");
            default:
                throw new index_out_of_bound_exception_1.IndexOutOfBoundException(position);
        }
    }
    /**
     * Sets the element of this pair at the specified position.
     * Please notice that **this method is not safe cause it is not possible to check the type** of
     * the value to be set
     * @param {F|S} value the value to be set
     * @param {PairPosition} position the position in which put the new value
     * @throws {IndexOutOfBoundException} if the index is not valid
     */
    set(value, position) {
        switch (position) {
            case PairPosition.FIRST: __classPrivateFieldSet(this, _Pair_first, value, "f");
            case PairPosition.SECOND: __classPrivateFieldSet(this, _Pair_second, value, "f");
            default:
                throw new index_out_of_bound_exception_1.IndexOutOfBoundException(position);
        }
    }
    /**
     * Returns the **first** element of this pair
     */
    getFirst() {
        return __classPrivateFieldGet(this, _Pair_first, "f");
    }
    /**
     * Returns the **second** element of this pair
     */
    getSecond() {
        return __classPrivateFieldGet(this, _Pair_second, "f");
    }
    /**
     * Sets the **first** element of this pair
     * @param {F|null} first the first element
     */
    setFirst(first) {
        __classPrivateFieldSet(this, _Pair_first, first, "f");
    }
    /**
     * Sets the **second** element of this pair
     * @param {S|null} second the first element
     */
    setSecond(second) {
        __classPrivateFieldSet(this, _Pair_second, second, "f");
    }
    /**
     * Sets the **first** and the **second** element of this pair
     * @param {F|null} first the first element
     * @param {S|null} second the second element
     */
    setAll(first, second) {
        __classPrivateFieldSet(this, _Pair_first, first, "f");
        __classPrivateFieldSet(this, _Pair_second, second, "f");
    }
    /**
     * Sets the elements of this pair to the values of the given `pair`
     * @param {Pair<F, S>} other the pair to take the values from
     */
    setFrom(other) {
        __classPrivateFieldSet(this, _Pair_first, __classPrivateFieldGet(other, _Pair_first, "f"), "f");
        __classPrivateFieldSet(this, _Pair_second, __classPrivateFieldGet(other, _Pair_second, "f"), "f");
    }
    /**
     * Adds an element to this couple producing a `Triple` with the two element of this
     * couple *plus* the one given as parameter
     * @param element
     */
    plus(element) {
        return new triple_1.Triple(__classPrivateFieldGet(this, _Pair_first, "f"), __classPrivateFieldGet(this, _Pair_second, "f"), element);
    }
    /**
     * Check if the given `element` is present in somewhere in this pair.<br>
     * It is better if the types of the element of the `Pair` implements `Equatable` otherwise
     * it will be used the `===` equality operator
     * @param {F|S} element the element to check for the presence
     * @return {boolean} `true` if the element id present in this pair
     */
    contains(element) {
        return ((0, equatable_1.equals)(__classPrivateFieldGet(this, _Pair_first, "f"), element) || (0, equatable_1.equals)(__classPrivateFieldGet(this, _Pair_second, "f"), element));
    }
    /**
     * Searches for the given `element` returning its position if present.<br>
     * If the element is not present, this method returns `null`
     * @param {F|S} element the element to search for
     * @return {PairPosition|null} the position of the element of `null` if not present
     **/
    search(element) {
        if ((0, equatable_1.equals)(__classPrivateFieldGet(this, _Pair_first, "f"), element))
            return PairPosition.FIRST;
        if ((0, equatable_1.equals)(__classPrivateFieldGet(this, _Pair_first, "f"), element))
            return PairPosition.SECOND;
        return null;
    }
    /**
     * Returns a copy of this pair which contains the same elements in this but with
     * the **reverse order** (the `first` element of this will become the `second` of the new, the
     * `second` element of this will become the `first` of the new)
     */
    reverted() {
        return new Pair(__classPrivateFieldGet(this, _Pair_second, "f"), __classPrivateFieldGet(this, _Pair_first, "f"));
    }
    /**
     * Collects the two element of this pair to produce a single result
     * @param {(first: F, second: S) => R} collector the function that accepts the two elements of this pair
     * and returns the result
     */
    collect(collector) {
        return collector(__classPrivateFieldGet(this, _Pair_first, "f"), __classPrivateFieldGet(this, _Pair_second, "f"));
    }
    /**
     * Applies the `mapper` function on the **first** element of this pair and
     * returns a new pair which contains the result of this function as the first
     * element and the second element that is the second one of this pair
     * @param {(first: F|null) => R} mapper the transformation function for the `first` element
     * @return {Pair<R, S>} the new pair with the transformed first element
     */
    mapFirst(mapper) {
        return new Pair(mapper(__classPrivateFieldGet(this, _Pair_first, "f")), __classPrivateFieldGet(this, _Pair_second, "f"));
    }
    /**
     * Applies the `mapper` function on the **second** element of this pair and
     * returns a new pair which contains the result of this function as the second
     * element and the first element that is the first one of this pair
     * @param {(second: S|null) => R} mapper the transformation function for the `second` element
     * @return {Pair<R, S>} the new pair with the transformed second element
     */
    mapSecond(mapper) {
        return new Pair(__classPrivateFieldGet(this, _Pair_first, "f"), mapper(__classPrivateFieldGet(this, _Pair_second, "f")));
    }
    /**
     * Returns an array containing the two elements in this pair, preserving the order
     */
    toArray() {
        return [__classPrivateFieldGet(this, _Pair_first, "f"), __classPrivateFieldGet(this, _Pair_second, "f")];
    }
    /**
     * Returns a clone of this pair. Every changes over the returning value **will not have effects** on
     * this.
     * **Notice that the copy will be deep only if the two elements are `Cloneable` themselves**, otherwise
     * the clone will be a shallow copy equivalent to the result of `copy()`
     */
    clone() {
        return new Pair((0, cloneable_1.tryClone)(__classPrivateFieldGet(this, _Pair_first, "f")), (0, cloneable_1.tryClone)(__classPrivateFieldGet(this, _Pair_second, "f")));
    }
    /**
     * Returns a shallow copy of this pair.
     * Every changes over the returning value **will not have effects** on this but changes on the elements
     * can be propagated (is a *shallow copy*)
     */
    copy() {
        return new Pair(__classPrivateFieldGet(this, _Pair_first, "f"), __classPrivateFieldGet(this, _Pair_second, "f"));
    }
    toString() {
        return "Pair(" + __classPrivateFieldGet(this, _Pair_first, "f") + ", " + __classPrivateFieldGet(this, _Pair_second, "f") + ")";
    }
    /**
     * Returns `true` the `other` object is a `Pair` with the two elements that are
     * equals (intended as `===`) to the ones in this pair
     * @param {any} other the other object
     * @return {boolean} `true` if the `other` is a pair equals to this
     */
    equals(other) {
        if (other != null) {
            if (other instanceof Pair) {
                return __classPrivateFieldGet(this, _Pair_first, "f") === __classPrivateFieldGet(other, _Pair_first, "f") && __classPrivateFieldGet(this, _Pair_second, "f") === __classPrivateFieldGet(other, _Pair_second, "f");
            }
        }
        return false;
    }
    /**
     * Apply the `mapper` function to this object and returns the result.
     * This function basically let to *transforms* this object into another thanks to
     * the `mapper` function
     * @param {(pair: Pair<F, S>) => R} mapper the transformation function
     * @return {R} the result of the transformation
     */
    map(mapper) {
        return mapper(this);
    }
    /**
     * Executes the given `block` passing this object to it, then returns this object
     * @param {Pair<F, S>) => void} block the function to be executed on this object
     * @return {Pair<F, S>} this object
     */
    apply(block) {
        block(this);
        return this;
    }
}
exports.Pair = Pair;
_Pair_first = new WeakMap(), _Pair_second = new WeakMap();
/**
 * Creates and returns a new **pair** with the two elements given as parameters
 * @param {F|null} first the first element
 * @param {S|null} second the second element
 * @return {Pair<F, S>} the new created pair
 */
function pairOf(first, second) {
    return new Pair(first, second);
}
exports.pairOf = pairOf;
/**
 * Creates and returns a new **couple** with the two elements given as parameters
 * @param {T|null} first the first element
 * @param {T|null} second the second element
 * @return {Couple<T>} the new created couple
 */
function coupleOf(first, second) {
    return new Pair(first, second);
}
exports.coupleOf = coupleOf;
/**
 * Creates and returns a row array intended as a *1x2* matrix
 * @param {Couple<T>} couple the couple to be converted
 * @return a *1x2* matrix with the elements of the given pair
 */
function coupleAsRowArray(couple) {
    let data = couple.toArray();
    return (0, matrix_1.matrix)(data);
}
exports.coupleAsRowArray = coupleAsRowArray;
/**
 * Creates and returns a column array intended as a *2x1* matrix
 * @param {Couple<T>} couple the couple to be converted
 * @return a *2x1* matrix with the elements of the given pair
 */
function coupleAsColumnArray(couple) {
    let data = new Array(2);
    for (let r = 0; r < data.length; r++) {
        data[r] = [couple.get(r)];
    }
    return (0, matrix_1.matrix)(data);
}
exports.coupleAsColumnArray = coupleAsColumnArray;
//# sourceMappingURL=pair.js.map