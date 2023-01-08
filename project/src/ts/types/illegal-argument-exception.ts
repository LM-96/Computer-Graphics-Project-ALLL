/**
 * An exception that is thrown when a column is not valid for a reason
 */
export class IllegalArgumentException extends Error {

    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, IllegalArgumentException.prototype)
    }

}