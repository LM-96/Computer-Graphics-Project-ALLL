import {MatrixData, NumMatrix} from "./matrix-types";
import {IllegalArgumentException} from "../../types/exceptions/illegal-argument-exception";
import {Matrix, identityMatrix, matrix, matrixData} from "./matrix";
import {NotInvertibleMatrixException, NotInvertibleReason} from "./exceptions/not-invertible-matrix-exception";

/**
 * A class with methods to realize operation between matrix following the algebra of matrices
 */
export class MatrixAlgebra {

    /**
     * Adds the given `matrix` with the given scalar and returns the result
     * @param matrix the matrix
     * @param scalar the scala
     * @return the result of the sum
     */
    static add(matrix: NumMatrix, scalar: number): NumMatrix
    /**
     * [`mat1 + mat2`]
     *
     * Adds the two matrices and returns the result
     * @param {NumMatrix} mat1 the first matrix
     * @param {NumMatrix} mat2 the second matrix
     * @return the result of the sum
     */
    static add(mat1: NumMatrix, mat2: NumMatrix): NumMatrix
    static add(mat1: NumMatrix, mat2OrScalar: number|NumMatrix): NumMatrix {
        let res: NumMatrix
        if(typeof mat2OrScalar == "number") {
            let scalar: number = mat2OrScalar
            res = matrix<number>(mat1.rowSize(), mat1.columnSize())
            for(let r = 0; r < mat1.rowSize(); r++) {
                for(let c = 0; c < mat1.columnSize(); c++) {
                    res.set(mat1.get(r, c) + scalar, r, c)
                }
            }
        } else {
            let mat2: NumMatrix = <NumMatrix> mat2OrScalar
            if(!mat1.sameStructureOf(mat2)) {
                throw new IllegalArgumentException("illegal matrix to be added: this matrix has size " +
                    mat1.rowSize() + " x " + mat1.columnSize() + " while the argument has " + mat2.rowSize() +
                    " x " + mat2.columnSize())
            }
            res = matrix<number>(mat1.rowSize(), mat1.columnSize())
            for(let r = 0; r < mat1.rowSize(); r++) {
                for(let c = 0; c < mat1.columnSize(); c++) {
                    res.set(mat1.get(r, c) + mat2.get(r, c), r, c)
                }
            }
        }

        return res
    }

    /**
     * Subtracts the given `matrix` with the given scalar and returns the result
     * @param matrix the matrix
     * @param scalar the scala
     * @return the result of the subtraction
     */
    static subtract(matrix: NumMatrix, scalar: number): NumMatrix
    /**
     * [`mat1 - mat2`]
     *
     * Subtracts the two matrices and returns the result
     * @param {NumMatrix} mat1 the first matrix
     * @param {NumMatrix} mat2 the second matrix
     * @return the result of the subtraction
     */
    static subtract(mat1: NumMatrix, mat2: NumMatrix): NumMatrix
    static subtract(mat1: NumMatrix, mat2OrScalar: number|NumMatrix): NumMatrix {
        let res: NumMatrix
        if(typeof mat2OrScalar == "number") {
            let scalar: number = mat2OrScalar
            res = matrix<number>(mat1.rowSize(), mat1.columnSize())
            for(let r = 0; r < mat1.rowSize(); r++) {
                for(let c = 0; c < mat1.columnSize(); c++) {
                    res.set(mat1.get(r, c) - scalar, r, c)
                }
            }
        } else {
            let mat2: NumMatrix = <NumMatrix> mat2OrScalar
            if(!mat1.sameStructureOf(mat2)) {
                throw new IllegalArgumentException("illegal matrix to be added: this matrix has size " +
                    mat1.rowSize() + " x " + mat1.columnSize() + " while the argument has " + mat2.rowSize() +
                    " x " + mat2.columnSize())
            }
            res = matrix<number>(mat1.rowSize(), mat1.columnSize())
            for(let r = 0; r < mat1.rowSize(); r++) {
                for(let c = 0; c < mat1.columnSize(); c++) {
                    res.set(mat1.get(r, c) - mat2.get(r, c), r, c)
                }
            }
        }

        return res
    }

    /**
     * Multiply the given `matrix` with the given scalar and returns the result
     * @param mat the matrix
     * @param scalar the scalar
     * @return the result of the multiplication
     */
    static multiply(mat: NumMatrix, scalar: number): NumMatrix
    /**
     * [`mat1 * mat2`]
     *
     * Multiply the two matrices and returns the result.
     * The multiplication is the normal matrix multiplication (**rows per column**)
     * @param {NumMatrix} mat1 the first matrix
     * @param {NumMatrix} mat2 the second matrix
     * @return the result of the multiplication
     * @throws {IllegalArgumentException} if the second matrix has not the number of rows equals to the
     * number of columns of the first
     */
    static multiply(mat1: NumMatrix, mat2: NumMatrix): NumMatrix
    static multiply(mat1: NumMatrix, mat2OrScalar: number|NumMatrix): NumMatrix {
        let res: NumMatrix
        if(typeof mat2OrScalar == "number") {
            let scalar: number = mat2OrScalar
            res = matrix<number>(mat1.rowSize(), mat1.columnSize())
            for(let r = 0; r < mat1.rowSize(); r++) {
                for(let c = 0; c < mat1.columnSize(); c++) {
                    res.set(mat1.get(r, c) * scalar, r, c)
                }
            }
        } else {
            let mat2: NumMatrix = <NumMatrix> mat2OrScalar
            if(mat1.columnSize() != mat2.rowSize()) {
                throw new IllegalArgumentException("illegal matrix to be multiplied: this matrix has columns " +
                    mat1.columnSize() + " while the argument has rows " + mat2.rowSize())
            }
            let data: MatrixData<number> = matrixData(mat1.rowSize(), mat2.columnSize(), 0)
            for(let i = 0; i < mat1.rowSize(); i++) {
                for(let j = 0; j < mat2.columnSize(); j++) {
                    for(let k = 0; k < mat2.rowSize(); k++) {
                        data[i][j] += mat1.get(i, k)*mat2.get(k, j)
                    }
                }
            }
            res = matrix(data)
        }

        return res
    }

    /**
     * Divide the given `matrix` with the given scalar and returns the result.
     * @param matrix the matrix
     * @param scalar the scalar
     * @return the result of the multiplication
     */
    static divide(matrix: NumMatrix, scalar: number): NumMatrix
    /**
     * [`mat1 / mat2`]
     *
     * Divide the two matrices and returns the result.
     * The division is the normal matrix division (the first multiplied with the inverse of the second)
     * @param {NumMatrix} mat1 the first matrix
     * @param {NumMatrix} mat2 the second matrix
     * @return the result of the division
     * @throws {IllegalArgumentException} if the second row is not squared of
     * if the second matrix has not the number of rows equals to the
     * number of columns of the first
     */
    static divide(mat1: NumMatrix, mat2: NumMatrix): NumMatrix
    static divide(mat1: NumMatrix, mat2OrScalar: number|NumMatrix): NumMatrix {
        let res: NumMatrix
        if(typeof mat2OrScalar == "number") {
            let scalar: number = mat2OrScalar
            res = matrix<number>(mat1.rowSize(), mat1.columnSize())
            for(let r = 0; r < mat1.rowSize(); r++) {
                for(let c = 0; c < mat1.columnSize(); c++) {
                    res.set(mat1.get(r, c) / scalar, r, c)
                }
            }
        } else {
            let mat2: NumMatrix = <NumMatrix> mat2OrScalar
            if(!mat2.isSquared()) {
                throw new IllegalArgumentException("illegal matrix: the second matrix MUST be squared")
            }

            res = this.multiply(mat1, this.invert(mat2))
        }

        return res
    }

    /**
     * Returns the transposition of the given matrix
     * @param {Matrix<T>} mat the original matrix
     * @return {Matrix<T>} the transposed matrix
     */
    static transpose<T>(mat: Matrix<T>): Matrix<T> {
        let res: Matrix<T> = matrix(mat.columnSize(), mat.rowSize())
        for (let r = 0; r < mat.rowSize(); r++) {
            for (let c = 0; c < mat.columnSize(); c++) {
                res.set(mat.get(r, c), c, r)
            }
        }
        return res
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
    static determinant(matrix: NumMatrix): number {
        if (!matrix.isSquared()) {
            throw new IllegalArgumentException(
                "this matrix is not squared [size: " + matrix.size().toArray() +
                "]: determinant undefined for non-squared matrix")
        }
        switch (matrix.rowSize()) {
            case 1: {
                return matrix.get(0, 0)
            }
            case 2: {
                return matrix.get(0, 0) * matrix.get(1, 1) - matrix.get(0, 1) * matrix.get(1, 0)
            }
            case 3: {
                return matrix.get(0, 0) * (matrix.get(1, 1) * matrix.get(2, 2) - matrix.get(1, 2) * matrix.get(2, 1)) -
                    matrix.get(0, 1) * (matrix.get(1, 0) * matrix.get(2, 2) - matrix.get(1, 2) * matrix.get(2, 0)) +
                    matrix.get(0, 2) * (matrix.get(1, 0) * matrix.get(2, 1) - matrix.get(1, 1) * matrix.get(2, 0))
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
                    + matrix.get(0, 1) * matrix.get(1, 3) * matrix.get(2, 2) * matrix.get(3, 0)
            }
            default: {
                let res: number = 0
                let sign: number = 1
                for (let col = 0; col < matrix.columnSize(); col++) {
                    res += (sign * matrix.get(0, col) * this.determinant(this.minor(matrix, 0, col)))
                    sign *= -1
                }
                return res
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
    static trace(mat: NumMatrix): number {
        if (!mat.isSquared()) {
            throw new IllegalArgumentException("this matrix is not squared [size: " + mat.size().toArray() + "]")
        }

        let res: number = 0
        for (let i = 0; i < mat.rowSize(); i++)
            res += mat.get(i, i)

        return res
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
    static minor<T>(mat: Matrix<T>, row: number, column: number): Matrix<T> {

        let res: MatrixData<T> = matrixData(mat.rowSize() - 1, mat.columnSize() - 1)
        let rR: number = 0
        let cR: number = 0
        for (let r = 0; r < mat.rowSize(); r++) {
            if (r != row) {
                cR = 0
                for (let c = 0; c < mat.columnSize(); c++) {
                    if (c != column) {
                        res[rR][cR] = mat.get(r, c)
                        cR++
                    }
                }
                rR++
            }
        }

        return matrix<T>(res)
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
    static cofactor<T>(mat: NumMatrix, row: number, column: number): number {
        mat.checkValidIndexes(row, column, true)
        return Math.pow(-1, row + column) * (this.minor(mat, row, column).determinant())
    }

    /**
     * Computes and returns the **cofactor matrix** which is the matrix that contains
     * each element of the one given as parameter replaced with its cofactor
     * @param {NumMatrix} mat the original matrix
     * @return {NumMatrix} the *cofactor matrix*
     * @throws {IllegalArgumentException} if the matrix is not squared (the determinant
     * is not defined to **non-squared** matrix)
     */
    static cofactorMatrix<T>(mat: NumMatrix): NumMatrix {
        let res: NumMatrix = matrix(mat.rowSize(), mat.columnSize())
        for(let r = 0; r < mat.rowSize(); r++) {
            for(let c = 0; c < mat.columnSize(); c++) {
                res.set(this.cofactor(mat, r, c), r, c)
            }
        }
        return res
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
    static checkInvertible(mat: NumMatrix, throwError: boolean = false): number {
        if(!mat.isSquared()) {
            if(throwError) throw new NotInvertibleMatrixException(NotInvertibleReason.NOT_SQUARED);
            return undefined
        }
        let determinant: number = this.determinant(mat)
        if(determinant == 0) {
            if(throwError) throw new NotInvertibleMatrixException(NotInvertibleReason.ZERO_DETERMINANT)
            return undefined
        }
        return determinant
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
    static invert(mat: NumMatrix): NumMatrix {
        let determinant = this.checkInvertible(mat, true)

        let res: NumMatrix
        res = this.cofactorMatrix(mat)                  /* 1. Take the cofactor matrix */
        res = this.transpose(res)                       /* 2. Calculate the transposed cofactor matrix (added matrix) */
        res = this.multiply(res, (1/determinant))       /* 3. Multiply by 1/det */
        return res
    }

    /**
     * Returns a function that represents the characteristic polynomial of the
     * given matrix
     * @param {NumMatrix} mat the original matrix
     * @return {((lambda: number) => number)} the function that allow to calculate the characteristic
     * polynomial for a given lambda
     */
    static characteristicPolynomial(mat: NumMatrix): ((lambda: number) => number) {
        if(!mat.isSquared()) {
            throw new IllegalArgumentException("the given matrix is not squared: unable to calculate the " +
                "characteristic polynomial")
        }

        return function (lambda : number): number {
            return MatrixAlgebra.determinant(
                MatrixAlgebra.subtract(mat,
                    MatrixAlgebra.multiply(identityMatrix(mat.rowSize()), lambda)))
        }
    }
}