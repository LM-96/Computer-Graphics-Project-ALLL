import {AbstractFunctionalObject, Couple, coupleOf, IllegalArgumentException} from "./types";

type Row<T> = Array<T>
type Column<T> = Array<T>

/**
 * An exception that is thrown when has been request access to an invalid row
 */
export class IllegalRowIndexException extends Error {

    constructor(triedRowIndex: number, maxAllowedRowIndex: number | null = null) {
        let msg: string
        if (maxAllowedRowIndex != null) {
            msg = "invalid index [" + triedRowIndex + "] for row:  the index MUST be between [0] and [" +
                maxAllowedRowIndex + "]"
        } else {
            msg = "invalid index [" + triedRowIndex + "]"
        }
        super(msg);
        Object.setPrototypeOf(this, IllegalRowIndexException.prototype)
    }

}

export enum FlatType {
    BY_ROWS, BY_COLUMNS
}

/**
 * An exception that is thrown when has been request access to an invalid column
 */
export class IllegalColumnIndexException extends Error {

    constructor(triedColumnIndex: number, maxAllowedColumnIndex: number | null = null) {
        let msg: string
        if (maxAllowedColumnIndex != null) {
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
 * A NxN Matrix.
 * This class contains also methods that makes sense only if the type of the element is `number`
 * (like `determinant` or `trace`). Check the documentation before using a method and make
 * sure that the matrix contains only numbers before using these kind of methods
 */
export class Matrix<T> extends AbstractFunctionalObject<Matrix<T>> {

    readonly #data: MatrixData<T> = []
    #totColums: number = 0
    #totRows: number = 0

    /**
     * Creates a new empty matrix with the specified numbers of `row` and `column`.
     * This method let the possibility to specify the element to be used to fill the matrix
     * @param {number} rows the number of the rows
     * @param {number} columns the number of the columns
     * @param {T|null} fill the value to be used to fill the matrix
     */
    static newMatrix<T>(rows: number, columns: number, fill: T = null): Matrix<T> {
        let data: Array<Row<T>> = Array(rows)
        for (let r = 0; r < rows; r++) {
            data[r] = Array(columns)
            if (fill != null) {
                for (let c = 0; c < columns; c++) {
                    data[r][c] = fill
                }
            }
        }
        return new Matrix<T>(data)
    }

    /**
     * Creates a new empty matrix of numbers with the specified numbers of `row` and `column`.
     * This method let the possibility to specify the value to be used to fill the matrix (`0` by default)
     * @param {number} rows the number of the rows
     * @param {number} columns the number of the columns
     * @param {T|null} fill the value to be used to fill the matrix
     */
    static newNumMatrix(rows: number, columns: number, fill: number = 0): NumMatrix {
        let data: Array<Row<number>> = Array(rows)
        for (let r = 0; r < rows; r++) {
            data[r] = Array(columns)
            for (let c = 0; c < columns; c++) {
                data[r][c] = fill
            }
        }
        return new Matrix<number>(data)
    }

    /**
     * Creates a new empty **squared** matrix with the specified numbers of `row` and `column`.
     * This method let the possibility to specify the element to be used to fill the matrix
     * @param {number} dim the dimension of the square of the matrix
     * @param {T|null} fill the value to be used to fill the matrix
     */
    static newSquaredMatrix<T>(dim: number, fill: T = null): Matrix<T> {
        return Matrix.newMatrix(dim, dim, fill)
    }

    /**
     * Creates a new empty **squared** matrix of numbers with the specified numbers of `row` and `column`.
     * This method let the possibility to specify the value to be used to fill the matrix (`0` by default)
     * @param {number} dim the dimension of the square of the matrix
     * @param {T|null} fill the value to be used to fill the matrix
     */
    static newSquaredNumMatrix(dim: number, fill: number = 0): NumMatrix {
        return Matrix.newNumMatrix(dim, dim, fill)
    }

    /**
     * Converts a *multi-dimensional* array to a `Matrix` instance.
     * If `clone` is set to `true, the array will be cloned so every change on it
     * will not affect the resulting matrix
     * @param {Array<Array<T>>|MatrixData<T>|Array<Row<T>>} array the data of the matrix
     * intended an array of array which contains each row of the matrix
     * @param {boolean} cloned a flag that if `true` makes this method cloning the given data in order
     * to prevent inconsistent changes between the `array` given as parameter and the resulting matrix
     * @return the new matrix
     */
    static asMatrix<T>(array: Array<Array<T>> | MatrixData<T> | Array<Row<T>>, cloned: boolean = false): Matrix<T> {
        let data: MatrixData<T>
        if (cloned) {
            data = Array(array.length)
            for (let r = 0; r < array.length; r++) {
                data[r] = Array(array[r].length)
                for (let c = 0; c < array[0].length; c++) {
                    data[r][c] = array[r][c]
                }
            }
        } else {
            data = array
        }
        return new Matrix(data)
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
    static flattenAsMatrix<T>(array: Array<T>, groupSize: number, flatType: FlatType = FlatType.BY_ROWS): Matrix<T> {
        if (array.length % groupSize != 0) {
            throw new IllegalArgumentException(
                "the dimension of the given array is not a multiple of the size of the group")
        }

        let res: Matrix<T>
        switch (flatType) {

            case FlatType.BY_ROWS: {
                let rows: number = array.length / groupSize
                res = Matrix.newMatrix(rows, groupSize)
                for (let i = 0; i < array.length; i++) {
                    res.#data[Math.floor(i / groupSize)][i % groupSize] = array[i]
                }
                break;
            }

            case FlatType.BY_COLUMNS: {
                let columns: number = array.length / groupSize
                res = Matrix.newMatrix(groupSize, columns)
                for (let i = 0; i < array.length; i++) {
                    res.#data[i % groupSize][Math.floor(i / groupSize)] = array[i]
                }
                break;
            }

        }

        return res
    }

    /**
     * Calculates and return the determinant of a numeric matrix
     * @param {NumMatrix} matrix the matrix
     * @throws {IllegalArgumentException} if the matrix is not squared (the determinant
     * is not defined to **non-squared** matrix)
     */
    static determinant(matrix: NumMatrix): number {
        if (!matrix.isSquared()) {
            throw new IllegalArgumentException(
                "this matrix is not squared [size: " + matrix.size().toArray() +
                "]: determinant undefined for non-squared matrix")
        }
        let data: MatrixData<number> = matrix.#data
        switch (matrix.#totRows) {
            case 1: {
                return data[0][0]
            }
            case 2: {
                return data[0][0] * data[1][1] - data[0][1] * data[1][0]
            }
            case 3: {
                return data[0][0] * (data[1][1] * data[2][2] - data[1][2] * data[2][1]) -
                    data[0][1] * (data[1][0] * data[2][2] - data[1][2] * data[2][0]) +
                    data[0][2] * (data[1][0] * data[2][1] - data[1][1] * data[2][0])
            }
            case 4: {
                return data[0][0] * data[1][1] * data[2][2] * data[3][3]
                    + data[0][0] * data[1][2] * data[2][3] * data[3][1]
                    + data[0][0] * data[1][3] * data[2][1] * data[3][2]

                    - data[0][0] * data[1][3] * data[2][2] * data[3][1]
                    - data[0][0] * data[1][2] * data[2][1] * data[3][3]
                    - data[0][0] * data[1][1] * data[2][3] * data[3][2]

                    - data[0][1] * data[1][0] * data[2][2] * data[3][3]
                    - data[0][2] * data[1][0] * data[2][3] * data[3][1]
                    - data[0][3] * data[1][0] * data[2][1] * data[3][2]

                    + data[0][3] * data[1][0] * data[2][2] * data[3][1]
                    + data[0][2] * data[1][0] * data[2][1] * data[3][3]
                    + data[0][1] * data[1][0] * data[2][3] * data[3][2]

                    + data[0][1] * data[1][2] * data[2][0] * data[3][3]
                    + data[0][2] * data[1][3] * data[2][0] * data[3][1]
                    + data[0][3] * data[1][1] * data[2][0] * data[3][2]

                    - data[0][3] * data[1][2] * data[2][0] * data[3][1]
                    - data[0][2] * data[1][1] * data[2][0] * data[3][3]
                    - data[0][1] * data[1][3] * data[2][0] * data[3][2]

                    - data[0][1] * data[1][2] * data[2][3] * data[3][0]
                    - data[0][2] * data[1][3] * data[2][1] * data[3][0]
                    - data[0][3] * data[1][1] * data[2][2] * data[3][0]

                    + data[0][3] * data[1][2] * data[2][1] * data[3][0]
                    + data[0][2] * data[1][1] * data[2][3] * data[3][0]
                    + data[0][1] * data[1][3] * data[2][2] * data[3][0]
            }
            default: {
                let res: number = 0
                let sign: number = 1
                for (let col = 0; col < matrix.#totColums; col++) {
                    res += (sign * data[0][col] * Matrix.determinant(matrix.getMinor(0, col)))
                    sign *= -1
                }
                return res
            }
        }
    }

    constructor(data: Array<Row<T>> = []) {
        super()


        if (data.length > 0) {
            this.#totRows = data.length
            this.#totColums = data[0].length
            for (let row of data) {
                if (row.length != this.#totColums) {
                    throw Error("every row must have the same number of elements")
                }
            }

            this.#data = data
        }
    }

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
        if (rowIndex < 0 || rowIndex >= this.#totRows) {
            if (throwError) {
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
        if (columnIndex < 0 || columnIndex >= this.#totRows) {
            if (throwError) {
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
        if (this.checkValidRowIndex(rowIndex, throwError))
            return this.checkValidColumnIndex(columnIndex, throwError)
        return false
    }

    /**
     * Returns `true` if this matrix is **squared**
     */
    isSquared(): boolean {
        return this.#totRows === this.#totColums
    }

    /**
     * Returns `true` if this matrix is diagonal.
     * This method will **work also with non-numerical matrices** by checking
     * if all the elements outside the diagonal are `null`
     */
    isDiagonal(): boolean {
        let element: T
        for (let r = 0; r < this.#totColums; r++) {
            for (let c = 0; c < this.#totRows; c++) {
                if (r != c) {
                    element = this.#data[r][c]
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
        for (let r = 0; r < this.#totColums; r++) {
            for (let c = 0; c < this.#totRows; c++) {
                if (r > c) {
                    element = this.#data[r][c]
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
        for (let r = 0; r < this.#totColums; r++) {
            for (let c = 0; c < this.#totRows; c++) {
                if (r < c) {
                    element = this.#data[r][c]
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

    /* COLLECTIONS-LIKE METHODS ********************************************************************************** */

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
    rowSize(): number {
        return this.#totRows
    }

    /**
     * Returns the number of the columns of this matrix
     */
    columnSize(): number {
        return this.#totColums
    }

    /**
     * Returns the number of the elements in this matrix
     */
    elementSize(): number {
        return this.#totRows * this.#totColums
    }

    /**
     * Fills this matrix by overriding all the values with the one given as parameter
     * @param {T} value the value to be used
     */
    fill(value: T) {
        for (let r = 0; r < this.#totRows; r++) {
            for (let c = 0; r < this.#totColums; c++) {
                this.#data[r][c] = value
            }
        }
    }

    /**
     * Fills this matrix by calculating each element using the `builder` function
     * @param {(rowIndex: number, columnIndex: number) => T} builder the function that
     * let to create each element of the matrix knowing its row and its column
     */
    calculateAndFill(builder: (rowIndex: number, columnIndex: number) => T) {
        for (let r = 0; r < this.#totRows; r++) {
            for (let c = 0; r < this.#totColums; c++) {
                this.#data[r][c] = builder(r, c)
            }
        }
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
                for (let r = 0; r < this.#totRows; r++) {
                    for (let c = 0; c < this.#totColums; c++) {
                        res[r * this.#totColums + c] = this.#data[r][c]
                    }
                }
                break;
            }
            case FlatType.BY_COLUMNS: {
                for (let r = 0; r < this.#totRows; r++) {
                    for (let c = 0; c < this.#totColums; c++) {
                        res[c * this.#totRows + r] = this.#data[r][c]
                    }
                }
                break;
            }
        }
        return res
    }

    /* SETTERS AND GETTERS *************************************************************************************** */

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
        if (this.#totColums == 0) {
            this.#totColums = row.length
        } else {
            if (row.length != this.#totColums) {
                throw new InvalidRowException(row,
                    "the number of the element of the row [" + row.length +
                    "] is not the same of the column of the matrix [" + this.#totColums + "]")
            }
        }

        this.#data.push(row)
        this.#totRows++
    }

    /**
     * Removes the last row of this matrix.
     * If the matrix is empty, this method will perform nothing
     */
    removeRow() {
        if (this.#totRows > 0) {
            this.#data.pop()
        }
        this.#totRows--
    }

    /**
     * Get the row at the specified index.
     * Every change on the returning row **will not affect** the internal row
     * in the matrix
     * @param {number} rowIndex the index of the row
     * @throws {IllegalRowIndexException} if the index of the row is not valid
     */
    getRow(rowIndex: number): Row<T> {
        this.checkValidRowIndex(rowIndex, true)
        let row: Row<T> = []
        for (let element of this.#data[rowIndex]) {
            row.push(element)
        }

        return row
    }

    /**
     * Sets the row at the index specified by `rowIndex` with the elements contained in the `row`
     * arguments. All the elements **will be copied** so, every change done on `row` will not
     * affect the matrix
     * @param {Row<T>} row the row from which take the elements
     * @param {number} rowIndex the index of the row to be set
     * @throws {InvalidRowException} if the number of the elements of the given row is not the same
     * of the columns of this matrix
     */
    setRow(row: Row<T>, rowIndex: number) {
        this.checkValidRowIndex(rowIndex, true)
        if (row.length != this.#totColums) {
            throw new InvalidRowException(row,
                "the number of the element of the row [" + row.length +
                "] is not the same of the column of the matrix [" + this.#totColums + "]")
        }

        for (let c = 0; c < this.#totColums; c++) {
            this.#data[rowIndex][c] = row[c]
        }
    }

    /**
     * Adds a column to this matrix by appending it at right
     * The added column will be the **last** one of the matrix
     * @param {Column<number>} column the column to be added
     * @throws {InvalidRowException} if the number of the elements of the given column is not the same
     * of the rows of this matrix
     */
    addColumn(column: Column<T>) {
        if (this.#totRows == 0) {
            this.#totRows = column.length
            for (let i = 0; i < this.#totRows; i++) {
                this.#data[i] = []
            }
        } else {
            if (column.length != this.#totRows) {
                throw new InvalidColumnException(column,
                    "the number of the element is not the same of the column of the matrix")
            }
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
        if (this.#totColums > 0) {
            for (let row of this.#data) {
                row.pop()
            }
        }
    }

    /**
     * Get the column at the specified index.
     * Every change on the returning column **will not affect** the internal row
     * in the matrix
     * @param {number} columnIndex the index of the row
     * @throws {IllegalRowIndexException} if the index of the row is not valid
     */
    getColumn(columnIndex: number): Column<T> {
        this.checkValidColumnIndex(columnIndex, true)
        let column: Column<T> = []
        for (let element of this.#data) {
            column.push(element[columnIndex])
        }
        return column
    }

    /**
     * Sets the column at the index specified by `columnIndex` with the elements contained in the `column`
     * arguments. All the elements **will be copied** so, every change done on `column` will not
     * affect the matrix
     * @param {Column<T>} column the column from which take the elements
     * @param {number} columnIndex the index of the column to be set
     * @throws {InvalidRowException} if the number of the elements of the given column is not the same
     * of the rows of this matrix
     */
    setColumn(column: Column<T>, columnIndex: number) {
        this.checkValidColumnIndex(columnIndex, true)
        if (column.length != this.#totRows) {
            throw new InvalidColumnException(column,
                "the number of the element is not the same of the column of the matrix")
        }

        for (let r = 0; r < this.#totRows; r++) {
            this.#data[r][columnIndex] = column[r]
        }
    }

    /* MATRIX ALGEBRA ******************************************************************************************** */

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
     * Adds the given scalar to this matrix.
     * This method will work properly **only if this matrix contains only
     * numbers**: this means that the behaviour of this method is not predictable
     * using different types of matrices
     * @param {number} scalar the scalar to be added
     */
    scalarAdd(scalar: number): NumMatrix {
        let res: Matrix<number> = Matrix.newNumMatrix(this.#totRows, this.#totColums)
        for (let r = 0; r < this.#totRows; r++) {
            for (let c = 0; c < this.#totColums; c++) {
                res.#data[r][c] = (<number>this.#data[r][c]) + scalar
            }
        }
        return res
    }

    /**
     * Adds the given matrix to this using the right matrix addition.
     * This method will work properly **only if the two matrix contain only
     * numbers**: this means that the behaviour of this method is not predictable
     * using different types of matrices
     * @param {Matrix<number>} other the matrix to be added
     * @return {Matrix<number>} the matrix that contains the result of the addition
     * @throws {IllegalArgumentException} if the given matrix has not the same number of rows and the
     * same number of columns of this
     */
    matAdd(other: NumMatrix): NumMatrix {
        if (!this.sameStructureOf(this)) {
            throw new IllegalArgumentException("illegal matrix to be added: this matrix has size " +
                this.#totRows + " x " + this.#totColums + " while the argument has " + other.#totRows +
                " x " + other.#totColums)
        }
        let res: Matrix<number> = Matrix.newNumMatrix(this.#totRows, this.#totColums)
        for (let r = 0; r < this.#totRows; r++) {
            for (let c = 0; c < this.#totColums; c++) {
                res.#data[r][c] = (<number>this.#data[r][c]) + other.#data[r][c]
            }
        }
        return res
    }

    /**
     * Multiply the given scalar to this matrix.
     * This method will work properly **only if this matrix contains only
     * numbers**: this means that the behaviour of this method is not predictable
     * using different types of matrices
     * @param {number} scalar the scalar to be used for the multiplication
     */
    scalarMultiply(scalar: number): NumMatrix {
        let res: Matrix<number> = Matrix.newNumMatrix(this.#totRows, this.#totColums)
        for (let r = 0; r < this.#totRows; r++) {
            for (let c = 0; c < this.#totColums; c++) {
                res.#data[r][c] = (<number>this.#data[r][c]) * scalar
            }
        }
        return res
    }

    /**
     * Multiply the given matrix to this using the right matrix multiplication (rows per columns).
     * This method will work properly **only if the two matrix contain only
     * numbers**: this means that the behaviour of this method is not predictable
     * using different types of matrices
     * @param {Matrix<number>} other the matrix to be used for the multiplication
     * @return {Matrix<number>} the matrix that contains the result of the multiplication
     * @throws {IllegalArgumentException} if the given matrix has not the number of rows equals to the
     * number of columns of this
     */
    matMultiply(other: NumMatrix): NumMatrix {
        if (this.#totColums != this.#totRows) {
            throw new IllegalArgumentException("illegal matrix to be multiplied: this matrix has columns " +
                this.#totColums + " while the argument has rows " + other.#totRows)
        }

        let res: Matrix<number> = Matrix.newNumMatrix(this.#totRows, other.#totColums, 0)
        for (let rT = 0; rT < this.#totRows; rT++) {
            for (let cO = 0; cO < this.#totRows; cO++) {
                for (let rO = 0; rO < other.rowSize(); rO++) {
                    res.#data[rT][cO] += ((<number>this.#data[rT][rO]) * other.#data[rO][cO])
                }
            }
        }
        return res
    }

    /**
     * Extracts a submatrix from this matrix.
     * This method let to specify the border to be used.
     * **The limits passed as arguments will be included into the submatrix**
     * @param {number} topRow the index of the top row of this matrix to be included (it will be the
     * row `0` of the new matrix)
     * @param {number} leftColumn the index of the left column of this matrix to be included (it will be
     * the column `0` of the new matrix
     * @param {number} bottomRow the index of the last row of this matrix to be included (it will be the
     * last row of the new matrix)
     * @param {number} rightColumn the index of the last column of this matrix to be included (it will be
     * the last column of the new matrix)
     * @return {Matrix<T>} the resulting submatrix
     * @throws {IllegalArgumentException} if one limit does not make sense (it's out of the matrix or
     * is not valid with the specular one)
     */
    submatrix(topRow: number, leftColumn: number,
              bottomRow: number = this.#totRows - 1, rightColumn: number = this.#totColums - 1): Matrix<T> {
        // Check all >= 0
        if (topRow < 0) throw new IllegalArgumentException("top row [" + topRow + "] MUST be greater than 0")
        if (bottomRow < 0) throw new IllegalArgumentException("bottom row [" + bottomRow + "] MUST be greater than 0")
        if (rightColumn < 0) throw new IllegalArgumentException("right column [" + rightColumn + "] MUST be greater than 0")
        if (leftColumn < 0) throw new IllegalArgumentException("left column [" + leftColumn + "] MUST be greater than 0")

        // Check coherence
        if (bottomRow < topRow) throw new IllegalArgumentException(
            "bottom row [" + bottomRow + "] must be greater than top row [" + topRow + "]")
        if (rightColumn < leftColumn) throw new IllegalArgumentException(
            "right column [" + rightColumn + "] must be greater than left column [" + leftColumn + "]")

        //Check inside matrix
        if (topRow >= this.#totRows) throw new IllegalArgumentException(
            "top row [" + topRow + "] MUST NOT go outside the matrix")
        if (bottomRow >= this.#totRows) throw new IllegalArgumentException(
            "bottom row [" + bottomRow + "] MUST NOT go outside the matrix")
        if (leftColumn >= this.#totColums) throw new IllegalArgumentException(
            "left column [" + leftColumn + "] MUST NOT go outside the matrix")
        if (rightColumn >= this.#totColums) throw new IllegalArgumentException(
            "left column [" + rightColumn + "] MUST NOT go outside the matrix")

        let res: Matrix<T> = Matrix.newMatrix(bottomRow - topRow + 1, rightColumn - leftColumn + 1)
        for (let r = topRow; r <= bottomRow; r++) {
            for (let c = leftColumn; c <= rightColumn; c++) {
                res.#data[r - topRow][c - leftColumn] = this.#data[r][c]
            }
        }
        return res
    }

    /**
     * Returns the trace of this matrix.
     * This method will work properly **only if the two matrix contain only
     * numbers**: this means that the behaviour of this method is not predictable
     * using different types of matrices
     * @return the trace of this matrix
     * @throws {IllegalArgumentException} if this matrix is not squared
     */
    trace(): number {
        if (!this.isSquared()) {
            throw new IllegalArgumentException("this matrix is not squared [size: " + this.size().toArray() + "]")
        }

        let res: number = 0
        for (let i = 0; i < this.#totRows; i++)
            res += (<number>this.#data[i][i])

        return res
    }

    /**
     * Returns the transposition of this matrix
     */
    transpose(): Matrix<T> {
        let res: Matrix<T> = Matrix.newMatrix(this.#totColums, this.#totRows)
        for (let r = 0; r < this.#totRows; r++) {
            for (let c = 0; c < this.#totColums; c++) {
                res.#data[c][r] = this.#data[r][c]
            }
        }
        return res
    }

    /**
     * Returns the *minor matrix* that is this matrix with the specified row and the specified
     * column **dropped**
     * @param {number} rowIndex the index of the row to be dropped
     * @param {number} columnIndex the index of the column to be dropped
     * @return {Matrix} the matrix with the specified row and column dropped
     * @throws {IllegalRowIndexException} if the index of the row is not valid
     * @throws {IllegalColumnIndexException} if the index of the column is not valid
     */
    getMinor(rowIndex: number, columnIndex: number): Matrix<T> {
        this.checkValidIndexes(rowIndex, columnIndex, true)

        let res: Matrix<T> = Matrix.newMatrix(this.#totRows - 1, this.#totColums - 1)
        let rR: number = 0
        let cR: number = 0
        for (let r = 0; r < this.#totRows; r++) {
            if (r != rowIndex) {
                cR = 0
                for (let c = 0; c < this.#totColums; c++) {
                    if (c != columnIndex) {
                        res.#data[rR][cR] = this.#data[r][c]
                        cR++
                    }
                }
                rR++
            }
        }

        return res
    }

    /**
     * Calculates and returns the cofactor of the element specified by `rowIndex` and `columnIndex`
     * of this matrix
     * @param {number} rowIndex the index of the row of the element
     * @param {number} columnIndex the index of the column of the element
     * @throws {IllegalRowIndexException} if the index of the row is not valid
     * @throws {IllegalColumnIndexException} if the index of the column is not valid
     */
    getCofactor(rowIndex: number, columnIndex: number): number {
        this.checkValidIndexes(rowIndex, columnIndex, true)
        return Math.pow(-1, rowIndex + columnIndex) * (this.getMinor(rowIndex, columnIndex).determinant())
    }

    /**
     * Calculates and returns the determinant of this matrix
     * This method will work properly **only if the two matrix contain only
     * numbers**: this means that the behaviour of this method is not predictable
     * using different types of matrices
     */
    determinant(): number {
        return Matrix.determinant(this as NumMatrix)
    }

    /* FUNCTIONAL ************************************************************************************************ */

    /**
     * Executes the given block over each row of this matrix.
     * The row passed as parameter to the `block` function is a copy of the internal one,
     * so every change done using `block` **will not affect** the internal matrix
     * @param {(row: Row<T>, rowIndex: number) => void} block the function to be executed over each row
     * of this matrix
     */
    forEachRow(block: (row: Row<T>, rowIndex: number) => void) {
        for (let r = 0; r < this.#totRows; r++) {
            block(this.getRow(r), r)
        }
    }

    /**
     * Executes the given block over each column of this matrix.
     * The column passed as parameter to the `block` function is a copy of the internal one,
     * so every change done using `block` **will not affect** the internal matrix
     * @param {(column: Column<T>, columnIndex: number) => void} block the function to be
     * executed over each column of this matrix
     */
    forEachColumn(block: (column: Column<T>, columnIndex: number) => void) {
        for (let c = 0; c < this.#totColums; c++) {
            block(this.getColumn(c), c)
        }
    }

    /**
     * Maps this matrix *row-by-row*, by applying the `mapper` function on each row
     * of this matrix and using the result of this as the new row with the same index
     * of the resulting matrix
     * @param {(row: Row<T>, rowIndex: number) => Row<R>} mapper the function that
     * transforms each row of the matrix
     * @return {Matrix<R>} the new matrix
     */
    mapRowByRow<R>(mapper: (row: Row<T>, rowIndex: number) => Row<R>): Matrix<R> {
        let result: Matrix<R> = Matrix.newMatrix(this.#totRows, this.#totColums)
        for (let r = 0; r < this.#totRows; r++) {
            result.setRow(mapper(this.getRow(r), r), r)
        }
        return result
    }

    /**
     * Maps this matrix *column-by-column*, by applying the `mapper` function on each column
     * of this matrix and using the result of this as the new column with the same index
     * of the resulting matrix
     * @param {(column: Column<T>, columnIndex: number) => Column<R>} mapper the function that
     * transforms each column of the matrix
     * @return {Matrix<R>} the new matrix
     */
    mapColumnByColumn<R>(mapper: (column: Column<T>, columnIndex: number) => Column<R>): Matrix<R> {
        let result: Matrix<R> = Matrix.newMatrix(this.#totRows, this.#totColums)
        for (let c = 0; c < this.#totRows; c++) {
            result.setColumn(mapper(this.getColumn(c), c), c)
        }
        return result
    }

    /**
     * Maps this matrix *element-by-element*, by applying the `mapper` function on each element
     * of this matrix and using the result of this as the new element with the same indexes
     * of the resulting matrix
     * @param {(element: T, rowIndex: number, columnIndex: number) => R} mapper the function that
     * transforms each element of the matrix
     * @return {Matrix<R>} the new matrix
     */
    mapElementByElement<R>(mapper: (element: T, rowIndex: number, columnIndex: number) => R): Matrix<R> {
        let result: Matrix<R> = Matrix.newMatrix(this.#totRows, this.#totColums)
        for (let r = 0; r < this.#totRows; r++) {
            for (let c = 0; c < this.#totColums; c++) {
                result.#data[r][c] = mapper(this.#data[r][c], r, c)
            }
        }
        return result
    }

    /* OBJECT METHODS ******************************************************************************************** */

    /**
     * Returns `true` if the two matrix are equals (contains the same elements)
     * @param {Matrix} other the other matrix
     */
    equals(other: any): boolean {
        if (other != null) {
            if (other instanceof Matrix) {
                if (this.sameStructureOf(other)) {
                    for (let row = 0; row < this.#totRows; row++) {
                        for (let col = 0; col < this.#totColums; col++) {
                            if (this.#data[row][col] !== other.#data[row][col]) {
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
        let res: string = "Matrix " + this.#totRows + "x" + this.#totColums + ": ["
        for (let row of this.#data) {
            res += ("[" + row.join(", ") + "], ")
        }
        res = res.substring(0, res.length - 2) + "]"
        return res
    }
}

/**
 * A matrix of numbers
 */
type NumMatrix = Matrix<number>

/**
 * The type for the internal data of a matrix
 */
type MatrixData<T> = Array<Row<T>>