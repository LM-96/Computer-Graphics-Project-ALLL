"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatrixAlgebra = void 0;
const illegal_argument_exception_1 = require("../../types/exceptions/illegal-argument-exception");
const matrix_1 = require("./matrix");
const not_invertible_matrix_exception_1 = require("./exceptions/not-invertible-matrix-exception");
/**
 * A class with methods to realize operation between matrix following the algebra of matrices
 */
class MatrixAlgebra {
    static add(mat1, mat2OrScalar) {
        let res;
        if (typeof mat2OrScalar == "number") {
            let scalar = mat2OrScalar;
            res = (0, matrix_1.matrix)(mat1.rowSize(), mat1.columnSize());
            for (let r = 0; r < mat1.rowSize(); r++) {
                for (let c = 0; c < mat1.columnSize(); c++) {
                    res.set(mat1.get(r, c) + scalar, r, c);
                }
            }
        }
        else {
            let mat2 = mat2OrScalar;
            if (!mat1.sameStructureOf(mat2)) {
                throw new illegal_argument_exception_1.IllegalArgumentException("illegal matrix to be added: this matrix has size " +
                    mat1.rowSize() + " x " + mat1.columnSize() + " while the argument has " + mat2.rowSize() +
                    " x " + mat2.columnSize());
            }
            res = (0, matrix_1.matrix)(mat1.rowSize(), mat1.columnSize());
            for (let r = 0; r < mat1.rowSize(); r++) {
                for (let c = 0; c < mat1.columnSize(); c++) {
                    res.set(mat1.get(r, c) + mat2.get(r, c), r, c);
                }
            }
        }
        return res;
    }
    static subtract(mat1, mat2OrScalar) {
        let res;
        if (typeof mat2OrScalar == "number") {
            let scalar = mat2OrScalar;
            res = (0, matrix_1.matrix)(mat1.rowSize(), mat1.columnSize());
            for (let r = 0; r < mat1.rowSize(); r++) {
                for (let c = 0; c < mat1.columnSize(); c++) {
                    res.set(mat1.get(r, c) - scalar, r, c);
                }
            }
        }
        else {
            let mat2 = mat2OrScalar;
            if (!mat1.sameStructureOf(mat2)) {
                throw new illegal_argument_exception_1.IllegalArgumentException("illegal matrix to be added: this matrix has size " +
                    mat1.rowSize() + " x " + mat1.columnSize() + " while the argument has " + mat2.rowSize() +
                    " x " + mat2.columnSize());
            }
            res = (0, matrix_1.matrix)(mat1.rowSize(), mat1.columnSize());
            for (let r = 0; r < mat1.rowSize(); r++) {
                for (let c = 0; c < mat1.columnSize(); c++) {
                    res.set(mat1.get(r, c) - mat2.get(r, c), r, c);
                }
            }
        }
        return res;
    }
    static multiply(mat1, mat2OrScalar) {
        let res;
        if (typeof mat2OrScalar == "number") {
            let scalar = mat2OrScalar;
            res = (0, matrix_1.matrix)(mat1.rowSize(), mat1.columnSize());
            for (let r = 0; r < mat1.rowSize(); r++) {
                for (let c = 0; c < mat1.columnSize(); c++) {
                    res.set(mat1.get(r, c) * scalar, r, c);
                }
            }
        }
        else {
            let mat2 = mat2OrScalar;
            if (mat1.columnSize() != mat2.rowSize()) {
                throw new illegal_argument_exception_1.IllegalArgumentException("illegal matrix to be multiplied: this matrix has columns " +
                    mat1.columnSize() + " while the argument has rows " + mat2.rowSize());
            }
            let data = (0, matrix_1.matrixData)(mat1.rowSize(), mat2.columnSize(), 0);
            for (let i = 0; i < mat1.rowSize(); i++) {
                for (let j = 0; j < mat2.columnSize(); j++) {
                    for (let k = 0; k < mat2.rowSize(); k++) {
                        data[i][j] += mat1.get(i, k) * mat2.get(k, j);
                    }
                }
            }
            res = (0, matrix_1.matrix)(data);
        }
        return res;
    }
    static divide(mat1, mat2OrScalar) {
        let res;
        if (typeof mat2OrScalar == "number") {
            let scalar = mat2OrScalar;
            res = (0, matrix_1.matrix)(mat1.rowSize(), mat1.columnSize());
            for (let r = 0; r < mat1.rowSize(); r++) {
                for (let c = 0; c < mat1.columnSize(); c++) {
                    res.set(mat1.get(r, c) / scalar, r, c);
                }
            }
        }
        else {
            let mat2 = mat2OrScalar;
            if (!mat2.isSquared()) {
                throw new illegal_argument_exception_1.IllegalArgumentException("illegal matrix: the second matrix MUST be squared");
            }
            res = this.multiply(mat1, this.invert(mat2));
        }
        return res;
    }
    /**
     * Returns the transposition of the given matrix
     * @param {Matrix<T>} mat the original matrix
     * @return {Matrix<T>} the transposed matrix
     */
    static transpose(mat) {
        let res = (0, matrix_1.matrix)(mat.columnSize(), mat.rowSize());
        for (let r = 0; r < mat.rowSize(); r++) {
            for (let c = 0; c < mat.columnSize(); c++) {
                res.set(mat.get(r, c), c, r);
            }
        }
        return res;
    }
    /**
     * Calculates and returns the determinant of the given matrix
     * This method will work properly **only if the two matrix contain only
     * numbers**: this means that the behaviour of this method is not predictable
     * using different types of matrices and will throw exceptions
     * @param {NumMatrix} matrix the original matrix
     * @return {number} the determinant of the matrix
     * @throws {IllegalArgumentException} if the matrix is not squared (the determinant
     * is not defined to **non-squared** matrix)
     */
    static determinant(matrix) {
        if (!matrix.isSquared()) {
            throw new illegal_argument_exception_1.IllegalArgumentException("this matrix is not squared [size: " + matrix.size().toArray() +
                "]: determinant undefined for non-squared matrix");
        }
        switch (matrix.rowSize()) {
            case 1: {
                return matrix.get(0, 0);
            }
            case 2: {
                return matrix.get(0, 0) * matrix.get(1, 1) - matrix.get(0, 1) * matrix.get(1, 0);
            }
            case 3: {
                return matrix.get(0, 0) * (matrix.get(1, 1) * matrix.get(2, 2) - matrix.get(1, 2) * matrix.get(2, 1)) -
                    matrix.get(0, 1) * (matrix.get(1, 0) * matrix.get(2, 2) - matrix.get(1, 2) * matrix.get(2, 0)) +
                    matrix.get(0, 2) * (matrix.get(1, 0) * matrix.get(2, 1) - matrix.get(1, 1) * matrix.get(2, 0));
            }
            case 4: {
                return matrix.get(0, 0) * matrix.get(1, 1) * matrix.get(2, 2) * matrix.get(3, 3)
                    + matrix.get(0, 0) * matrix.get(1, 2) * matrix.get(2, 3) * matrix.get(3, 1)
                    + matrix.get(0, 0) * matrix.get(1, 3) * matrix.get(2, 1) * matrix.get(3, 2)
                    - matrix.get(0, 0) * matrix.get(1, 3) * matrix.get(2, 2) * matrix.get(3, 1)
                    - matrix.get(0, 0) * matrix.get(1, 2) * matrix.get(2, 1) * matrix.get(3, 3)
                    - matrix.get(0, 0) * matrix.get(1, 1) * matrix.get(2, 3) * matrix.get(3, 2)
                    - matrix.get(0, 1) * matrix.get(1, 0) * matrix.get(2, 2) * matrix.get(3, 3)
                    - matrix.get(0, 2) * matrix.get(1, 0) * matrix.get(2, 3) * matrix.get(3, 1)
                    - matrix.get(0, 3) * matrix.get(1, 0) * matrix.get(2, 1) * matrix.get(3, 2)
                    + matrix.get(0, 3) * matrix.get(1, 0) * matrix.get(2, 2) * matrix.get(3, 1)
                    + matrix.get(0, 2) * matrix.get(1, 0) * matrix.get(2, 1) * matrix.get(3, 3)
                    + matrix.get(0, 1) * matrix.get(1, 0) * matrix.get(2, 3) * matrix.get(3, 2)
                    + matrix.get(0, 1) * matrix.get(1, 2) * matrix.get(2, 0) * matrix.get(3, 3)
                    + matrix.get(0, 2) * matrix.get(1, 3) * matrix.get(2, 0) * matrix.get(3, 1)
                    + matrix.get(0, 3) * matrix.get(1, 1) * matrix.get(2, 0) * matrix.get(3, 2)
                    - matrix.get(0, 3) * matrix.get(1, 2) * matrix.get(2, 0) * matrix.get(3, 1)
                    - matrix.get(0, 2) * matrix.get(1, 1) * matrix.get(2, 0) * matrix.get(3, 3)
                    - matrix.get(0, 1) * matrix.get(1, 3) * matrix.get(2, 0) * matrix.get(3, 2)
                    - matrix.get(0, 1) * matrix.get(1, 2) * matrix.get(2, 3) * matrix.get(3, 0)
                    - matrix.get(0, 2) * matrix.get(1, 3) * matrix.get(2, 1) * matrix.get(3, 0)
                    - matrix.get(0, 3) * matrix.get(1, 1) * matrix.get(2, 2) * matrix.get(3, 0)
                    + matrix.get(0, 3) * matrix.get(1, 2) * matrix.get(2, 1) * matrix.get(3, 0)
                    + matrix.get(0, 2) * matrix.get(1, 1) * matrix.get(2, 3) * matrix.get(3, 0)
                    + matrix.get(0, 1) * matrix.get(1, 3) * matrix.get(2, 2) * matrix.get(3, 0);
            }
            default: {
                let res = 0;
                let sign = 1;
                for (let col = 0; col < matrix.columnSize(); col++) {
                    res += (sign * matrix.get(0, col) * this.determinant(this.minor(matrix, 0, col)));
                    sign *= -1;
                }
                return res;
            }
        }
    }
    /**
     * Returns the trace of this matrix.
     * This method will work properly **only if the two matrix contain only
     * numbers**: this means that the behaviour of this method is not predictable
     * using different types of matrices and will throw exceptions
     * @param {NumMatrix} mat the original matrix
     * @return the trace of this matrix
     * @throws {IllegalArgumentException} if this matrix is not squared
     */
    static trace(mat) {
        if (!mat.isSquared()) {
            throw new illegal_argument_exception_1.IllegalArgumentException("this matrix is not squared [size: " + mat.size().toArray() + "]");
        }
        let res = 0;
        for (let i = 0; i < mat.rowSize(); i++)
            res += mat.get(i, i);
        return res;
    }
    /**
     * Returns the *minor matrix* of the one specified as parameter.
     * The *minor matrix* is the same matrix but with the specified `row` and the specified `column`
     * dropped
     * @param {Matrix<T>} mat the original matrix
     * @param {number} row the index of the row to be dropped
     * @param {number} column the index of the column to be dropped
     * @return {Matrix<T>} the matrix with the specified row and column dropped
     * @throws {IllegalRowIndexException} if the index of the row is not valid for the given matrix
     * @throws {IllegalColumnIndexException} if the index of the column is not valid for the fiven matrix
     */
    static minor(mat, row, column) {
        let res = (0, matrix_1.matrixData)(mat.rowSize() - 1, mat.columnSize() - 1);
        let rR = 0;
        let cR = 0;
        for (let r = 0; r < mat.rowSize(); r++) {
            if (r != row) {
                cR = 0;
                for (let c = 0; c < mat.columnSize(); c++) {
                    if (c != column) {
                        res[rR][cR] = mat.get(r, c);
                        cR++;
                    }
                }
                rR++;
            }
        }
        return (0, matrix_1.matrix)(res);
    }
    /**
     * Calculates and returns the cofactor of the element specified by `row` and `column`
     * of the given matrix.
     * Make sure that the matrix given as parameter **contains only numbers** otherwise
     * this method will throw exceptions
     * @param {NumMatrix} mat the original matrix
     * @param {number} row the index of the row of the element
     * @param {number} column the index of the column of the element
     * @return {number} the *cofactor* of the given matrix for the specified `row` and `column`
     * @throws {IllegalRowIndexException} if the index of the row is not valid
     * @throws {IllegalColumnIndexException} if the index of the column is not valid
     * @throws {IllegalArgumentException} if the matrix is not squared (the determinant
     * is not defined to **non-squared** matrix)
     */
    static cofactor(mat, row, column) {
        mat.checkValidIndexes(row, column, true);
        return Math.pow(-1, row + column) * (this.minor(mat, row, column).determinant());
    }
    /**
     * Computes and returns the **cofactor matrix** which is the matrix that contains
     * each element of the one given as parameter replaced with its cofactor
     * @param {NumMatrix} mat the original matrix
     * @return {NumMatrix} the *cofactor matrix*
     * @throws {IllegalArgumentException} if the matrix is not squared (the determinant
     * is not defined to **non-squared** matrix)
     */
    static cofactorMatrix(mat) {
        let res = (0, matrix_1.matrix)(mat.rowSize(), mat.columnSize());
        for (let r = 0; r < mat.rowSize(); r++) {
            for (let c = 0; c < mat.columnSize(); c++) {
                res.set(this.cofactor(mat, r, c), r, c);
            }
        }
        return res;
    }
    /**
     * Checks if a numeric matrix is invertible and returns the determinant of the given matrix.
     * If the matrix is not invertible, this method will return `undefined`
     *
     * If `throwError` is `true`, this method will throw an error instead of returning the determinant.
     * @param {NumMatrix} mat the matrix
     * @param {boolean} throwError the flag that if `true` make this method throwing an error
     * @return {boolean} the determinant of the matrix or `undefined` if the matrix is not invertible
     * @throws NotInvertibleMatrixException if `throwError` is `true` and the matrix is not invertible
     */
    static checkInvertible(mat, throwError = false) {
        if (!mat.isSquared()) {
            if (throwError)
                throw new not_invertible_matrix_exception_1.NotInvertibleMatrixException(not_invertible_matrix_exception_1.NotInvertibleReason.NOT_SQUARED);
            return undefined;
        }
        let determinant = this.determinant(mat);
        if (determinant == 0) {
            if (throwError)
                throw new not_invertible_matrix_exception_1.NotInvertibleMatrixException(not_invertible_matrix_exception_1.NotInvertibleReason.ZERO_DETERMINANT);
            return undefined;
        }
        return determinant;
    }
    /**
     * Calculates and returns the inverse matrix of the one given as parameter.
     * This method will work properly **only if the two matrix contain only
     * numbers**: this means that the behaviour of this method is not predictable
     * using different types of matrices and will throw exceptions
     * @param {NumMatrix} mat the original matrix
     * @return {NumMatrix} the inverse matrix
     * @throws {NotInvertibleMatrixException} if the matrix is not invertible
     * (it's not squared or had a determinant that is 0)
     */
    static invert(mat) {
        let determinant = this.checkInvertible(mat, true);
        let res;
        res = this.cofactorMatrix(mat); /* 1. Take the cofactor matrix */
        res = this.transpose(res); /* 2. Calculate the transposed cofactor matrix (added matrix) */
        res = this.multiply(res, (1 / determinant)); /* 3. Multiply by 1/det */
        return res;
    }
    /**
     * Returns a function that represents the characteristic polynomial of the
     * given matrix
     * @param {NumMatrix} mat the original matrix
     * @return {((lambda: number) => number)} the function that allow to calculate the characteristic
     * polynomial for a given lambda
     */
    static characteristicPolynomial(mat) {
        if (!mat.isSquared()) {
            throw new illegal_argument_exception_1.IllegalArgumentException("the given matrix is not squared: unable to calculate the " +
                "characteristic polynomial");
        }
        return function (lambda) {
            return MatrixAlgebra.determinant(MatrixAlgebra.subtract(mat, MatrixAlgebra.multiply((0, matrix_1.identityMatrix)(mat.rowSize()), lambda)));
        };
    }
}
exports.MatrixAlgebra = MatrixAlgebra;
//# sourceMappingURL=matrix-algebra.js.map