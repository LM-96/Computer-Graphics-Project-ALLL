"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidColumnException = void 0;
class InvalidColumnException extends Error {
    constructor(column, reason) {
        super("invalid column {" + column + "}: " + reason);
        Object.setPrototypeOf(this, InvalidColumnException.prototype);
    }
}
exports.InvalidColumnException = InvalidColumnException;
//# sourceMappingURL=invalid-column-exception.js.map