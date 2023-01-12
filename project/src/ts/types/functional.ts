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