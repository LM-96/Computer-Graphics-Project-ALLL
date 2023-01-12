"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexOutOfBoundException = void 0;
/**
 * An exception that is thrown when it is tried to access an invalid index/position
 * in somewhere
 */
class IndexOutOfBoundException extends Error {
    constructor(triedIndex) {
        super("invalid index " + triedIndex);
        this.triedIndex = triedIndex;
        Object.setPrototypeOf(this, IndexOutOfBoundException.prototype);
    }
}
exports.IndexOutOfBoundException = IndexOutOfBoundException;
//# sourceMappingURL=index-out-of-bound-exception.js.map