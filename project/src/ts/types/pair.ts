import {IndexOutOfBoundException} from "./exceptions/index-out-of-bound-exception";
import {equals, Equatable} from "./equatable";
import {Cloneable, tryClone} from "./cloneable";
import {Copiable} from "./copiable";
import {Matrix, matrix} from "../geometry/matrix/matrix";
import {MatrixData} from "../geometry/matrix/matrix-types";
import {Triple} from "./triple";

/**
 * An enumeration that allow to access the element to a specific position
 * in a `Pair` instance
 */
export enum PairPosition {
    FIRST, SECOND
}

/**
 * A pair of two elements
 */
export class Pair<F, S> implements Equatable, Cloneable<Pair<F, S>>, Copiable<Pair<F, S>>{

    #first?: F|null = null
    #second?: S|null = null

    constructor(first?: F|null, second?: S|null) {
        this.#first = first
        this.#second = second
    }

    /**
     * Gets the element at the specified position
     * @param {PairPosition} position the position of the element to get
     * @return {F|S} the desired element
     * @throws {IndexOutOfBoundException} if the index is not valid
     */
    get(position: PairPosition|number): F|S {
        switch (position) {
            case PairPosition.FIRST || 0: return this.#first
            case PairPosition.SECOND || 1: return this.#second
            default:
                throw new IndexOutOfBoundException(position)
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
    set(value: F|S, position: PairPosition) {
        switch (position) {
            case PairPosition.FIRST: this.#first = value as F
            case PairPosition.SECOND: this.#second = value as S
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
     * Sets the **first** and the **second** element of this pair
     * @param {F|null} first the first element
     * @param {S|null} second the second element
     */
    setAll(first: F|null, second: S|null) {
        this.#first = first
        this.#second = second
    }

    /**
     * Sets the elements of this pair to the values of the given `pair`
     * @param {Pair<F, S>} other the pair to take the values from
     */
    setFrom(other: Pair<F, S>) {
        this.#first = other.#first
        this.#second = other.#second
    }

    /**
     * Adds an element to this couple producing a `Triple` with the two element of this
     * couple *plus* the one given as parameter
     * @param element
     */
    plus<T>(element: T): Triple<F, S, T> {
        return new Triple<F, S, T>(this.#first, this.#second, element)
    }

    /**
     * Check if the given `element` is present in somewhere in this pair.<br>
     * It is better if the types of the element of the `Pair` implements `Equatable` otherwise
     * it will be used the `===` equality operator
     * @param {F|S} element the element to check for the presence
     * @return {boolean} `true` if the element id present in this pair
     */
    contains(element: F|S): boolean {
        return (equals(this.#first, element) || equals(this.#second, element))
    }

    /**
     * Searches for the given `element` returning its position if present.<br>
     * If the element is not present, this method returns `null`
     * @param {F|S} element the element to search for
     * @return {PairPosition|null} the position of the element of `null` if not present
     **/
    search(element: F|S): PairPosition|null {
        if(equals(this.#first, element))
            return PairPosition.FIRST
        if(equals(this.#first, element))
            return PairPosition.SECOND
        return null
    }

    /**
     * Returns a copy of this pair which contains the same elements in this but with
     * the **reverse order** (the `first` element of this will become the `second` of the new, the
     * `second` element of this will become the `first` of the new)
     */
    reverted(): Pair<S, F> {
        return new Pair(this.#second, this.#first)
    }

    /**
     * Collects the two element of this pair to produce a single result
     * @param {(first: F, second: S) => R} collector the function that accepts the two elements of this pair
     * and returns the result
     */
    collect<R>(collector: (first: F|null, second: S|null) => R): R {
        return collector(this.#first, this.#second)
    }

    /**
     * Applies the `mapper` function on the **first** element of this pair and
     * returns a new pair which contains the result of this function as the first
     * element and the second element that is the second one of this pair
     * @param {(first: F|null) => R} mapper the transformation function for the `first` element
     * @return {Pair<R, S>} the new pair with the transformed first element
     */
    mapFirst<R>(mapper: (first: F|null) => R): Pair<R, S> {
        return new Pair(mapper(this.#first), this.#second)
    }

    /**
     * Applies the `mapper` function on the **second** element of this pair and
     * returns a new pair which contains the result of this function as the second
     * element and the first element that is the first one of this pair
     * @param {(second: S|null) => R} mapper the transformation function for the `second` element
     * @return {Pair<R, S>} the new pair with the transformed second element
     */
    mapSecond<R>(mapper: (second: S|null) => R): Pair<F, R> {
        return new Pair(this.#first, mapper(this.#second))
    }

    /**
     * Returns an array containing the two elements in this pair, preserving the order
     */
    toArray(): Array<any> {
        return [this.#first, this.#second]
    }

    /**
     * Returns a clone of this pair. Every changes over the returning value **will not have effects** on
     * this.
     * **Notice that the copy will be deep only if the two elements are `Cloneable` themselves**, otherwise
     * the clone will be a shallow copy equivalent to the result of `copy()`
     */
    clone(): Pair<F,S> {
        return new Pair<F,S>(tryClone(this.#first), tryClone(this.#second))
    }

    /**
     * Returns a shallow copy of this pair.
     * Every changes over the returning value **will not have effects** on this but changes on the elements
     * can be propagated (is a *shallow copy*)
     */
    copy(): Pair<F,S> {
        return new Pair<F,S>(this.#first, this.#second)
    }

    toString(): string {
        return "Pair(" + this.#first + ", " + this.#second + ")"
    }

    /**
     * Returns `true` the `other` object is a `Pair` with the two elements that are
     * equals (intended as `===`) to the ones in this pair
     * @param {any} other the other object
     * @return {boolean} `true` if the `other` is a pair equals to this
     */
    equals(other: any): boolean {
        if(other != null) {
            if(other instanceof Pair) {
                return this.#first === other.#first && this.#second === other.#second
            }
        }

        return false
    }

    /**
     * Apply the `mapper` function to this object and returns the result.
     * This function basically let to *transforms* this object into another thanks to
     * the `mapper` function
     * @param {(pair: Pair<F, S>) => R} mapper the transformation function
     * @return {R} the result of the transformation
     */
    map<R>(mapper:(pair: Pair<F, S>) => R): R {
        return mapper(this)
    }

    /**
     * Executes the given `block` passing this object to it, then returns this object
     * @param {Pair<F, S>) => void} block the function to be executed on this object
     * @return {Pair<F, S>} this object
     */
    apply(block: (pair: Pair<F, S>) => void): Pair<F, S> {
        block(this)
        return this
    }

}

/**
 * A couple, intended as a `Pair` with two elements of the **same** type
 */
export type Couple<T> = Pair<T, T>

/**
 * Creates and returns a new **pair** with the two elements given as parameters
 * @param {F|null} first the first element
 * @param {S|null} second the second element
 * @return {Pair<F, S>} the new created pair
 */
export function pairOf<F, S>(first: F|null, second: S|null): Pair<F, S> {
    return new Pair(first, second)
}

/**
 * Creates and returns a new **couple** with the two elements given as parameters
 * @param {T|null} first the first element
 * @param {T|null} second the second element
 * @return {Couple<T>} the new created couple
 */
export function coupleOf<T>(first: T|null, second: T|null): Couple<T> {
    return new Pair(first, second)
}

/**
 * Creates and returns a row array intended as a *1x2* matrix
 * @param {Couple<T>} couple the couple to be converted
 * @return a *1x2* matrix with the elements of the given pair
 */
export function coupleAsRowArray<T>(couple: Couple<T>): Matrix<T> {
    let data: MatrixData<T> = couple.toArray()
    return matrix(data)
}

/**
 * Creates and returns a column array intended as a *2x1* matrix
 * @param {Couple<T>} couple the couple to be converted
 * @return a *2x1* matrix with the elements of the given pair
 */
export function coupleAsColumnArray<T>(couple: Couple<T>): Matrix<T> {
    let data: MatrixData<T> = new Array(2)
    for(let r = 0; r < data.length; r++) {
        data[r] = [couple.get(r)]
    }
    return matrix(data)
}