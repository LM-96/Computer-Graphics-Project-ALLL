import {AbstractFunctionalObject} from "./functional";
import {IndexOutOfBoundException} from "./exceptions/index-out-of-bound-exception";
import {Equatable} from "./equatable";
import {Cloneable, tryClone} from "./cloneable";
import {Copiable} from "./copiable";
import {Matrix} from "../geometry/matrix/matrix";
import {MatrixData} from "../geometry/matrix/matrix-types";
import {matrix} from "../geometry/matrix/matrix-factory";

/**
 * An enumeration that allow to access the element to a specific position
 * in a `Pair` instance
 */
enum PairPosition {
    FIRST, SECOND
}

/**
 * A pair of two elements
 */
export class Pair<F, S> extends AbstractFunctionalObject<Pair<F, S>>
    implements Equatable, Cloneable<Pair<F, S>>, Copiable<Pair<F, S>>{

    #first?: F|null = null
    #second?: S|null = null

    constructor(first?: F|null, second?: S|null) {
        super();
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