import {MatrixData, NumMatrix} from "../../matrix";
import {Row} from "./type-aliases";
import {FlatType, AbstractMatrix} from "./abstract-matrix-old";
import {SimpleRowBasedMatrix} from "./simple-row-based-matrix";
import {IllegalArgumentException} from "../../types/illegal-argument-exception";


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
    abstract createMatrix<T>(rows: number, columns: number): AbstractMatrix<T>
    /**
     * Creates and returns a new matrix with the given number of rows and columns filled
     * with the element given as parameter
     * @param {number} rows the number of the rows
     * @param {number} columns the number of the columns
     * @param {T} fill the element to be used to fill the matrix
     * @return {Matrix<T>} the new matrix
     */
    abstract createMatrix<T>(rows: number, columns: number, fill: T): AbstractMatrix<T>
    abstract createMatrix<T>(rows: number, columns: number, fill?: T): AbstractMatrix<T>

    createSquaredMatrix<T>(dim: number): AbstractMatrix<T>
    createSquaredMatrix<T>(dim: number, fill: T): AbstractMatrix<T>
    createSquaredMatrix<T>(dim: number, fill?: T): AbstractMatrix<T> {
        return this.createMatrix<T>(dim, dim, fill)
    }

    createNumberMatrix(rows: number, columns: number): NumMatrix
    createNumberMatrix(rows: number, columns: number, fill: number): NumMatrix
    createNumberMatrix(rows: number, columns: number, fill?: number): NumMatrix {
        return this.createMatrix<number>(rows, columns, fill)
    }

    createSquaredNumberMatrix(dim: number): NumMatrix
    createSquaredNumberMatrix(dim: number, fill: number): NumMatrix
    createSquaredNumberMatrix(dim: number, fill?: number): NumMatrix {
        return this.createSquaredMatrix<number>(dim, fill)
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
    createFromFlatten<T>(array: Array<T>, groupSize: number, flatType: FlatType = FlatType.BY_ROWS): AbstractMatrix<T> {
        if (array.length % groupSize != 0) {
            throw new IllegalArgumentException(
                "the dimension of the given array is not a multiple of the size of the group")
        }

        let res: AbstractMatrix<T>
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
}

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
export function matrix<T>(array: Array<Array<T>> | MatrixData<T> | Array<Row<T>>): AbstractMatrix<T>
/**
 * Create an empty matrix with the given number of rows and columns
 * @param rows the number of the row
 * @param columns the number of the columns
 * @return {Matrix<T>} a new empty matrix
 */
export function matrix<T>(rows: number, columns: number): AbstractMatrix<T>
export function matrix<T>(arrayOrRows: unknown, columns?: number): AbstractMatrix<T>{

    let factory: MatrixFactory = SimpleRowBasedMatrix.factory

    if(arrayOrRows instanceof Array) {
        let rRows = arrayOrRows.length
        let rColumns = Math.max(...arrayOrRows.map((array: Array<T>) => array.length))
        let res: AbstractMatrix<T> = factory.createMatrix(rRows, rColumns)
        let currRow: Row<T>

        for(let r = 0; r < rRows; r++) {
            currRow = arrayOrRows[r]
            for(let c = 0; c < currRow.length; c++) {
                res.set(currRow[c], r, c)
            }
        }
        return res

    } else {
        return factory.createMatrix<T>(arrayOrRows as number, columns)
    }
}