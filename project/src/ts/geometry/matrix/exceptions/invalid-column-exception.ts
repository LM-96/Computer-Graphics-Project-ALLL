/**
 * An exception that is thrown when a column is not valid for a reason
 */
import {Column} from "../matrix-types";

export class InvalidColumnException extends Error {

    constructor(column: Column<any>, reason: string) {
        super("invalid column {" + column + "}: " + reason);
        Object.setPrototypeOf(this, InvalidColumnException.prototype)
    }

}