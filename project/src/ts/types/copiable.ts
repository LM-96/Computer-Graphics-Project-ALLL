import {Cloneable} from "./cloneable";

/**
 * The interface of an object that is **shallowly-copiable**
 */
export interface Copiable<T> {

    /**
     * Returns a shallow copy of this object
     */
    copy(): T
}

/**
 * Checks if an object implements `Copiable`
 * (exposes a method to have a shallow copy of the object)
 * @param {any} obj the object to be checked
 */
// @ts-ignore
export function isCopiable<R>(obj: R): obj is Copiable<R> {
    if(typeof obj == "object") {
        return 'copy' in obj
    }
    return false
}

/**
 * Checks if the given object is copiable and, if yes, returns the shallow copy, otherwise
 * returns the same object
 * @param {T} obj the object
 * @return a shallow copy of the object if possible, otherwise it returns the same object
 */
export function tryClone<T>(obj: T): T {
    if(isCopiable(obj)) {
        return obj.copy()
    }
    return obj
}