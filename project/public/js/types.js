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
exports.coupleOf = exports.pairOf = exports.Pair = exports.AbstractFunctionalObject = void 0;
/**
 * The abstract implementation of a `FunctionalObject`
 */
class AbstractFunctionalObject {
    map(mapper) {
        return mapper(this);
    }
    apply(block) {
        return block(this);
    }
}
exports.AbstractFunctionalObject = AbstractFunctionalObject;
/**
 * A pair of two elements
 */
class Pair extends AbstractFunctionalObject {
    constructor(first, second) {
        super();
        _Pair_first.set(this, null);
        _Pair_second.set(this, null);
        __classPrivateFieldSet(this, _Pair_first, first, "f");
        __classPrivateFieldSet(this, _Pair_second, second, "f");
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
     * Returns a copy of this pair. Every changes over the returning value **will not have effects** on
     * this
     */
    copy() {
        return new Pair(__classPrivateFieldGet(this, _Pair_first, "f"), __classPrivateFieldGet(this, _Pair_second, "f"));
    }
    toString() {
        return "Pair(" + __classPrivateFieldGet(this, _Pair_first, "f") + ", " + __classPrivateFieldGet(this, _Pair_second, "f") + ")";
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
//# sourceMappingURL=types.js.map