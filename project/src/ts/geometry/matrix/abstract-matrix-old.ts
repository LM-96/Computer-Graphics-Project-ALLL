import {AbstractFunctionalObject, Couple, coupleOf} from "../../types/types";
import {IllegalRowIndexException} from "./exceptions/illegal-row-index-exception";
import {IllegalColumnIndexException} from "./exceptions/illegal-column-index-exception";
import {Column, NumMatrix, Row} from "./type-aliases";
import {MatrixFactory} from "./matrix-factory";

export enum FlatType {
    BY_ROWS, BY_COLUMNS
}

/**
 * A NxN Matrix.
 * This class contains also methods that makes sense only if the type of the element is `number`
 * (like `determinant` or `trace`). Check the documentation before using a method and make
 * sure that the matrix contains only numbers before using these kind of methods.
 *
 * **Each implementation of this class should also have a *static* and *readonly* instance of `MatrixFactory`**
 * that is the one returned by the `getFactory()` method
 */
export abstract class AbstractMatrix<T> extends AbstractFunctionalObject<AbstractMatrix<T>> {

    /**
     * Returns the factory for this type of matrix
     */
    abstract getFactory(): MatrixFactory

    /* CHECKS **************************************************************************************************** */
    /**
     * Checks if the given `rowIndex` is valid for this matrix.
     * If this method returns `true`, this mean that the index can be used to retrieve
     * a row.
     * If `throwError` is `true`, this method will throw an exception if the index is not valid
     * instead of returning a value
     * @param {number} rowIndex the index to be checked
     * @param throwError a *flag* that, if `true`, make this method throwing an exception
     * in case of invalid index
     * @throws {IllegalRowIndexException} if the index is not valid and `throwError` is set to `true`
     */
    checkValidRowIndex(rowIndex: number, throwError: boolean = false): boolean {
        if (rowIndex < 0 || rowIndex >= this.rowSize()) {
            if (throwError) {
                throw new IllegalRowIndexException(rowIndex, this.rowSize() - 1)
            }
            return true
        }
    }

    /**
     * Checks if the given `columnIndex` is valid for this matrix.
     * If this method returns `true`, this mean that the index can be used to retrieve
     * a column.
     * If `throwError` is `true`, this method will throw an exception if the index is not valid
     * instead of returning a value
     * @param {number} columnIndex the index to be checked
     * @param throwError a *flag* that, if `true`, make this method throwing an exception
     * in case of invalid index
     * @throws {IllegalColumnIndexException} if the index is not valid and `throwError` is set to `true`
     */
    checkValidColumnIndex(columnIndex: number, throwError: boolean = false): boolean {
        if (columnIndex < 0 || columnIndex >= this.columnSize()) {
            if (throwError) {
                throw new IllegalColumnIndexException(columnIndex, this.columnSize() - 1)
            }
            return true
        }
    }

    /**
     * Checks if both of the given `rowIndex` and `columnIndex` are valid for this matrix.
     * If this method returns `true`, this mean that the indexes can be used to retrieve
     * a valid element in this matrix.
     * If `throwError` is `true`, this method will throw an exception if at least one the index is not valid
     * instead of returning a value
     * @param rowIndex the index of the row to be checked
     * @param columnIndex the index of the column to be checked
     * @param throwError  *flag* that, if `true`, make this method throwing an exception
     * in case of one invalid index
     * @throws {IllegalRowIndexException} if the index of the row is not valid and `throwError` is set to `true`
     * @throws {IllegalColumnIndexException} if the index of the column is not valid and `throwError` is set to `true`
     */
    checkValidIndexes(rowIndex: number, columnIndex: number, throwError: boolean = false): boolean {
        if (this.checkValidRowIndex(rowIndex, throwError))
            return this.checkValidColumnIndex(columnIndex, throwError)
        return false
    }

    /**
     * Returns `true` if this matrix is **squared**
     */
    isSquared(): boolean {
        return this.rowSize() === this.columnSize()
    }

    /**
     * Returns `true` if this matrix is diagonal.
     * This method will **work also with non-numerical matrices** by checking
     * if all the elements outside the diagonal are `null`
     */
    isDiagonal(): boolean {
        let element: T
        for (let r = 0; r < this.rowSize(); r++) {
            for (let c = 0; c < this.columnSize(); c++) {
                if (r != c) {
                    element = this.get(r, c)
                    if (element != null && element != 0)
                        return false
                }
            }
        }

        return true
    }

    /**
     * Returns `true` if this matrix is **upper triangular**.
     * This method will **work also with non-numerical matrices** by checking
     * if all the elements upper to the diagonal are `null`
     */
    isUpperTriangular(): boolean {
        let element: T
        for (let r = 0; r < this.rowSize(); r++) {
            for (let c = 0; c < this.columnSize(); c++) {
                if (r > c) {
                    element = this.get(r, c)
                    if (element != null && element != 0)
                        return false
                }
            }
        }

        return true
    }

    /**
     * Returns `true` if this matrix is **upper triangular**.
     * This method will **work also with non-numerical matrices** by checking
     * if all the elements lower to the diagonal are `null`
     */
    isLowerTriangular(): boolean {
        let element: T
        for (let r = 0; r < this.rowSize(); r++) {
            for (let c = 0; c < this.columnSize(); c++) {
                if (r < c) {
                    element = this.get(r, c)
                    if (element != null && element != 0)
                        return false
                }
            }
        }

        return true
    }

    /**
     * Returns `true` if this matrix is **triangular** (*upper* or *lower*).
     * This method will **work also with non-numerical matrices** by checking
     * if all the elements upper or lower to the diagonal are `null`
     */
    isTriangular(): boolean {
        return this.isUpperTriangular() || this.isLowerTriangular()
    }

    /**
     * Returns `true` if this matrix is *invertible*.
     * If this method returns `true`, it is possible to invoke the
     * `invert` method to obtain the *inverse matrix*
     */
    isInvertible(): boolean {
        return this.isSquared() && this.determinant() != 0
    }

    /* COLLECTIONS-LIKE METHODS ********************************************************************************** */

    /**
     * Returns the number of the rows of this matrix
     */
    abstract rowSize(): number

    /**
     * Returns the number of the columns of this matrix
     */
    abstract columnSize(): number

    /**
     * Returns the number of the elements in this matrix
     */
    elementSize(): number {
        return this.rowSize() * this.columnSize()
    }

    /**
     * Returns a couple which contains the size of the matrix.
     * In particular:
     * - the **first** element is the number of the **rows**
     * - the **second** element is the number of the **columns**
     */
    size(): Couple<number> {
        return coupleOf(this.rowSize(), this.columnSize())
    }

    /**
     * Compares the structure of this matrix with the one given as argument.
     * Then, this method returns `true` only if the two matrix have the same number of row
     * and the same number of columns
     * @param other
     */
    sameStructureOf(other: AbstractMatrix<T>) {
        return this.rowSize() == other.rowSize() && this.columnSize() == other.columnSize()
    }

    /**
     * Fills this matrix by overriding all the values with the one given as parameter
     * @param {T} value the value to be used
     */
    fill(value: T) {
        for (let r = 0; r < this.rowSize(); r++) {
            for (let c = 0; r < this.columnSize(); c++) {
                this.set(value, r, c)
            }
        }
    }

    /**
     * Fills this matrix by calculating each element using the `builder` function
     * @param {(rowIndex: number, columnIndex: number) => T} builder the function that
     * let to create each element of the matrix knowing its row and its column
     */
    calculateAndFill(builder: (rowIndex: number, columnIndex: number) => T) {
        for (let r = 0; r < this.rowSize(); r++) {
            for (let c = 0; r < this.columnSize(); c++) {
                this.set(builder(r, c), r, c)
            }
        }
    }

    /* SETTERS AND GETTERS *************************************************************************************** */
    abstract get(rowIndex: number, columnIndex: number): T
    abstract set(value: T, rowIndex: number, columnIndex: number)

    abstract addRow(row: Row<T>)
    abstract removeRow()
    abstract getRow(rowIndex: number): Row<T>
    abstract setRow(row: Row<T>, rowIndex: number)
    abstract removeColumn()
    abstract getColumn(columnIndex: number): Column<T>
    abstract setColumn(column: Column<T>, columnIndex: number)




    abstract scalarAdd(scalar: number): NumMatrix
    abstract matAdd(other: NumMatrix): NumMatrix
    abstract scalarMultiply(scalar: number): NumMatrix
    abstract matMultiply(other: NumMatrix): NumMatrix
    abstract submatrix(topRow: number, leftColumn: number, bottomRow: number): AbstractMatrix<T>
    abstract submatrix(topRow: number, leftColumn: number, bottomRow: number, rightColumn: number): AbstractMatrix<T>
    abstract trace(): number
    abstract transpose(): AbstractMatrix<T>
    abstract getMinor(rowIndex: number, columnIndex: number): AbstractMatrix<T>
    abstract getCofactor(rowIndex: number, columnIndex: number): number
    abstract getCofactorMatrix(): NumMatrix
    abstract determinant(): number
    abstract invert(): NumMatrix

    forEachRow(block: (row: Row<T>, rowIndex: number) => void) {
        for (let r = 0; r < this.rowSize(); r++) {
            block(this.getRow(r), r)
        }
    }

    forEachColumn(block: (column: Column<T>, columnIndex: number) => void) {
        for (let c = 0; c < this.columnSize(); c++) {
            block(this.getColumn(c), c)
        }
    }

    mapRowByRow<R>(mapper: (row: Row<T>, rowIndex: number) => Row<R>): AbstractMatrix<R> {
        let result: AbstractMatrix<R> = this.getFactory().createMatrix(this.rowSize(), this.columnSize())
        for (let r = 0; r < this.rowSize(); r++) {
            result.setRow(mapper(this.getRow(r), r), r)
        }
        return result
    }

    mapColumnByColumn<R>(mapper: (column: Column<T>, columnIndex: number) => Column<R>): AbstractMatrix<R> {
        let result: AbstractMatrix<R> = this.getFactory().createMatrix(this.rowSize(), this.columnSize())
        for (let c = 0; c < this.columnSize(); c++) {
            result.setColumn(mapper(this.getColumn(c), c), c)
        }
        return result
    }

    mapElementByElement<R>(mapper: (element: T, rowIndex: number, columnIndex: number) => R): AbstractMatrix<R> {
        let result: AbstractMatrix<R> = this.getFactory().createMatrix<R>(this.rowSize(), this.columnSize())
        for (let r = 0; r < this.rowSize(); r++) {
            for (let c = 0; c < this.columnSize(); c++) {
                result.set(mapper(this.get(r, c), r, c), r, c)
            }
        }
        return result
    }

    /**
     * Returns `true` if the two matrix are equals (contains the same elements)
     * @param {SimpleRowBasedMatrix} other the other matrix
     */
    equals(other: any): boolean {
        if (other != null) {
            if (other instanceof AbstractMatrix) {
                if (this.sameStructureOf(other)) {
                    for (let row = 0; row < this.rowSize(); row++) {
                        for (let col = 0; col < this.columnSize(); col++) {
                            if (this.get(row, col) !== other.get(row, col)) {
                                return false
                            }
                        }
                    }
                    return true
                }
            }
        }

        return false
    }

    toString(): string {
        let res: string = "Matrix " + this.rowSize() + "x" + this.columnSize() + ": ["
        for(let r = 0; r < this.rowSize(); r++) {
            res += ("[" + this.getRow(r).join(", ") + "], ")
        }
        res = res.substring(0, res.length - 2) + "]"
        return res
    }

    /**
     * Returns a clone of this matrix.
     * This method also allow to specify some rows or column that have to be **dropped** but, by default,
     * it clones the original matrix without drop anything
     * @param {Array<Number>} rowIndexesToRemove the indices of the rows that have to be dropped (empty by default)
     * @param {Array<Number>} columnIndexesToRemove the indices of the columns that have to be
     * dropped (empty by default)
     */
    clone(rowIndexesToRemove: Array<Number> = [],
          columnIndexesToRemove: Array<Number> = []): AbstractMatrix<T> {
        let res: AbstractMatrix<T>
        if(rowIndexesToRemove.length == 0 && columnIndexesToRemove.length == 0) {
            /* Normal Clone *************************************************** */
            res = this.getFactory().createMatrix(this.rowSize(), this.columnSize())
            for(let r = 0; r < this.rowSize(); r++) {
                for(let c = 0; c < this.columnSize(); c++) {
                    res.set(this.get(r, c), r, c)
                }
            }
        } else {
            res = this.getFactory().createMatrix(
                this.rowSize() - rowIndexesToRemove.length,
                this.columnSize() - columnIndexesToRemove.length)
            let rR: number = 0
            let cR: number = 0
            for(let r = 0; r < this.rowSize(); r++) {
                if(!rowIndexesToRemove.includes(r)) {
                    cR = 0
                    for(let c = 0; r < this.columnSize(); c++) {
                        if(!columnIndexesToRemove.includes(c)) {
                            res.set(this.get(r, c), rR, cR)
                            cR++
                        }
                    }
                    rR++
                }
            }
        }

        return res
    }

    /**
     * Flats this matrix to a one dimensional array.
     * Depending on the `flatType` parameter, the returning array has a different order of element:
     *
     * - if `FlatType.BY_ROWS`: the array will contain **each row** of the matrix **concatenated** one
     * after the other
     * - if `FlatType.BY_COLUMNS`: the array will contain **each column** of the matrix **concatenated** one
     * after the other
     * @param {FlatType} flatType the type of the flat (`BY_ROWS` by default)
     */
    flatten(flatType: FlatType = FlatType.BY_ROWS): Array<T> {
        let res: Array<T> = Array(this.elementSize())
        switch (flatType) {
            case FlatType.BY_ROWS: {
                for (let r = 0; r < this.rowSize(); r++) {
                    for (let c = 0; c < this.columnSize(); c++) {
                        res[r * this.columnSize() + c] = this.get(r, c)
                    }
                }
                break;
            }
            case FlatType.BY_COLUMNS: {
                for (let r = 0; r < this.rowSize(); r++) {
                    for (let c = 0; c < this.columnSize(); c++) {
                        res[c * this.rowSize() + r] = this.get(r, c)
                    }
                }
                break;
            }
        }
        return res
    }

}