"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IllegalRowIndexException = void 0;
/**
 * An exception that is thrown when has been request access to an invalid row
 */
class IllegalRowIndexException extends Error {
    constructor(triedRowIndex, maxAllowedRowIndex = null) {
        let msg;
        if (maxAllowedRowIndex != null) {
            msg = "invalid index [" + triedRowIndex + "] for row:  the index MUST be between [0] and [" +
                maxAllowedRowIndex + "]";
        }
        else {
            msg = "invalid index [" + triedRowIndex + "]";
        }
        super(msg);
        Object.setPrototypeOf(this, IllegalRowIndexException.prototype);
    }
}
exports.IllegalRowIndexException = IllegalRowIndexException;
//# sourceMappingURL=illegal-row-index-exception.js.map