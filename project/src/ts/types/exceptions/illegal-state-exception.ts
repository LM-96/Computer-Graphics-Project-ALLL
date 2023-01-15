/**
 * An exception that is thrown when the state of an object is not valid
 * to perform a certain operation
 */
export class IllegalStateException extends Error {

    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, IllegalStateException.prototype)
    }

}