/**
 * The interface of an object that is **deeply-cloneable**
 */
export interface Cloneable<T> {

    /**
     * Returns a deep copy (a clone) of this object
     */
    clone(): T
}

/**
 * Checks if an object implements `Cloneable`
 * (exposes a method to make a deep clone of the object)
 * @param {any} obj the object to be checked
 */
// @ts-ignore
export function isCloneable<R>(obj: R): obj is Cloneable<R> {
    if(typeof obj == "object") {
        return 'clone' in obj
    }
    return false
}

/**
 * Checks if the given object is cloneable and, if yes, returns the clone, otherwise
 * returns the same object
 * @param {T} obj the object
 * @return a clone of the object if possible, otherwise it returns the same object
 */
export function tryClone<T>(obj: T): T {
    if(isCloneable(obj)) {
        return obj.clone()
    }
    return obj
}