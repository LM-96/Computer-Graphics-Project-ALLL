/**
 * An object that has also functional methods like `apply` or `map`
 */
export interface FunctionalObject<T> {

    /**
     * Calls the specified function block with this value as its argument and returns its result
     * @param {(any) => any} mapper the function to be invoked
     */
    map<R>(mapper: (T) => R): R

    /**
     * Calls the specified function `block` with this value as its argument and returns this value.
     * The return value of `block` will be ignored
     * @param {(any) => (any)} block the function to be applied on this object
     */
    apply(block: (T) => any): T

}

/**
 * The abstract implementation of a `FunctionalObject`
 */
export abstract class AbstractFunctionalObject<T> implements FunctionalObject<T>{

    map<R>(mapper: (T) => R): R {
        return mapper(this)
    }

    apply(block: (T) => any): T {
        return block(this)
    }

}

/**
 * A pair of two elements
 */
export class Pair<F, S> extends AbstractFunctionalObject<Pair<F, S>> {

    #first?: F|null = null
    #second?: S|null = null

    constructor(first?: F|null, second?: S|null) {
        super();
        this.#first = first
        this.#second = second
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
     * Returns a copy of this pair. Every changes over the returning value **will not have effects** on
     * this
     */
    copy(): Pair<F,S> {
        return new Pair<F,S>(this.#first, this.#second)
    }

    toString(): string {
        return "Pair(" + this.#first + ", " + this.#second + ")"
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