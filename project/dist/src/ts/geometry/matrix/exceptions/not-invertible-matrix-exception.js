"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotInvertibleMatrixException = exports.NotInvertibleReason = void 0;
/**
 * The reason why is not possible to invert a matrix
 */
var NotInvertibleReason;
(function (NotInvertibleReason) {
    NotInvertibleReason[NotInvertibleReason["NOT_SQUARED"] = 0] = "NOT_SQUARED";
    NotInvertibleReason[NotInvertibleReason["ZERO_DETERMINANT"] = 1] = "ZERO_DETERMINANT";
})(NotInvertibleReason = exports.NotInvertibleReason || (exports.NotInvertibleReason = {}));
/**
 * An exception that is thrown when a matrix is not invertible
 */
class NotInvertibleMatrixException extends Error {
    constructor(reason) {
        let msg = "this matrix is not invertible: ";
        switch (reason) {
            case NotInvertibleReason.NOT_SQUARED: {
                msg += "matrix is not squared";
                break;
            }
            case NotInvertibleReason.ZERO_DETERMINANT: {
                msg += "the determinant is 0";
                break;
            }
        }
        super(msg);
        this.reason = reason;
        Object.setPrototypeOf(this, NotInvertibleMatrixException);
    }
}
exports.NotInvertibleMatrixException = NotInvertibleMatrixException;
//# sourceMappingURL=not-invertible-matrix-exception.js.map