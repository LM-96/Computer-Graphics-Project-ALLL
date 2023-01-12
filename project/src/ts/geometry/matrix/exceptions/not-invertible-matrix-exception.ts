/**
 * The reason why is not possible to invert a matrix
 */
export enum NotInvertibleReason {
    NOT_SQUARED, ZERO_DETERMINANT
}

/**
 * An exception that is thrown when a matrix is not invertible
 */
export class NotInvertibleMatrixException extends Error {

    readonly reason: NotInvertibleReason

    constructor(reason: NotInvertibleReason) {
        let msg: string = "this matrix is not invertible: "
        switch (reason) {
            case NotInvertibleReason.NOT_SQUARED: {
                msg += "matrix is not squared"
                break
            }
            case NotInvertibleReason.ZERO_DETERMINANT: {
                msg += "the determinant is 0"
                break
            }
        }

        super(msg);
        this.reason = reason
        Object.setPrototypeOf(this, NotInvertibleMatrixException)
    }

}