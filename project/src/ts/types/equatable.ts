/**
 * Represents an object that implements the method `equals`
 */
export interface Equatable {
    equals(other: any): boolean
}

/**
 * Checks if an object implements `Equatable`
 * @param {any} obj the object to be checked
 */
export function isEquatable(obj: any): obj is Equatable {
    if(typeof obj == "object") {
        return 'equals' in obj
    }
    return false
}

/**
 * Checks if the two objects implement `Equatable` and, in that case, uses the `equals` of
 * `Equatable` to check if the two objects are equals; otherwise it will use the normal `===` operator
 * @param {any} obj1 the first object
 * @param {any} obj2 the second object
 * @return {boolean} `true` if two object are equals following the explained criteria, `false` otherwise
 */
export function equals(obj1: any, obj2: any): boolean {
    if(isEquatable(obj1) && isEquatable(obj2)) {
        return obj1.equals(obj2)
    }
    return obj1 === obj2
}