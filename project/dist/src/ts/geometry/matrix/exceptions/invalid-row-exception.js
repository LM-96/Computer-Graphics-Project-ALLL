"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidRowException = void 0;
class InvalidRowException extends Error {
    constructor(row, reason) {
        super("invalid row {" + row + "}: " + reason);
        Object.setPrototypeOf(this, InvalidRowException.prototype);
    }
}
exports.InvalidRowException = InvalidRowException;
//# sourceMappingURL=invalid-row-exception.js.map