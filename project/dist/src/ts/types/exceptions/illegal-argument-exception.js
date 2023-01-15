"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IllegalArgumentException = void 0;
/**
 * An exception that is thrown when a column is not valid for a reason
 */
class IllegalArgumentException extends Error {
    constructor(msg) {
        super(msg);
        Object.setPrototypeOf(this, IllegalArgumentException.prototype);
    }
}
exports.IllegalArgumentException = IllegalArgumentException;
//# sourceMappingURL=illegal-argument-exception.js.map