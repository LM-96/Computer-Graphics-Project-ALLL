"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IllegalStateException = void 0;
/**
 * An exception that is thrown when the state of an object is not valid
 * to perform a certain operation
 */
class IllegalStateException extends Error {
    constructor(msg) {
        super(msg);
        Object.setPrototypeOf(this, IllegalStateException.prototype);
    }
}
exports.IllegalStateException = IllegalStateException;
//# sourceMappingURL=illegal-state-exception.js.map