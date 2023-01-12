/**
 * An exception that is thrown when a row is not valid for a reason
 */
import {Row} from "../matrix-types";

export class InvalidRowException extends Error {

    constructor(row: Row<any>, reason: string) {
        super("invalid row {" + row + "}: " + reason);
        Object.setPrototypeOf(this, InvalidRowException.prototype)
    }

}