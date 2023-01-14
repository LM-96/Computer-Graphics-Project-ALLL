"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IllegalModificationException = void 0;
/**
 * An exception that is thrown when the modification of a certain value is not allowed
 */
class IllegalModificationException extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, IllegalModificationException.prototype);
    }
}
exports.IllegalModificationException = IllegalModificationException;
//# sourceMappingURL=illegal-modification-exception.js.map