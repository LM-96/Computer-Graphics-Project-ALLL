/**
 * An exception that is thrown when has been request access to an invalid row
 */
export class IllegalRowIndexException extends Error {

    constructor(triedRowIndex: number, maxAllowedRowIndex: number | null = null) {
        let msg: string
        if (maxAllowedRowIndex != null) {
            msg = "invalid index [" + triedRowIndex + "] for row:  the index MUST be between [0] and [" +
                maxAllowedRowIndex + "]"
        } else {
            msg = "invalid index [" + triedRowIndex + "]"
        }
        super(msg);
        Object.setPrototypeOf(this, IllegalRowIndexException.prototype)
    }

}