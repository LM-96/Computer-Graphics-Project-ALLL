import {Couple, coupleOf, IllegalArgumentException} from "../../types/types";
import {MatrixData, NumMatrix} from "../../matrix";
import {FlatType, AbstractMatrix} from "./abstract-matrix-old";
import {MatrixFactory} from "./matrix-factory";
import {Column, Row} from "./type-aliases";
import {InvalidRowException} from "./exceptions/invalid-row-exception";
import {InvalidColumnException} from "./exceptions/invalid-column-exception";

/**
 * A NxN Matrix.
 * This class contains also methods that makes sense only if the type of the element is `number`
 * (like `determinant` or `trace`). Check the documentation before using a method and make
 * sure that the matrix contains only numbers before using these kind of methods
 */
export class SimpleRowBasedMatrix<T> extends AbstractMatrix<T> {

    static readonly factory : MatrixFactory = new class extends MatrixFactory {
        createMatrix<T>(rows: number, columns: number): AbstractMatrix<T>;
        createMatrix<T>(rows: number, columns: number, fill: T): AbstractMatrix<T>;
        createMatrix<T>(rows: number, columns: number, fill?: T): AbstractMatrix<T> {
            let data: Array<Row<T>> = Array(rows)
            for (let r = 0; r < rows; r++) {
                data[r] = Array(columns)
                if (fill != null) {
                    for (let c = 0; c < columns; c++) {
                        data[r][c] = fill
                    }
                }
            }
            return new SimpleRowBasedMatrix<T>(data)
        }
    }

    getFactory(): MatrixFactory {
        return SimpleRowBasedMatrix.factory
    }

    readonly #data: MatrixData<T> = []
    #totColumns: number = 0
    #totRows: number = 0


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
                for (let col = 0; col < matrix.#totColumns; col++) {
                    res += (sign * data[0][col] * SimpleRowBasedMatrix.determinant(matrix.getMinor(0, col)))
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
            this.#totColumns = data[0].length
            for (let row of data) {
                if (row.length != this.#totColumns) {
                    throw Error("every row must have the same number of elements")
                }
            }

            this.#data = data
        }
    }



    rowSize(): number {
        return this.#totRows
    }

    columnSize(): number {
        return this.#totColumns
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
        if (this.#totColumns == 0) {
            this.#totColumns = row.length
        } else {
            if (row.length != this.#totColumns) {
                throw new InvalidRowException(row,
                    "the number of the element of the row [" + row.length +
                    "] is not the same of the column of the matrix [" + this.#totColumns + "]")
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
        if (row.length != this.#totColumns) {
            throw new InvalidRowException(row,
                "the number of the element of the row [" + row.length +
                "] is not the same of the column of the matrix [" + this.#totColumns + "]")
        }

        for (let c = 0; c < this.#totColumns; c++) {
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
        this.#totColumns++
    }

    /**
     * Removes the last column of this matrix (the one at the right).
     * If the matrix is empty, this method will perform nothing
     */
    removeColumn() {
        if (this.#totColumns > 0) {
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
     * Adds the given scalar to this matrix.
     * This method will work properly **only if this matrix contains only
     * numbers**: this means that the behaviour of this method is not predictable
     * using different types of matrices
     * @param {number} scalar the scalar to be added
     */
    scalarAdd(scalar: number): NumMatrix {
        let res: SimpleRowBasedMatrix<number> = SimpleRowBasedMatrix.newNumMatrix(this.#totRows, this.#totColumns)
        for (let r = 0; r < this.#totRows; r++) {
            for (let c = 0; c < this.#totColumns; c++) {
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
                this.#totRows + " x " + this.#totColumns + " while the argument has " + other.#totRows +
                " x " + other.#totColumns)
        }
        let res: SimpleRowBasedMatrix<number> = SimpleRowBasedMatrix.newNumMatrix(this.#totRows, this.#totColumns)
        for (let r = 0; r < this.#totRows; r++) {
            for (let c = 0; c < this.#totColumns; c++) {
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
        let res: SimpleRowBasedMatrix<number> = SimpleRowBasedMatrix.newNumMatrix(this.#totRows, this.#totColumns, 0)
        for (let r = 0; r < this.#totRows; r++) {
            for (let c = 0; c < this.#totColumns; c++) {
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
        if (this.#totColumns != this.#totRows) {
            throw new IllegalArgumentException("illegal matrix to be multiplied: this matrix has columns " +
                this.#totColumns + " while the argument has rows " + other.#totRows)
        }

        let res: SimpleRowBasedMatrix<number> = SimpleRowBasedMatrix.newNumMatrix(this.#totRows, other.#totColumns, 0)
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
              bottomRow: number = this.#totRows - 1, rightColumn: number = this.#totColumns - 1): SimpleRowBasedMatrix<T> {
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
        if (leftColumn >= this.#totColumns) throw new IllegalArgumentException(
            "left column [" + leftColumn + "] MUST NOT go outside the matrix")
        if (rightColumn >= this.#totColumns) throw new IllegalArgumentException(
            "left column [" + rightColumn + "] MUST NOT go outside the matrix")

        let res: SimpleRowBasedMatrix<T> = SimpleRowBasedMatrix.newMatrix(bottomRow - topRow + 1, rightColumn - leftColumn + 1)
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
    transpose(): SimpleRowBasedMatrix<T> {
        let res: SimpleRowBasedMatrix<T> = SimpleRowBasedMatrix.newMatrix(this.#totColumns, this.#totRows)
        for (let r = 0; r < this.#totRows; r++) {
            for (let c = 0; c < this.#totColumns; c++) {
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
     * @return {SimpleRowBasedMatrix} the matrix with the specified row and column dropped
     * @throws {IllegalRowIndexException} if the index of the row is not valid
     * @throws {IllegalColumnIndexException} if the index of the column is not valid
     */
    getMinor(rowIndex: number, columnIndex: number): SimpleRowBasedMatrix<T> {
        this.checkValidIndexes(rowIndex, columnIndex, true)

        let res: SimpleRowBasedMatrix<T> = SimpleRowBasedMatrix.newMatrix(this.#totRows - 1, this.#totColumns - 1)
        let rR: number = 0
        let cR: number = 0
        for (let r = 0; r < this.#totRows; r++) {
            if (r != rowIndex) {
                cR = 0
                for (let c = 0; c < this.#totColumns; c++) {
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
     * @throws {IllegalArgumentException} if the matrix is not squared (the determinant
     * is not defined to **non-squared** matrix)
     */
    getCofactor(rowIndex: number, columnIndex: number): number {
        this.checkValidIndexes(rowIndex, columnIndex, true)
        return Math.pow(-1, rowIndex + columnIndex) * (this.getMinor(rowIndex, columnIndex).determinant())
    }

    /**
     * Computes and returns the **cofactor matrix** which is the matrix that contains
     * each method of this one replaced with its cofactor
     * @return {NumMatrix} the *cofactor matrix*
     * @throws {IllegalArgumentException} if the matrix is not squared (the determinant
     * is not defined to **non-squared** matrix)
     */
    getCofactorMatrix(): NumMatrix {
        let res: NumMatrix = SimpleRowBasedMatrix.newNumMatrix(this.#totRows, this.#totColumns)
        for(let r = 0; r < this.#totColumns; r++) {
            for(let c = 0; c < this.#totRows; c++) {
                res.#data[r][c] = this.getCofactor(r, c)
            }
        }
        return res
    }

    /**
     * Calculates and returns the determinant of this matrix
     * This method will work properly **only if the two matrix contain only
     * numbers**: this means that the behaviour of this method is not predictable
     * using different types of matrices
     * @return {number} the determinant of the matrix
     * @throws {IllegalArgumentException} if the matrix is not squared (the determinant
     * is not defined to **non-squared** matrix)
     */
    determinant(): number {
        return SimpleRowBasedMatrix.determinant(this as NumMatrix)
    }

    /**
     * Calculates and returns the inverse matrix of this one.
     * This method will work properly **only if the two matrix contain only
     * numbers**: this means that the behaviour of this method is not predictable
     * using different types of matrices
     * @return {NumMatrix} the inverse matrix
     * @throws {NotInvertibleMatrixException} if the matrix is not invertible
     * (it's not squared or had a determinant that is 0)
     */
    invert(): NumMatrix {
        if(!this.isSquared()) {
            throw new NotInvertibleMatrixException(NotInvertibleReason.NOT_SQUARED)
        }
        let determinant: number = this.determinant()
        if(determinant == 0) {
            throw new NotInvertibleMatrixException(NotInvertibleReason.ZERO_DETERMINANT)
        }

        return this.getCofactorMatrix()             /* 1. Take the cofactor matrix */
            .transpose()                            /* 2. Calculate the transposed cofactor matrix (added matrix) */
            .scalarMultiply(1 / determinant) /* 3. Multiply by 1/det */

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
        for (let c = 0; c < this.#totColumns; c++) {
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
    mapRowByRow<R>(mapper: (row: Row<T>, rowIndex: number) => Row<R>): SimpleRowBasedMatrix<R> {
        let result: SimpleRowBasedMatrix<R> = SimpleRowBasedMatrix.newMatrix(this.#totRows, this.#totColumns)
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
    mapColumnByColumn<R>(mapper: (column: Column<T>, columnIndex: number) => Column<R>): SimpleRowBasedMatrix<R> {
        let result: SimpleRowBasedMatrix<R> = SimpleRowBasedMatrix.newMatrix(this.#totRows, this.#totColumns)
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
    mapElementByElement<R>(mapper: (element: T, rowIndex: number, columnIndex: number) => R): SimpleRowBasedMatrix<R> {
        let result: SimpleRowBasedMatrix<R> = SimpleRowBasedMatrix.newMatrix(this.#totRows, this.#totColumns)
        for (let r = 0; r < this.#totRows; r++) {
            for (let c = 0; c < this.#totColumns; c++) {
                result.#data[r][c] = mapper(this.#data[r][c], r, c)
            }
        }
        return result
    }

    /* OBJECT METHODS ******************************************************************************************** */

    /**
     * Returns `true` if the two matrix are equals (contains the same elements)
     * @param {SimpleRowBasedMatrix} other the other matrix
     */
    equals(other: any): boolean {
        if (other != null) {
            if (other instanceof SimpleRowBasedMatrix) {
                if (this.sameStructureOf(other)) {
                    for (let row = 0; row < this.#totRows; row++) {
                        for (let col = 0; col < this.#totColumns; col++) {
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
        let res: string = "Matrix " + this.#totRows + "x" + this.#totColumns + ": ["
        for (let row of this.#data) {
            res += ("[" + row.join(", ") + "], ")
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
    clone(rowIndexesToRemove: Array<Number> = [], columnIndexesToRemove: Array<Number> = []): SimpleRowBasedMatrix<T> {
        let res: SimpleRowBasedMatrix<T>
        if(rowIndexesToRemove.length == 0 && columnIndexesToRemove.length == 0) {
            /* Normal Clone *************************************************** */
            res = SimpleRowBasedMatrix.newMatrix(this.#totRows, this.#totColumns)
            for(let r = 0; r < this.#totRows; r++) {
                for(let c = 0; c < this.#totColumns; c++) {
                    res.#data[r][c] = this.#data[r][c]
                }
            }
        } else {
            res = SimpleRowBasedMatrix.newMatrix(
                this.#totRows - rowIndexesToRemove.length,
                this.#totColumns - columnIndexesToRemove.length)
            let rR: number = 0
            let cR: number = 0
            for(let r = 0; r < this.#totRows; r++) {
                if(!rowIndexesToRemove.includes(r)) {
                    cR = 0
                    for(let c = 0; r < this.#totColumns; c++) {
                        if(!columnIndexesToRemove.includes(c)) {
                            res.#data[rR][cR] = this.#data[r][c]
                            cR++
                        }
                    }
                    rR++
                }
            }
        }

        return res
    }
}