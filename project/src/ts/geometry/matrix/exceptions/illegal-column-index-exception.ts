/**
 * An exception that is thrown when has been request access to an invalid column
 */
export class IllegalColumnIndexException extends Error {

    constructor(triedColumnIndex: number, maxAllowedColumnIndex: number | null = null) {
        let msg: string
        if (maxAllowedColumnIndex != null) {
            msg = "invalid index [" + triedColumnIndex + "] for column: the index MUST be between [0] and [" +
                maxAllowedColumnIndex + "]"
        } else {
            msg = "invalid index [" + triedColumnIndex + "]"
        }
        super(msg);
        Object.setPrototypeOf(this, IllegalColumnIndexException.prototype)
    }

}