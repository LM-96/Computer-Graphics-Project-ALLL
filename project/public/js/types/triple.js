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
var _Triple_first, _Triple_second, _Triple_third;
Object.defineProperty(exports, "__esModule", { value: true });
exports.trioAsColumnArray = exports.trioAsRowArray = exports.trioOf = exports.tripleOf = exports.Triple = void 0;
const functional_1 = require("./functional");
const index_out_of_bound_exception_1 = require("./exceptions/index-out-of-bound-exception");
const cloneable_1 = require("./cloneable");
const matrix_factory_1 = require("../geometry/matrix/matrix-factory");
/**
 * An enumeration that allow to access the element to a specific position
 * in a `Pair` instance
 */
var TriplePosition;
(function (TriplePosition) {
    TriplePosition[TriplePosition["FIRST"] = 0] = "FIRST";
    TriplePosition[TriplePosition["SECOND"] = 1] = "SECOND";
    TriplePosition[TriplePosition["THIRD"] = 2] = "THIRD";
})(TriplePosition || (TriplePosition = {}));
/***
 * A set of three objects
 */
class Triple extends functional_1.AbstractFunctionalObject {
    constructor(first, second, third) {
        super();
        _Triple_first.set(this, void 0);
        _Triple_second.set(this, void 0);
        _Triple_third.set(this, void 0);
        __classPrivateFieldSet(this, _Triple_first, first, "f");
        __classPrivateFieldSet(this, _Triple_second, second, "f");
        __classPrivateFieldSet(this, _Triple_third, third, "f");
    }
    /**
     * Gets the element at the specified position
     * @param {TriplePosition} position the position of the element to get
     * @return {F|S|T} the desired element
     * @throws {IndexOutOfBoundException} if the index is not valid
     */
    get(position) {
        switch (position) {
            case TriplePosition.FIRST || 0: return __classPrivateFieldGet(this, _Triple_first, "f");
            case TriplePosition.SECOND || 0: return __classPrivateFieldGet(this, _Triple_second, "f");
            case TriplePosition.THIRD || 0: return __classPrivateFieldGet(this, _Triple_third, "f");
            default:
                throw new index_out_of_bound_exception_1.IndexOutOfBoundException(position);
        }
    }
    /**
     * Sets the element of this triple at the specified position.
     * Please notice that **this method is not safe cause it is not possible to check the type** of
     * the value to be set
     * @param {F|S} value the value to be set
     * @param {PairPosition} position the position in which put the new value
     * @throws {IndexOutOfBoundException} if the index is not valid
     */
    set(value, position) {
        switch (position) {
            case TriplePosition.FIRST: __classPrivateFieldSet(this, _Triple_first, value, "f");
            case TriplePosition.SECOND: __classPrivateFieldSet(this, _Triple_second, value, "f");
            case TriplePosition.THIRD: __classPrivateFieldSet(this, _Triple_third, value, "f");
            default:
                throw new index_out_of_bound_exception_1.IndexOutOfBoundException(position);
        }
    }
    /**
     * Returns the **first** element of this pair
     */
    getFirst() {
        return __classPrivateFieldGet(this, _Triple_first, "f");
    }
    /**
     * Returns the **second** element of this pair
     */
    getSecond() {
        return __classPrivateFieldGet(this, _Triple_second, "f");
    }
    /**
     * Returns the **third** element of this pair
     */
    getThird() {
        return __classPrivateFieldGet(this, _Triple_third, "f");
    }
    /**
     * Sets the **first** element of this pair
     * @param {F|null} first the first element
     */
    setFirst(first) {
        __classPrivateFieldSet(this, _Triple_first, first, "f");
    }
    /**
     * Sets the **second** element of this pair
     * @param {S|null} second the first element
     */
    setSecond(second) {
        __classPrivateFieldSet(this, _Triple_second, second, "f");
    }
    /**
     * Sets the **third** element of this pair
     * @param {T|null} second the first element
     */
    setThird(third) {
        __classPrivateFieldSet(this, _Triple_third, third, "f");
    }
    /**
     * Returns a copy of this triple but **switched to right**
     * (the `first` element of this will become the `second` of the new, the
     * `second` element of this will become the `third` of the new and the current `third` will
     * become the new `first`)
     */
    switched() {
        return new Triple(__classPrivateFieldGet(this, _Triple_third, "f"), __classPrivateFieldGet(this, _Triple_first, "f"), __classPrivateFieldGet(this, _Triple_second, "f"));
    }
    /**
     * Collects the three element of this triple to produce a single result
     * @param {(first: F, second: S, third: T) => R} collector the function that accepts the three elements of this
     * triple and returns the result
     */
    collect(collector) {
        return collector(__classPrivateFieldGet(this, _Triple_first, "f"), __classPrivateFieldGet(this, _Triple_second, "f"), __classPrivateFieldGet(this, _Triple_third, "f"));
    }
    /**
     * Applies the `mapper` function on the **first** element of this triple and
     * returns a new triple which contains the result of this function as the first
     * element, the second element and the third that are the second and the third one of this triple
     * @param {(first: F|null) => R} mapper the transformation function for the `first` element
     * @return {Triple<R, S, T>} the new pair with the transformed first element
     */
    mapFirst(mapper) {
        return new Triple(mapper(__classPrivateFieldGet(this, _Triple_first, "f")), __classPrivateFieldGet(this, _Triple_second, "f"), __classPrivateFieldGet(this, _Triple_third, "f"));
    }
    /**
     * Applies the `mapper` function on the **second** element of this triple and
     * returns a new triple which contains the result of this function as the second
     * element and the first and the third element that are the first and the third ones of this triple
     * @param {(second: S|null) => R} mapper the transformation function for the `second` element
     * @return {Triple<F, R, T>} the new triple with the transformed second element
     */
    mapSecond(mapper) {
        return new Triple(__classPrivateFieldGet(this, _Triple_first, "f"), mapper(__classPrivateFieldGet(this, _Triple_second, "f")), __classPrivateFieldGet(this, _Triple_third, "f"));
    }
    /**
     * Applies the `mapper` function on the **third** element of this triple and
     * returns a new triple which contains the result of this function as the third
     * element and the first and the second element that are the first and the second ones of this triple
     * @param {(third: T|null) => R} mapper the transformation function for the `third` element
     * @return {Triple<F, S, R>} the new triple with the transformed second element
     */
    mapThird(mapper) {
        return new Triple(__classPrivateFieldGet(this, _Triple_first, "f"), __classPrivateFieldGet(this, _Triple_second, "f"), mapper(__classPrivateFieldGet(this, _Triple_third, "f")));
    }
    /**
     * Returns an array containing the two elements in this pair, preserving the order
     */
    toArray() {
        return [__classPrivateFieldGet(this, _Triple_first, "f"), __classPrivateFieldGet(this, _Triple_second, "f"), __classPrivateFieldGet(this, _Triple_third, "f")];
    }
    /**
     * Returns a clone of this pair. Every changes over the returning value **will not have effects** on
     * this.
     * **Notice that the copy will be deep only if the two elements are `Cloneable` themselves**, otherwise
     * the clone will be a shallow copy equivalent to the result of `copy()`
     */
    clone() {
        return new Triple((0, cloneable_1.tryClone)(__classPrivateFieldGet(this, _Triple_first, "f")), (0, cloneable_1.tryClone)(__classPrivateFieldGet(this, _Triple_second, "f")), (0, cloneable_1.tryClone)(__classPrivateFieldGet(this, _Triple_third, "f")));
    }
    /**
     * Returns a shallow copy of this pair.
     * Every changes over the returning value **will not have effects** on this but changes on the elements
     * can be propagated (is a *shallow copy*)
     */
    copy() {
        return new Triple(__classPrivateFieldGet(this, _Triple_first, "f"), __classPrivateFieldGet(this, _Triple_second, "f"), __classPrivateFieldGet(this, _Triple_third, "f"));
    }
    toString() {
        return "Pair(" + __classPrivateFieldGet(this, _Triple_first, "f") + ", " + __classPrivateFieldGet(this, _Triple_second, "f") + ")";
    }
    /**
     * Returns `true` the `other` object is a `Triple` with the two elements that are
     * equals (intended as `===`) to the ones in this pair
     * @param {any} other the other object
     * @return {boolean} `true` if the `other` is a triple equals to this
     */
    equals(other) {
        if (other != null) {
            if (other instanceof Triple) {
                return __classPrivateFieldGet(this, _Triple_first, "f") === __classPrivateFieldGet(other, _Triple_first, "f") && __classPrivateFieldGet(this, _Triple_second, "f") === __classPrivateFieldGet(other, _Triple_second, "f");
            }
        }
        return false;
    }
}
exports.Triple = Triple;
_Triple_first = new WeakMap(), _Triple_second = new WeakMap(), _Triple_third = new WeakMap();
/**
 * Creates and returns a new **triple** with the three elements given as parameters
 * @param {F|null} first the first element
 * @param {S|null} second the second element
 * @param {T|null} third the third element
 * @return {Triple<F, S, T>} the new created triple
 */
function tripleOf(first, second, third) {
    return new Triple(first, second, third);
}
exports.tripleOf = tripleOf;
/**
 * Creates and returns a new **trio** with the three elements given as parameters
 * @param {F|null} first the first element
 * @param {S|null} second the second element
 * @param {T|null} third the third element
 * @return {Triple<F, S, T>} the new created trio
 */
function trioOf(first, second, third) {
    return new Triple(first, second, third);
}
exports.trioOf = trioOf;
/**
 * Creates and returns a row array intended as a *1x3* matrix
 * @param {Trio<T>} trio the trio to be converted
 * @return a *1x3* matrix with the elements of the given triple
 */
function trioAsRowArray(trio) {
    let data = trio.toArray();
    return (0, matrix_factory_1.matrix)(data);
}
exports.trioAsRowArray = trioAsRowArray;
/**
 * Creates and returns a column array intended as a *3x1* matrix
 * @param {Trio<T>} trio the trio to be converted
 * @return a *3x1* matrix with the elements of the given triple
 */
function trioAsColumnArray(trio) {
    let data = new Array(2);
    for (let r = 0; r < data.length; r++) {
        data[r] = [trio.get(r)];
    }
    return (0, matrix_factory_1.matrix)(data);
}
exports.trioAsColumnArray = trioAsColumnArray;
//# sourceMappingURL=triple.js.map