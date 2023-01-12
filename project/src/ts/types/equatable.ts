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