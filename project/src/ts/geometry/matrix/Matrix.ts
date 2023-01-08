import {MatrixFactory} from "./matrix-factory";
import {Couple} from "../../types/types";
import {Column, NumMatrix, Row} from "./type-aliases";
import {FlatType} from "./abstract-matrix-old";

export interface Matrix<T> {

    /**
     * Returns the factory for this type of matrix
     */
    getFactory(): MatrixFactory

    /* CHECKS *********************************************************************************************************/

    /**
     * Checks if the given `rowIndex` is valid for this matrix.
     * If this method returns `true`, this mean that the index can be used to retrieve
     * a row
     * @param {number} rowIndex the index to be checked
     * @throws {IllegalRowIndexException} if the index is not valid and `throwError` is set to `true`
     */
    checkValidRowIndex(rowIndex: number): boolean
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
    checkValidRowIndex(rowIndex: number, throwError: boolean): boolean

    /**
     * Checks if the given `columnIndex` is valid for this matrix.
     * If this method returns `true`, this mean that the index can be used to retrieve
     * a column
     * @param {number} columnIndex the index to be checked
     * @throws {IllegalColumnIndexException} if the index is not valid and `throwError` is set to `true`
     */
    checkValidColumnIndex(columnIndex: number): boolean
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
    checkValidColumnIndex(columnIndex: number, throwError: boolean): boolean

    /**
     * Checks if both of the given `rowIndex` and `columnIndex` are valid for this matrix.
     * If this method returns `true`, this mean that the indexes can be used to retrieve
     * a valid element in this matrix
     * @param rowIndex the index of the row to be checked
     * @param columnIndex the index of the column to be checked
     * @throws {IllegalRowIndexException} if the index of the row is not valid and `throwError` is set to `true`
     * @throws {IllegalColumnIndexException} if the index of the column is not valid and `throwError` is set to `true`
     */
    checkValidIndexes(rowIndex: number, columnIndex: number): boolean
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
    checkValidIndexes(rowIndex: number, columnIndex: number, throwError: boolean): boolean

    /* MATRIX INFORMATION *********************************************************************************************/

    /**
     * Returns `true` if this matrix is **squared**
     */
    isSquared(): boolean

    /**
     * Returns `true` if this matrix is diagonal.
     * This method will **work also with non-numerical matrices** by checking
     * if all the elements outside the diagonal are `null`
     */
    isDiagonal(): boolean

    /**
     * Returns `true` if this matrix is **upper triangular**.
     * This method will **work also with non-numerical matrices** by checking
     * if all the elements upper to the diagonal are `null`
     */
    isUpperTriangular(): boolean

    /**
     * Returns `true` if this matrix is **upper triangular**.
     * This method will **work also with non-numerical matrices** by checking
     * if all the elements lower to the diagonal are `null`
     */
    isLowerTriangular(): boolean

    /**
     * Returns `true` if this matrix is **triangular** (*upper* or *lower*).
     * This method will **work also with non-numerical matrices** by checking
     * if all the elements upper or lower to the diagonal are `null`
     */
    isTriangular(): boolean

    /**
     * Returns `true` if this matrix is *invertible*.
     * If this method returns `true`, it is possible to invoke the
     * `invert` method to obtain the *inverse matrix*
     */
    isInvertible(): boolean

    /* COLLECTION_LIKE METHODS ****************************************************************************************/

    /**
     * Returns the number of the rows of this matrix
     */
    rowSize(): number

    /**
     * Returns the number of the columns of this matrix
     */
    columnSize(): number

    /**
     * Returns the number of the elements in this matrix
     */
    elementSize(): number

    /**
     * Returns a couple which contains the size of the matrix.
     * In particular:
     * - the **first** element is the number of the **rows**
     * - the **second** element is the number of the **columns**
     */
    size(): Couple<number>

    /**
     * Compares the structure of this matrix with the one given as argument.
     * Then, this method returns `true` only if the two matrix have the same number of row
     * and the same number of columns
     * @param {Matrix<T>} other the other matrix
     * @return `true` if this matrix has the same structure of the other
    */
    sameStructureOf(other: Matrix<T>): boolean

    /**
     * Fills this matrix by overriding all the values with the one given as parameter
     * @param {T} value the value to be used
     */
    fill(value: T)

    /**
     * Fills this matrix by calculating each element using the `builder` function
     * @param {(rowIndex: number, columnIndex: number) => T} builder the function that
     * let to create each element of the matrix knowing its row and its column
     */
    calculateAndFill(builder: (rowIndex: number, columnIndex: number) => T)


    /* GETTERS/SETTERS ************************************************************************************************/

    /**
     * Get the element in the position specified by the indexes given as argument
     * @param rowIndex the index of the **row**
     * @param columnIndex the index of the **column**
     * @return {number} the element of the matrix in the specified position
     * @throws {IllegalRowIndexException} if the index of the row is not valid
     * @throws {IllegalColumnIndexException} if the index of the column is not valid
     */
    get(rowIndex: number, columnIndex: number): T

    /**
     * Set the element in the position specified by the indexes given as argument
     * @param value the new value for the element
     * @param rowIndex the index of the **row**
     * @param columnIndex the index of the **column**
     * @throws {IllegalRowIndexException} if the index of the row is not valid
     * @throws {IllegalColumnIndexException} if the index of the column is not valid
     */
    set(value: T, rowIndex: number, columnIndex: number)

    /**
     * Get the row at the specified index.
     * Every change on the returning row **will not affect** the internal row
     * in the matrix
     * @param {number} rowIndex the index of the row
     * @throws {IllegalRowIndexException} if the index of the row is not valid
     */
    getRow(rowIndex: number): Row<T>

    /**
     * Sets the row at the index specified by `rowIndex` with the elements contained in the `row`
     * arguments. All the elements **will be copied** so, every change done on `row` will not
     * affect the matrix
     * @param {Row<T>} row the row from which take the elements
     * @param {number} rowIndex the index of the row to be set
     * @throws {InvalidRowException} if the number of the elements of the given row is not the same
     * of the columns of this matrix
     */
    setRow(row: Row<T>, rowIndex: number): Matrix<T>

    /**
     * Get the column at the specified index.
     * Every change on the returning column **will not affect** the internal row
     * in the matrix
     * @param {number} columnIndex the index of the row
     * @throws {IllegalRowIndexException} if the index of the row is not valid
     */
    getColumn(columnIndex: number): Column<T>

    /**
     * Sets the column at the index specified by `columnIndex` with the elements contained in the `column`
     * arguments. All the elements **will be copied** so, every change done on `column` will not
     * affect the matrix
     * @param {Column<T>} column the column from which take the elements
     * @param {number} columnIndex the index of the column to be set
     * @throws {InvalidRowException} if the number of the elements of the given column is not the same
     * of the rows of this matrix
     */
    setColumn(column: Column<T>, columnIndex: number)

    /* MATRIX STRUCTURE MODIFICATION **********************************************************************************/

    /**
     * Adds a row to this matrix by appending it at the bottom.
     * The added row will be the **last** one of the matrix
     * @param {Row<number>} row the row to be added
     * @throws {InvalidRowException} if the number of the elements of the given row is not the same
     * of the columns of this matrix
     */
    addRow(row: Row<T>): Matrix<T>

    /**
     * Adds a column to this matrix by appending it at right
     * The added column will be the **last** one of the matrix
     * @param {Column<number>} column the column to be added
     * @throws {InvalidRowException} if the number of the elements of the given column is not the same
     * of the rows of this matrix
     */
    addColumn(column: Column<T>): Matrix<T>

    /**
     * Removes the last row of this matrix.
     * If the matrix is empty, this method will perform nothing
     */
    removeRow(): Matrix<T>

    /**
     * Removes the last column of this matrix (the one at the right).
     * If the matrix is empty, this method will perform nothing
     */
    removeColumn(): Matrix<T>

    /* MATRIX ALGEBRA *************************************************************************************************/

    /**
     * Adds the given scalar to this matrix.
     * This method will work properly **only if this matrix contains only
     * numbers**: this means that the behaviour of this method is not predictable
     * using different types of matrices
     * @param {number} scalar the scalar to be added
     */
    add(scalar: number): NumMatrix

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
    add(other: NumMatrix): NumMatrix

    /**
     * Subtracts the given scalar to this matrix.
     * This method will work properly **only if this matrix contains only
     * numbers**: this means that the behaviour of this method is not predictable
     * using different types of matrices
     * @param {number} scalar the scalar to use to be subtracted from the elements of this matrix
     */
    subtract(scalar: number): NumMatrix

    /**
     * Subtracts the given matrix to this using the right matrix subtraction.
     * This method will work properly **only if the two matrix contain only
     * numbers**: this means that the behaviour of this method is not predictable
     * using different types of matrices
     * @param {Matrix<number>} other the matrix to be subtracted from this
     * @return {Matrix<number>} the matrix that contains the result of the subtractions
     * @throws {IllegalArgumentException} if the given matrix has not the same number of rows and the
     * same number of columns of this
     */
    subtract(other: NumMatrix): NumMatrix

    /**
     * Multiply this matrix to the given scalar.
     * This method will work properly **only if this matrix contains only
     * numbers**: this means that the behaviour of this method is not predictable
     * using different types of matrices
     * @param {number} scalar the scalar to be used for the multiplication
     */
    multiply(scalar: number): NumMatrix

    /**
     * Multiply this matrix to the one given as parameter using the right matrix multiplication (rows per columns).
     * This method will work properly **only if the two matrix contain only
     * numbers**: this means that the behaviour of this method is not predictable
     * using different types of matrices
     * @param {Matrix<number>} other the matrix to be used for the multiplication
     * @return {Matrix<number>} the matrix that contains the result of the multiplication
     * @throws {IllegalArgumentException} if the given matrix has not the number of rows equals to the
     * number of columns of this
     */
    multiply(other: NumMatrix): NumMatrix

    /**
     * Divides this matrix by the scalar given as parameter.
     * This method will work properly **only if this matrix contains only
     * numbers**: this means that the behaviour of this method is not predictable
     * using different types of matrices
     * @param {number} scalar the scalar to be used for the division
     */
    divide(scalar: number): NumMatrix

    /**
     * Divides this matrix by the one given as parameter using the right matrix division.
     * This method will work properly **only if the two matrix contain only
     * numbers**: this means that the behaviour of this method is not predictable
     * using different types of matrices
     * @param {Matrix<number>} other the matrix to be used for the multiplication
     * @return {Matrix<number>} the matrix that contains the result of the multiplication
     * @throws {IllegalArgumentException} if the given matrix has not the number of rows equals to the
     * number of columns of this
     */
    divide(other: NumMatrix): NumMatrix

    /**
     * Extracts a sub-matrix from this matrix.
     * This method let to specify the upper borders to be used.
     * **The limits passed as arguments will be included into the sub-matrix**
     * @param {number} topRow the index of the top row of this matrix to be included (it will be the
     * row `0` of the new matrix)
     * @param {number} leftColumn the index of the left column of this matrix to be included (it will be
     * the column `0` of the new matrix
     * @return {Matrix<T>} the resulting sub-matrix
     * @throws {IllegalArgumentException} if one limit does not make sense (it's out of the matrix or
     * is not valid with the specular one)
     */
    subMatrix(topRow: number, leftColumn: number): Matrix<T>

    /**
     * Extracts a sub-matrix from this matrix.
     * This method let to specify the borders to be used.
     * **The limits passed as arguments will be included into the sub-matrix**
     * @param {number} topRow the index of the top row of this matrix to be included (it will be the
     * row `0` of the new matrix)
     * @param {number} leftColumn the index of the left column of this matrix to be included (it will be
     * the column `0` of the new matrix
     * @param {number} bottomRow the index of the last row of this matrix to be included (it will be the
     * last row of the new matrix)
     * @param {number} rightColumn the index of the last column of this matrix to be included (it will be
     * the last column of the new matrix)
     * @return {Matrix<T>} the resulting sub-matrix
     * @throws {IllegalArgumentException} if one limit does not make sense (it's out of the matrix or
     * is not valid with the specular one)
     */
    subMatrix(topRow: number, leftColumn: number, bottomRow: number, rightColumn: number): Matrix<T>

    /**
     * Transposes this matrix
     */
    transpose(): Matrix<T>

    /**
     * Inverts this matrix.
     * This method will work properly **only if the two matrix contain only
     * numbers**: this means that the behaviour of this method is not predictable
     * using different types of matrices
     * @return {NumMatrix} the inverse matrix
     * @throws {NotInvertibleMatrixException} if the matrix is not invertible
     * (it's not squared or had a determinant that is 0)
     */
    invert(): NumMatrix

    /**
     * Returns the *minor matrix* that is this matrix with the specified row and the specified
     * column **dropped**
     * @param {number} rowIndex the index of the row to be dropped
     * @param {number} columnIndex the index of the column to be dropped
     * @return {SimpleRowBasedMatrix} the matrix with the specified row and column dropped
     * @throws {IllegalRowIndexException} if the index of the row is not valid
     * @throws {IllegalColumnIndexException} if the index of the column is not valid
     */
    getMinor(rowIndex: number, columnIndex: number): Matrix<T>

    /**
     * Calculates and returns the cofactor of the element specified by `rowIndex` and `columnIndex`
     * of this matrix. This method will work properly **only if this matrix contain only
     * numbers**: this means that the behaviour of this method is not predictable
     * using different types of matrices
     * @param {number} rowIndex the index of the row of the element
     * @param {number} columnIndex the index of the column of the element
     * @throws {IllegalRowIndexException} if the index of the row is not valid
     * @throws {IllegalColumnIndexException} if the index of the column is not valid
     * @throws {IllegalArgumentException} if the matrix is not squared (the determinant
     * is not defined to **non-squared** matrix)
     */
    getCofactor(rowIndex: number, columnIndex: number): number

    /**
     * Computes and returns the **cofactor matrix** which is the matrix that contains
     * each method of this one replaced with its cofactor.
     * This method will work properly **only if this matrix contain only
     * numbers**: this means that the behaviour of this method is not predictable
     * using different types of matrices
     * @return {NumMatrix} the *cofactor matrix*
     * @throws {IllegalArgumentException} if the matrix is not squared (the determinant
     * is not defined to **non-squared** matrix)
     */
    getCofactorMatrix(): NumMatrix

    /**
     * Returns the trace of this matrix.
     * This method will work properly **only if this matrix contain only
     * numbers**: this means that the behaviour of this method is not predictable
     * using different types of matrices
     * @return the trace of this matrix
     * @throws {IllegalArgumentException} if this matrix is not squared
     */
    trace(): number

    /**
     * Calculates and returns the determinant of this matrix
     * This method will work properly **only if this matrix contain only
     * numbers**: this means that the behaviour of this method is not predictable
     * using different types of matrices
     * @return {number} the determinant of the matrix
     * @throws {IllegalArgumentException} if the matrix is not squared (the determinant
     * is not defined to **non-squared** matrix)
     */
    determinant(): number

    /* FUNCTIONAL *****************************************************************************************************/

    /**
     * Executes the given block over each row of this matrix.
     * The row passed as parameter to the `block` function is a copy of the internal one,
     * so every change done using `block` **will not affect** the internal matrix
     * @param {(row: Row<T>, rowIndex: number) => void} block the function to be executed over each row
     * of this matrix
     */
    forEachRow(block: (row: Row<T>, rowIndex: number) => void)

    /**
     * Executes the given block over each column of this matrix.
     * The column passed as parameter to the `block` function is a copy of the internal one,
     * so every change done using `block` **will not affect** the internal matrix
     * @param {(column: Column<T>, columnIndex: number) => void} block the function to be
     * executed over each column of this matrix
     */
    forEachColumn(block: (column: Column<T>, columnIndex: number) => void)

    /**
     * Executes the given block over each element of this matrix.
     * @param {(element: T, rowIndex: number, columnIndex: number) => void} block the function to be
     * executed over each element of this matrix
     */
    forEachElement(block: (element: T, rowIndex: number, columnIndex: number) => void)

    /**
     * Maps this matrix *row-by-row*, by applying the `mapper` function on each row
     * of this matrix and using the result of this as the new row with the same index
     * of the resulting matrix
     * @param {(row: Row<T>, rowIndex: number) => Row<R>} mapper the function that
     * transforms each row of the matrix
     * @return {Matrix<R>} the new matrix
     */
    mapRowByRow<R>(mapper: (row: Row<T>, rowIndex: number) => Row<R>): Matrix<R>

    /**
     * Maps this matrix *column-by-column*, by applying the `mapper` function on each column
     * of this matrix and using the result of this as the new column with the same index
     * of the resulting matrix
     * @param {(column: Column<T>, columnIndex: number) => Column<R>} mapper the function that
     * transforms each column of the matrix
     * @return {Matrix<R>} the new matrix
     */
    mapColumnByColumn<R>(mapper: (column: Column<T>, columnIndex: number) => Column<R>): Matrix<R>

    /**
     * Maps this matrix *element-by-element*, by applying the `mapper` function on each element
     * of this matrix and using the result of this as the new element with the same indexes
     * of the resulting matrix
     * @param {(element: T, rowIndex: number, columnIndex: number) => R} mapper the function that
     * transforms each element of the matrix
     * @return {Matrix<R>} the new matrix
     */
    mapElementByElement<R>(mapper: (element: T, rowIndex: number, columnIndex: number) => R): Matrix<R>

    /**
     * Returns `true` if the two matrices are equals (contains the same elements)
     * @param {SimpleRowBasedMatrix} other the other matrix
     */
    equals(other: any): boolean

    /**
     * Returns a clone of this matrix.
     * @return {Matrix<T>} the clone of the matrix
     */
    clone(): Matrix<T>

    /**
     * Returns a clone of this matrix.
     * This method also allow to specify some rows or column that have to be **dropped** but, by default,
     * it clones the original matrix without drop anything
     * @param {Array<Number>} rowIndexesToRemove the indices of the rows that have to be dropped (empty by default)
     * @param {Array<Number>} columnIndexesToRemove the indices of the columns that have to be
     * dropped (empty by default)
     */
    clone(rowIndexesToRemove: Array<Number>, columnIndexesToRemove: Array<Number>): Matrix<T>

    /**
     * Flats this matrix to a one dimensional array which will contain **each row**
     * of the matrix **concatenated** one after the other
     */
    flatten(): Array<T>

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
    flatten(flatType: FlatType)

    /**
     * Returns this matrix as an *array-of-array*.
     * Each element of the external array is a **row**
     * @return {Array<Row<T>>} the array of rows
     */
    toArrayOfRows(): Array<Row<T>>

    /**
     * Returns this matrix as an *array-of-array*.
     * Each element of the external array is a **column**
     * @return {Array<Column<T>>} the array of column
     */
    toArrayOfColumns(): Array<Column<T>>
}