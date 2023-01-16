import {Equatable, equals} from "./equatable";
import {IndexOutOfBoundException} from "./exceptions/index-out-of-bound-exception";
import {Cloneable, tryClone} from "./cloneable";
import {Copiable} from "./copiable";
import {Matrix, matrix} from "../geometry/matrix/matrix";
import {MatrixData} from "../geometry/matrix/matrix-types";

/**
 * An enumeration that allow to access the element to a specific position
 * in a `Pair` instance
 */
export enum TriplePosition {
    FIRST, SECOND, THIRD
}

/***
 * A set of three objects
 */
export class Triple<F, S, T> implements Equatable, Cloneable<Triple<F, S, T>>, Copiable<Triple<F, S, T>> {

    #first: F|null
    #second: S|null
    #third: T|null

    constructor(first: F|null, second: S|null, third: T|null) {
        this.#first = first
        this.#second = second
        this.#third = third
    }

    /**
     * Gets the element at the specified position
     * @param {TriplePosition} position the position of the element to get
     * @return {F|S|T} the desired element
     * @throws {IndexOutOfBoundException} if the index is not valid
     */
    get(position: TriplePosition|number): F|S|T {
        switch (position) {
            case TriplePosition.FIRST || 0: return this.#first
            case TriplePosition.SECOND || 0: return this.#second
            case TriplePosition.THIRD || 0: return this.#third
            default:
                throw new IndexOutOfBoundException(position)
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
    set(value: F|S, position: TriplePosition) {
        switch (position) {
            case TriplePosition.FIRST: this.#first = value as F
            case TriplePosition.SECOND: this.#second = value as S
            case TriplePosition.THIRD: this.#third = value as T
            default:
                throw new IndexOutOfBoundException(position)
        }
    }

    /**
     * Returns the **first** element of this pair
     */
    getFirst(): F|null {
        return this.#first
    }

    /**
     * Returns the **second** element of this pair
     */
    getSecond(): S|null {
        return this.#second
    }

    /**
     * Returns the **third** element of this pair
     */
    getThird(): T|null {
        return this.#third
    }

    /**
     * Sets the **first** element of this pair
     * @param {F|null} first the first element
     */
    setFirst(first: F|null) {
        this.#first = first
    }

    /**
     * Sets the **second** element of this pair
     * @param {S|null} second the first element
     */
    setSecond(second: S|null) {
        this.#second = second
    }

    /**
     * Sets the **third** element of this pair
     * @param {T|null} second the first element
     */
    setThird(third: T|null) {
        this.#third = third
    }

    /**
     * Returns a copy of this triple but **switched to right**
     * (the `first` element of this will become the `second` of the new, the
     * `second` element of this will become the `third` of the new and the current `third` will
     * become the new `first`)
     */
    switched(): Triple<T, F, S> {
        return new Triple<T, F, S>(this.#third, this.#first, this.#second)
    }

    /**
     * Check if the given `element` is present in somewhere in this triple.<br>
     * It is better if the types of the element of the `Triple` implements `Equatable` otherwise
     * it will be used the `===` equality operator
     * @param {F|S} element the element to check for the presence
     * @return {boolean} `true` if the element id present in this pair
     */
    contains(element: F|S): boolean {
        return (equals(this.#first, element) || equals(this.#second, element) || equals(this.#third, element))
    }

    /**
     * Searches for the given `element` returning its position if present.
     * If the element is not present, this method returns `null`.<br>
     * It is better if the types of the element of the `Triple` implements `Equatable` otherwise
     * it will be used the `===` equality operator
     * @param {F|S|T} element the element to search for
     * @return {PairPosition|null} the position of the element of `null` if not present
     **/
    search(element: F|S|T): TriplePosition|null {
        if(equals(this.#first, element))
            return TriplePosition.FIRST
        if(equals(this.#first, element))
            return TriplePosition.SECOND
        if(equals(this.#third, element))
            return TriplePosition.THIRD
        return null
    }

    /**
     * Collects the three element of this triple to produce a single result
     * @param {(first: F, second: S, third: T) => R} collector the function that accepts the three elements of this
     * triple and returns the result
     */
    collect<R>(collector: (first: F|null, second: S|null, third: T|null) => R): R {
        return collector(this.#first, this.#second, this.#third)
    }

    /**
     * Applies the `mapper` function on the **first** element of this triple and
     * returns a new triple which contains the result of this function as the first
     * element, the second element and the third that are the second and the third one of this triple
     * @param {(first: F|null) => R} mapper the transformation function for the `first` element
     * @return {Triple<R, S, T>} the new pair with the transformed first element
     */
    mapFirst<R>(mapper: (first: F|null) => R): Triple<R, S, T> {
        return new Triple<R, S, T>(mapper(this.#first), this.#second, this.#third)
    }

    /**
     * Applies the `mapper` function on the **second** element of this triple and
     * returns a new triple which contains the result of this function as the second
     * element and the first and the third element that are the first and the third ones of this triple
     * @param {(second: S|null) => R} mapper the transformation function for the `second` element
     * @return {Triple<F, R, T>} the new triple with the transformed second element
     */
    mapSecond<R>(mapper: (second: S|null) => R): Triple<F, R, T> {
        return new Triple<F, R, T>(this.#first, mapper(this.#second), this.#third)
    }

    /**
     * Applies the `mapper` function on the **third** element of this triple and
     * returns a new triple which contains the result of this function as the third
     * element and the first and the second element that are the first and the second ones of this triple
     * @param {(third: T|null) => R} mapper the transformation function for the `third` element
     * @return {Triple<F, S, R>} the new triple with the transformed second element
     */
    mapThird<R>(mapper: (third: T|null) => R): Triple<F, S, R> {
        return new Triple<F, S, R>(this.#first, this.#second, mapper(this.#third))
    }

    /**
     * Returns an array containing the two elements in this pair, preserving the order
     */
    toArray(): Array<any> {
        return [this.#first, this.#second, this.#third]
    }

    /**
     * Returns a clone of this pair. Every changes over the returning value **will not have effects** on
     * this.
     * **Notice that the copy will be deep only if the two elements are `Cloneable` themselves**, otherwise
     * the clone will be a shallow copy equivalent to the result of `copy()`
     */
    clone(): Triple<F,S, T> {
        return new Triple<F,S, T>(tryClone(this.#first), tryClone(this.#second), tryClone(this.#third))
    }

    /**
     * Returns a shallow copy of this pair.
     * Every changes over the returning value **will not have effects** on this but changes on the elements
     * can be propagated (is a *shallow copy*)
     */
    copy(): Triple<F,S, T> {
        return new Triple<F,S, T>(this.#first, this.#second, this.#third)
    }

    toString(): string {
        return "Pair(" + this.#first + ", " + this.#second + ")"
    }

    /**
     * Returns `true` the `other` object is a `Triple` with the two elements that are
     * equals (intended as `===`) to the ones in this pair
     * @param {any} other the other object
     * @return {boolean} `true` if the `other` is a triple equals to this
     */
    equals(other: any): boolean {
        if(other != null) {
            if(other instanceof Triple) {
                return this.#first === other.#first && this.#second === other.#second
            }
        }

        return false
    }
}

/**
 * A triple which contains objects with the same type
 */
export type Trio<T> = Triple<T, T, T>

/**
 * Creates and returns a new **triple** with the three elements given as parameters
 * @param {F|null} first the first element
 * @param {S|null} second the second element
 * @param {T|null} third the third element
 * @return {Triple<F, S, T>} the new created triple
 */
export function tripleOf<F, S, T>(first: F|null, second: S|null, third: T|null): Triple<F, S, T> {
    return new Triple<F, S, T>(first, second, third)
}

/**
 * Creates and returns a new **trio** with the three elements given as parameters
 * @param {F|null} first the first element
 * @param {S|null} second the second element
 * @param {T|null} third the third element
 * @return {Triple<F, S, T>} the new created trio
 */
export function trioOf<T>(first: T|null, second: T|null, third: T|null): Trio<T> {
    return new Triple<T, T, T>(first, second, third)
}

/**
 * Creates and returns a row array intended as a *1x3* matrix
 * @param {Trio<T>} trio the trio to be converted
 * @return a *1x3* matrix with the elements of the given triple
 */
export function trioAsRowArray<T>(trio: Trio<T>): Matrix<T> {
    let data: MatrixData<T> = trio.toArray()
    return matrix(data)
}

/**
 * Creates and returns a column array intended as a *3x1* matrix
 * @param {Trio<T>} trio the trio to be converted
 * @return a *3x1* matrix with the elements of the given triple
 */
export function trioAsColumnArray<T>(trio: Trio<T>): Matrix<T> {
    let data: MatrixData<T> = new Array(2)
    for(let r = 0; r < data.length; r++) {
        data[r] = [trio.get(r)]
    }
    return matrix(data)
}