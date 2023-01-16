"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositionOutOfLimitException = void 0;
/**
 * The exception for a position that is out of limits
 */
class PositionOutOfLimitException extends Error {
    constructor(point) {
        super("the position " + point.toString() + " is out of limit");
        this.position = point;
        Object.setPrototypeOf(this, PositionOutOfLimitException.prototype);
    }
}
exports.PositionOutOfLimitException = PositionOutOfLimitException;
//# sourceMappingURL=position-out-of-limit-exception.js.map