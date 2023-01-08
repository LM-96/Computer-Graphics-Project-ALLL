/**
 * An exception that is thrown when the modification of a certain value is not allowed
 */
export class IllegalModificationException extends Error {

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, IllegalModificationException.prototype)
    }

}