import {MatrixData, NumMatrix, Row} from "./matrix-types";
import {IllegalArgumentException} from "../../types/illegal-argument-exception";
import {FlatType, Matrix} from "./matrix";


/**
 * A factory for a type of matrix.
 * Each class which extends `Matrix` should have a *static* factory
 */
export abstract class MatrixFactory {

    /**
     * Creates and returns an empty matrix with the given number of rows and columns
     * @param {number} rows the number of the rows
     * @param {number} columns the number of the columns
     * @return {Matrix<T>} the new empty matrix
     */
    abstract createMatrix<T>(rows: number, columns: number): Matrix<T>
    /**
     * Creates and returns a new matrix with the given number of rows and columns filled
     * with the element given as parameter
     * @param {number} rows the number of the rows
     * @param {number} columns the number of the columns
     * @param {T} fill the element to be used to fill the matrix
     * @return {Matrix<T>} the new matrix
     */
    abstract createMatrix<T>(rows: number, columns: number, fill: T): Matrix<T>

    /**
     * Creates and returns a new matrix starting from a matrix data.
     * The given data **must** be valid in the sense that each row must have the same
     * number of elements of the other ones
     * @param {MatrixData<T>} matrixData the data of the matrix
     * @return {Matrix<T>} the new matrix
     */
    abstract createMatrix<T>(matrixData: MatrixData<T>|Array<Row<T>>|Array<Array<T>>): Matrix<T>

    /**
     * Creates and returns an empty **squared** matrix with the given dimension
     * @param {number} dim the dimension of the squared matrix
     * @return {Matrix<T>} the new empty squared matrix
     */
    createSquaredMatrix<T>(dim: number): Matrix<T>
    /**
     * Creates and returns a new **squared** matrix with the given dimension, filled
     * with the element given as parameter
     * @param {number} dim the dimension of the squared matrix
     * @param {T} fill the element to be used to fill the matrix
     * @return {Matrix<T>} the new squared matrix
     */
    createSquaredMatrix<T>(dim: number, fill: T): Matrix<T>
    createSquaredMatrix<T>(dim: number, fill?: T): Matrix<T> {
        return this.createMatrix<T>(dim, dim, fill)
    }

    /**
     * Creates and returns an empty numerical matrix with the given number of rows and columns
     * @param {number} rows the number of the rows
     * @param {number} columns the number of the columns
     * @return {NumMatrix} the new empty numerical matrix
     */
    createNumberMatrix(rows: number, columns: number): NumMatrix
    /**
     * Creates and returns a new numerical matrix with the given number of rows and columns filled
     * with the element given as parameter
     * @param {number} rows the number of the rows
     * @param {number} columns the number of the columns
     * @param {number} fill the number to be used to fill the matrix
     * @return {NumMatrix} the new numerical matrix
     */
    createNumberMatrix(rows: number, columns: number, fill: number): NumMatrix
    createNumberMatrix(rows: number, columns: number, fill?: number): NumMatrix {
        return this.createMatrix<number>(rows, columns, fill)
    }

    /**
     * Creates and returns an empty **squared and numerical** matrix with the given dimension
     * @param {number} dim the dimension of the squared matrix
     * @return {NumMatrix} the new empty squared and numerical matrix
     */
    createSquaredNumberMatrix(dim: number): NumMatrix
    /**
     * Creates and returns a new **squared and numerical** matrix with the given dimension, filled
     * with the element given as parameter
     * @param {number} dim the dimension of the squared matrix
     * @param {number} fill the number to be used to fill the matrix
     * @return {NumMatrix} the new squared matrix
     */
    createSquaredNumberMatrix(dim: number, fill: number): NumMatrix
    createSquaredNumberMatrix(dim: number, fill?: number): NumMatrix {
        return this.createSquaredMatrix<number>(dim, fill)
    }

    /**
     * Creates and return the identity matrix with the given dimension
     * @param {number} dim the dimension of the identity matrix
     */
    createIdentityMatrix(dim: number): NumMatrix {
        return this.createSquaredNumberMatrix(dim).calculateAndFill(
            (rowIndex: number, columnIndex: number) => {
                if(rowIndex == columnIndex) { return 1 }
                else { return 0 }
            })
    }

    /**
     * Converts a flat array to a matrix by specifying the type of the flat and the numbers of the
     * element of a group. This method performs the opposite operations of `flatten`.
     * Precisely, if `flatType` is:
     *
     * - `FlatType.BY_ROWS` then the elements of the array will be split in groups, each with the
     * dimension specified by `groupSize`; **each group will be a row** of the resulting matrix
     * (for example `[1, 2, 3, 4, 5, 6]` with `groupSize=2` and `flatType=FlatType.BY_ROWS` will make
     * this method returning the matrix `[[1, 2], [3, 4], [5, 6]]`);
     * this means that in this case **`groupSize` will become the number of the columns** of the resulting matrix
     *
     * - `FlatType.BY_COLUMNS` then the elements of the array will be split in groups, each with the
     * dimension specified by `groupSize`; **each group will be a column** of the resulting matrix
     * (for example `[1, 2, 3, 4, 5, 6]` with `groupSize=2` and `flatType=FlatType.BY_COLUMNS` will make
     * this method returning the matrix `[[1, 3, 5], [2, 4, 6]]`);
     * this means that in this case **`groupSize` will become the number of the rows** of the resulting matrix
     * @param array the flat array to be converted into a matrix
     * @param groupSize the number of the elements of each group
     * @param flatType the type of the groups (indicates if each group will be a *row* or a *column*
     * of the new matrix
     */
    createFromFlatten<T>(array: Array<T>, groupSize: number, flatType: FlatType = FlatType.BY_ROWS): Matrix<T> {
        if (array.length % groupSize != 0) {
            throw new IllegalArgumentException(
                "the dimension of the given array is not a multiple of the size of the group")
        }

        let res: Matrix<T>
        switch (flatType) {

            case FlatType.BY_ROWS: {
                let rows: number = array.length / groupSize
                res = this.createMatrix<T>(rows, groupSize)
                for (let i = 0; i < array.length; i++) {
                    res.set(array[i], Math.floor(i / groupSize), groupSize)
                }
                break;
            }

            case FlatType.BY_COLUMNS: {
                let columns: number = array.length / groupSize
                res = this.createMatrix<T>(groupSize, columns)
                for (let i = 0; i < array.length; i++) {
                    res.set(array[i], i % groupSize, Math.floor(i / groupSize))
                }
                break;
            }

        }

        return res
    }

    /**
     * Creates a new matrix starting from another one by transforming each element of the `other` matrix
     * to the elements of the new one by applying the `elementMapper` function
     * @param {Matrix<T>>} other the other matrix
     * @param {element: T, row: number, column: number) => R} elementMapper the function to be applied on each
     * element of the `other` matrix to create the new ones
     * @return {Matrix<R>} the new matrix
     */
    createFromOther<T, R>(other: Matrix<T>, elementMapper: (element: T, row: number, column: number) => R): Matrix<R> {
        let res: Matrix<R> = this.createMatrix(other.rowSize(), other.columnSize())
        for(let r = 0; r < res.rowSize(); r++) {
            for(let c = 0; c < res.columnSize(); c++) {
                res = res.set(elementMapper(other.get(r, c), r, c), r, c)
            }
        }

        return res
    }

    /**
     * Creates and returns a new matrix with the same structure of the `other` given as parameter
     * (with the same number of rows and columns)
     * @param {Matrix<any>} other the other matrix
     * @return {Matrix<T>} the new matrix with the same structure of the `other`
     */
    createWithSameStructureOf<T>(other: Matrix<any>): Matrix<T> {
        return this.createMatrix(other.rowSize(), other.columnSize())
    }
}

import {FrozenRowBasedMatrix} from "./frozen-row-based-matrix";

/**
 * Create a matrix starting from an array of array.
 * Each element of the external array **is considered as a row** of the resulting matrix
 * (so it is an array of row).
 * If the internals array have different sizes, the resulting matrix will have a number of columns
 * that is *the length of the row with the maximum size*: the row with a smaller number of elements
 * will be automatically filled with `undefined` elements to arrive to the size of the column length
 * @param {Array<Array<T>>} array the array of rows
 * @return {Matrix<T>} the nre matrix
 */
export function matrix<T>(array: Array<Array<T>> | MatrixData<T> | Array<Row<T>>): Matrix<T>
/**
 * Create an empty matrix with the given number of rows and columns
 * @param rows the number of the row
 * @param columns the number of the columns
 * @return {Matrix<T>} a new empty matrix
 */
export function matrix<T>(rows: number, columns: number): Matrix<T>
export function matrix<T>(rows: number, columns: number, fill: T): Matrix<T>
export function matrix<T>(arrayOrRows: Array<Array<T>> | MatrixData<T> | Array<Row<T>>|number, columns?: number, fill?: T): Matrix<T>{
    let factory: MatrixFactory = FrozenRowBasedMatrix.factory
    if(typeof  arrayOrRows == "number") {
        return factory.createMatrix(arrayOrRows, columns, fill)
    } else {
        return factory.createMatrix(arrayOrRows)
    }

    /*
    let factory: MatrixFactory = FrozenRowBasedMatrix.factory

    if(arrayOrRows instanceof Array) {
        let rRows = arrayOrRows.length
        let rColumns = Math.max(...arrayOrRows.map((array: Array<T>) => array.length))
        let res: Matrix<T> = factory.createMatrix(rRows, rColumns)
        let currRow: Row<T>

        for(let r = 0; r < rRows; r++) {
            currRow = arrayOrRows[r]
            for(let c = 0; c < currRow.length; c++) {
                res.set(currRow[c], r, c)
            }
        }
        return res

    } else {
        return factory.createMatrix<T>(arrayOrRows as number, columns, fill)
    }*/
}

/**
 * Creates an empty `MatrixData` instance with the given number of `rows` and `columns`.
 * Each element of the returning data will be `null`
 * @param {number} rows the number of rows
 * @param {number} columns the number of columns
 * @return {MatrixData<T>} the new allocated and empty `MatrixData`
 */
export function matrixData<T>(rows: number, columns: number): MatrixData<T>
/**
 * Creates a `MatrixData` instance with the given number of `rows` and `columns`, filled with the
 * given `value`
 * @param {number} rows the number of rows
 * @param {number} columns the number of columns
 * @param {T} fill the value to be used to fill the data
 * @return {MatrixData<T>} the new allocated and filled `MatrixData`
 */
export function matrixData<T>(rows: number, columns: number, fill: T): MatrixData<T>
export function matrixData<T>(rows: number, columns: number, fill?: T): MatrixData<T> {
    let res: MatrixData<T> = new Array<Row<T>>(rows)
    if(fill == undefined) {
        for(let r = 0; r < rows; r++) {
            res[r] = new Array<T>(columns)
        }
    } else {
        let row: Row<T>
        for(let r = 0; r < rows; r++) {
            row = new Array<T>(columns)
            for(let c = 0; c < columns; c++) {
                row[c] = fill
            }
            res[r] = row
        }
    }
    return res
}

/**
 * Checks if the given bi-dimensional array has a valid format to be the internal data af a matrix.
 * This means that the bi-dimensional array given has parameter must have each element that is an
 * array with the same length as the others,
 * If `throwError` is true, this method will throw `IllegalArgumentException` if the given data
 * is not valid instead of returning a boolean
 * @param {Array<Array<T>>|Array<Row<T>>|MatrixData<T>} data the data to be checked
 * @param {boolean} throwError a flag that, if `true` make this method throwing an exception
 * @return {boolean} a boolean that indicates if the data is valid
 * @throws {IllegalArgumentException} if `throwError` is `true` and the data is not valid
 */
export function checkValidMatrixData<T>(data: Array<Array<T>>|Array<Row<T>>|MatrixData<T>,
                                        throwError: boolean = false): boolean {
    let totColumns = data[0].length
    for (let row of data) {
        if (row.length != totColumns) {
            if (throwError) {
                throw new IllegalArgumentException("every row must have the same number of elements")
            }
            return false
        }
    }
    return true
}

/**
 * Creates and returns the identity matrix
 * @param {number} dim the dimension of the matrix to be created
 * @return {NumMatrix} the identity matrix with the specified dimension
 */
export function identityMatrix(dim: number): NumMatrix {
    let res: NumMatrix = matrix<number>(dim, dim, 0)
    for(let i = 0; i < dim; i++) {
        res.set(1, i, i)
    }
    return res
}