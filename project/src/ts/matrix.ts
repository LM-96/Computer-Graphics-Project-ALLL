import {AbstractFunctionalObject, Couple, coupleOf} from "./types";

type Row<T> = Array<T>
type Column<T> = Array<T>

/**
 * An exception that is thrown when has been request access to an invalid row
 */
export class IllegalRowIndexException extends Error {

    constructor(triedRowIndex: number, maxAllowedRowIndex: number|null = null) {
        let msg: string
        if(maxAllowedRowIndex != null) {
            msg = "invalid index [" + triedRowIndex + "] for row:  the index MUST be between [0] and [" +
                maxAllowedRowIndex + "]"
        } else {
            msg = "invalid index [" + triedRowIndex + "]"
        }
        super(msg);
        Object.setPrototypeOf(this, IllegalRowIndexException.prototype)
    }

}

/**
 * An exception that is thrown when has been request access to an invalid column
 */
export class IllegalColumnIndexException extends Error {

    constructor(triedColumnIndex: number, maxAllowedColumnIndex: number|null = null) {
        let msg: string
        if(maxAllowedColumnIndex != null) {
            msg = "invalid index [" + triedColumnIndex + "] for column: the index MUST be between [0] and [" +
                maxAllowedColumnIndex + "]"
        } else {
            msg = "invalid index [" + triedColumnIndex + "]"
        }
        super(msg);
        Object.setPrototypeOf(this, IllegalColumnIndexException.prototype)
    }

}

/**
 * An exception that is thrown when a row is not valid for a reason
 */
export class InvalidRowException extends Error {

    constructor(row: Row<any>, reason: string) {
        super("invalid row {" + row + "}: " + reason);
        Object.setPrototypeOf(this, InvalidRowException.prototype)
    }

}

/**
 * An exception that is thrown when a column is not valid for a reason
 */
export class InvalidColumnException extends Error {

    constructor(column: Column<any>, reason: string) {
        super("invalid column {" + column + "}: " + reason);
        Object.setPrototypeOf(this, InvalidRowException.prototype)
    }

}

/**
 * A NxN Matrix
 */
export class Matrix<T> extends AbstractFunctionalObject<Matrix<T>>{

    #data: Array<Row<T>> = []
    #totColums: number = 0
    #totRows: number = 0

    constructor(data: Array<Row<T>>) {
        super()


        if(data.length > 0) {
            this.#totRows = data.length
            this.#totColums = data[0].length
            for(let row of data) {
                if(row.length != this.#totColums) {
                    throw Error("every row must have the same number of elements")
                }
            }

            this.#data = data
        }
    }

    /**
     * Returns a couple which contains the size of the matrix.
     * In particular:
     * - the **first** element is the number of the **rows**
     * - the **second** element is the number of the **columns**
     */
    size(): Couple<number> {
        return coupleOf(this.#totRows, this.#totColums)
    }

    /**
     * Returns the number of the rows of this matrix
     */
    rowSize() : number {
        return this.#totRows
    }

    /**
     * Returns the number of the columns of this matrix
     */
    columSize(): number {
        return this.#totColums
    }

    /**
     * Returns the number of the elements in this matrix
     */
    elementSize(): number {
        return this.#totRows * this.#totColums
    }

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
        if(rowIndex < 0 || rowIndex >= this.#totRows) {
            if(throwError) {
                throw new IllegalRowIndexException(rowIndex, this.#totRows - 1)
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
        if(columnIndex < 0 || columnIndex >= this.#totRows) {
            if(throwError) {
                throw new IllegalRowIndexException(columnIndex, this.#totRows - 1)
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
        if(this.checkValidRowIndex(rowIndex, throwError))
            return this.checkValidColumnIndex(columnIndex, throwError)
        return false
    }

    /**
     * Get the element in the position specified by the indexes given as argument
     * @param rowIndex the index of the **row**
     * @param columnIndex the index of the **column**
     * @return {number} the element of the matrix in the specified position
     * @throws {IllegalRowIndexException} if the index of the row is not valid
     * @throws {IllegalColumnIndexException} if the index of the column is not valid
     */
    get(rowIndex: number, columnIndex: number): T {
        this.checkValidIndexes(rowIndex, columnIndex, true)
        return this.#data[rowIndex][columnIndex]
    }

    /**
     * Set the element in the position specified by the indexes given as argument
     * @param value the new value for the element
     * @param rowIndex the index of the **row**
     * @param columnIndex the index of the **column**
     * @throws {IllegalRowIndexException} if the index of the row is not valid
     * @throws {IllegalColumnIndexException} if the index of the column is not valid
     */
    set(value: T, rowIndex: number, columnIndex: number) {
        this.checkValidIndexes(rowIndex, columnIndex, true)
        this.#data[rowIndex][columnIndex] = value
    }

    /**
     * Adds a row to this matrix by appending it at the bottom.
     * The added row will be the **last** one of the matrix
     * @param {Row<number>} row the row to be added
     * @throws {InvalidRowException} if the number of the elements of the given row is not the same
     * of the columns of this matrix
     */
    addRow(row: Row<T>) {
        if(row.length != this.#totColums) {
            throw new InvalidRowException(row,
                "the number of the element is not the same of the column of the matrix")
        }

        this.#data.push(row)
        this.#totRows++
    }

    /**
     * Removes the last row of this matrix.
     * If the matrix is empty, this method will perform nothing
     */
    removeRow() {
        if(this.#totRows > 0) {
            this.#data.pop()
        }
        this.#totRows--
    }

    /**
     * Get the row at the specified index
     * @param {number} rowIndex the index of the row
     * @throws {IllegalRowIndexException} if the index of the row is not valid
     */
    getRow(rowIndex: number): Row<T> {
        this.checkValidRowIndex(rowIndex, true)
        return Object.assign([], this.#data[rowIndex])
    }

    /**
     * Adds a column to this matrix by appending it at right
     * The added column will be the **last** one of the matrix
     * @param {Column<number>} column the column to be added
     * @throws {InvalidRowException} if the number of the elements of the given column is not the same
     * of the rows of this matrix
     */
    addColumn(column: Column<T>) {
        if (column.length != this.#totRows) {
            throw new InvalidColumnException(column,
                "the number of the element is not the same of the column of the matrix")
        }

        for (let i = 0; i < column.length; i++) {
            this.#data[i].push(column[i])
        }
        this.#totColums++
    }

    /**
     * Removes the last column of this matrix (the one at the right).
     * If the matrix is empty, this method will perform nothing
     */
    removeColumn() {
        if(this.#totColums > 0) {
            for(let row of this.#data) {
                row.pop()
            }
        }
    }

    /**
     * Get the column at the specified index
     * @param {number} columnIndex the index of the row
     * @throws {IllegalRowIndexException} if the index of the row is not valid
     */
    getColumn(columnIndex: number): Column<T> {
        this.checkValidColumnIndex(columnIndex, true)
        let column: Column<T> = []
        for(let element of this.#data) {
            column.push(element[columnIndex])
        }
        return column
    }

    /**
     * Compares the structure of this matrix with the one given as argument.
     * Then, this method returns `true` only if the two matrix have the same number of row
     * and the same number of columns
     * @param other
     */
    sameStructureOf(other: Matrix<T>) {
        return this.#totRows == other.#totRows && this.#totColums == other.#totColums
    }

    /**
     * Returns `true` if the two matrix are equals (contains the same elements)
     * @param {Matrix} other the other matrix
     */
    equals(other: any): boolean {
        if(other != null) {
            if(other instanceof Matrix) {
                if(this.sameStructureOf(other)) {
                    for(let row = 0; row < this.#totRows; row++) {
                        for(let col = 0; col < this.#totColums; col++) {
                            if(this.#data[row][col] !== other.#data[row][col]) {
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
        let res: string = "["
        for(let row of this.#data) {
            res += ("[" + row.join(", ") + "], ")
        }
        res = res.substring(0, res.length - 2) + "]"
        return res
    }
}

type NumMatrix = Matrix<number>