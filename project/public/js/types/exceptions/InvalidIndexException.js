"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidIndexExceptionextends = void 0;
/**
 * An exception that is thrown when it the
 */
class InvalidIndexExceptionextends {
}
exports.InvalidIndexExceptionextends = InvalidIndexExceptionextends;
Error;
{
    constructor(triedColumnIndex, number, maxAllowedColumnIndex, number | null, null);
    {
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
//# sourceMappingURL=InvalidIndexException.js.map