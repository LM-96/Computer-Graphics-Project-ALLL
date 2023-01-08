"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IllegalColumnIndexException = void 0;
/**
 * An exception that is thrown when has been request access to an invalid column
 */
class IllegalColumnIndexException extends Error {
    constructor(triedColumnIndex, maxAllowedColumnIndex = null) {
        let msg;
        if (maxAllowedColumnIndex != null) {
            msg = "invalid index [" + triedColumnIndex + "] for column: the index MUST be between [0] and [" +
                maxAllowedColumnIndex + "]";
        }
        else {
            msg = "invalid index [" + triedColumnIndex + "]";
        }
        super(msg);
        Object.setPrototypeOf(this, IllegalColumnIndexException.prototype);
    }
}
exports.IllegalColumnIndexException = IllegalColumnIndexException;
//# sourceMappingURL=illegal-column-index-exception.js.map