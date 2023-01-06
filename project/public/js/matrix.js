"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Matrix_data, _Matrix_totColums, _Matrix_totRows;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix = exports.InvalidColumnException = exports.InvalidRowException = exports.IllegalColumnIndexException = exports.IllegalRowIndexException = void 0;
const types_1 = require("./types");
/**
 * An exception that is thrown when has been request access to an invalid row
 */
class IllegalRowIndexException extends Error {
    constructor(triedRowIndex, maxAllowedRowIndex = null) {
        let msg;
        if (maxAllowedRowIndex != null) {
            msg = "invalid index [" + triedRowIndex + "] for row:  the index MUST be between [0] and [" +
                maxAllowedRowIndex + "]";
        }
        else {
            msg = "invalid index [" + triedRowIndex + "]";
        }
        super(msg);
        Object.setPrototypeOf(this, IllegalRowIndexException.prototype);
    }
}
exports.IllegalRowIndexException = IllegalRowIndexException;
/**
 * An exception that is thrown when has been request access to an invalid column
 */
class IllegalColumnIndexException extends Error {
    constructor(triedColumnIndex, maxAllowedColumnIndex = null) {
        let msg;
        if (maxAllowedColumnIndex != null) {
            msg = "invalid index [" + triedColumnIndex + "] for column: the index MUST be between [0] and [" +
                maxAllowedColumnIndex + "]";
        }
        else {
            msg = "invalid index [" + triedColumnIndex + "]";
        }
        super(msg);
        Object.setPrototypeOf(this, IllegalColumnIndexException.prototype);
    }
}
exports.IllegalColumnIndexException = IllegalColumnIndexException;
/**
 * An exception that is thrown when a row is not valid for a reason
 */
class InvalidRowException extends Error {
    constructor(row, reason) {
        super("invalid row {" + row + "}: " + reason);
        Object.setPrototypeOf(this, InvalidRowException.prototype);
    }
}
exports.InvalidRowException = InvalidRowException;
/**
 * An exception that is thrown when a column is not valid for a reason
 */
class InvalidColumnException extends Error {
    constructor(column, reason) {
        super("invalid column {" + column + "}: " + reason);
        Object.setPrototypeOf(this, InvalidRowException.prototype);
    }
}
exports.InvalidColumnException = InvalidColumnException;
/**
 * A NxN Matrix
 */
class Matrix extends types_1.AbstractFunctionalObject {
    constructor(data = []) {
        super();
        _Matrix_data.set(this, []);
        _Matrix_totColums.set(this, 0);
        _Matrix_totRows.set(this, 0
        /**
         * Creates a new empty matrix with the specified numbers of `row` and `column`.
         * This method let the possibility to specify the element to be used to fill the matrix
         * @param {number} rows the number of the rows
         * @param {number} columns the number of the columns
         * @param {T|null} fill the value to be used to fill the matrix
         */
        );
        if (data.length > 0) {
            __classPrivateFieldSet(this, _Matrix_totRows, data.length, "f");
            __classPrivateFieldSet(this, _Matrix_totColums, data[0].length, "f");
            for (let row of data) {
                if (row.length != __classPrivateFieldGet(this, _Matrix_totColums, "f")) {
                    throw Error("every row must have the same number of elements");
                }
            }
            __classPrivateFieldSet(this, _Matrix_data, data, "f");
        }
    }
    /**
     * Creates a new empty matrix with the specified numbers of `row` and `column`.
     * This method let the possibility to specify the element to be used to fill the matrix
     * @param {number} rows the number of the rows
     * @param {number} columns the number of the columns
     * @param {T|null} fill the value to be used to fill the matrix
     */
    static newMatrix(rows, columns, fill = null) {
        let data = Array(rows);
        for (let r = 0; r < rows; r++) {
            data[r] = Array(columns);
            if (fill != null) {
                for (let c = 0; c < columns; c++) {
                    data[r][c] = fill;
                }
            }
        }
        return new Matrix(data);
    }
    /**
     * Creates a new empty matrix of numbers with the specified numbers of `row` and `column`.
     * This method let the possibility to specify the value to be used to fill the matrix (`0` by default)
     * @param {number} rows the number of the rows
     * @param {number} columns the number of the columns
     * @param {T|null} fill the value to be used to fill the matrix
     */
    static newNumMatrix(rows, columns, fill = 0) {
        let data = Array(rows);
        for (let r = 0; r < rows; r++) {
            data[r] = Array(columns);
            for (let c = 0; c < columns; c++) {
                data[r][c] = fill;
            }
        }
        return new Matrix(data);
    }
    /**
     * Creates a new empty **squared** matrix with the specified numbers of `row` and `column`.
     * This method let the possibility to specify the element to be used to fill the matrix
     * @param {number} dim the dimension of the square of the matrix
     * @param {T|null} fill the value to be used to fill the matrix
     */
    static newSquaredMatrix(dim, fill = null) {
        return Matrix.newMatrix(dim, dim, fill);
    }
    /**
     * Creates a new empty **squared** matrix of numbers with the specified numbers of `row` and `column`.
     * This method let the possibility to specify the value to be used to fill the matrix (`0` by default)
     * @param {number} dim the dimension of the square of the matrix
     * @param {T|null} fill the value to be used to fill the matrix
     */
    static newSquaredNumMatrix(dim, fill = 0) {
        return Matrix.newNumMatrix(dim, dim, fill);
    }
    static determinant(matrix) {
        if (!matrix.isSquared()) {
            throw new types_1.IllegalArgumentException("this matrix is not squared [size: " + matrix.size().toArray() +
                "]: determinant undefined for non-squared matrix");
        }
        let data = __classPrivateFieldGet(matrix, _Matrix_data, "f");
        switch (__classPrivateFieldGet(matrix, _Matrix_totRows, "f")) {
            case 1: {
                return data[0][0];
            }
            case 2: {
                return data[0][0] * data[1][1] - data[0][1] * data[1][0];
            }
            case 3: {
                return data[0][0] * (data[1][1] * data[2][2] - data[1][2] * data[2][1]) -
                    data[0][1] * (data[1][0] * data[2][2] - data[1][2] * data[2][0]) +
                    data[0][2] * (data[1][0] * data[2][1] - data[1][1] * data[2][0]);
            }
            case 4: {
                return data[0][0] * data[1][1] * data[2][2] * data[3][3]
                    + data[0][0] * data[1][2] * data[2][3] * data[3][1]
                    + data[0][0] * data[1][3] * data[2][1] * data[3][2]
                    - data[0][0] * data[1][3] * data[2][2] * data[3][1]
                    - data[0][0] * data[1][2] * data[2][1] * data[3][3]
                    - data[0][0] * data[1][1] * data[2][3] * data[3][1]
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
                    + data[0][1] * data[1][3] * data[2][2] * data[3][0];
            }
            default: {
                let res = 0;
                let sign = 1;
                for (let col = 0; col < __classPrivateFieldGet(matrix, _Matrix_totColums, "f"); col++) {
                    res += (sign * data[0][col] * Matrix.determinant(matrix.getMinor(0, col)));
                    sign *= -1;
                }
                return res;
            }
        }
    }
    /**
     * Returns a couple which contains the size of the matrix.
     * In particular:
     * - the **first** element is the number of the **rows**
     * - the **second** element is the number of the **columns**
     */
    size() {
        return (0, types_1.coupleOf)(__classPrivateFieldGet(this, _Matrix_totRows, "f"), __classPrivateFieldGet(this, _Matrix_totColums, "f"));
    }
    /**
     * Returns the number of the rows of this matrix
     */
    rowSize() {
        return __classPrivateFieldGet(this, _Matrix_totRows, "f");
    }
    /**
     * Returns the number of the columns of this matrix
     */
    columSize() {
        return __classPrivateFieldGet(this, _Matrix_totColums, "f");
    }
    /**
     * Returns the number of the elements in this matrix
     */
    elementSize() {
        return __classPrivateFieldGet(this, _Matrix_totRows, "f") * __classPrivateFieldGet(this, _Matrix_totColums, "f");
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
    checkValidRowIndex(rowIndex, throwError = false) {
        if (rowIndex < 0 || rowIndex >= __classPrivateFieldGet(this, _Matrix_totRows, "f")) {
            if (throwError) {
                throw new IllegalRowIndexException(rowIndex, __classPrivateFieldGet(this, _Matrix_totRows, "f") - 1);
            }
            return true;
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
    checkValidColumnIndex(columnIndex, throwError = false) {
        if (columnIndex < 0 || columnIndex >= __classPrivateFieldGet(this, _Matrix_totRows, "f")) {
            if (throwError) {
                throw new IllegalRowIndexException(columnIndex, __classPrivateFieldGet(this, _Matrix_totRows, "f") - 1);
            }
            return true;
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
    checkValidIndexes(rowIndex, columnIndex, throwError = false) {
        if (this.checkValidRowIndex(rowIndex, throwError))
            return this.checkValidColumnIndex(columnIndex, throwError);
        return false;
    }
    /**
     * Get the element in the position specified by the indexes given as argument
     * @param rowIndex the index of the **row**
     * @param columnIndex the index of the **column**
     * @return {number} the element of the matrix in the specified position
     * @throws {IllegalRowIndexException} if the index of the row is not valid
     * @throws {IllegalColumnIndexException} if the index of the column is not valid
     */
    get(rowIndex, columnIndex) {
        this.checkValidIndexes(rowIndex, columnIndex, true);
        return __classPrivateFieldGet(this, _Matrix_data, "f")[rowIndex][columnIndex];
    }
    /**
     * Set the element in the position specified by the indexes given as argument
     * @param value the new value for the element
     * @param rowIndex the index of the **row**
     * @param columnIndex the index of the **column**
     * @throws {IllegalRowIndexException} if the index of the row is not valid
     * @throws {IllegalColumnIndexException} if the index of the column is not valid
     */
    set(value, rowIndex, columnIndex) {
        this.checkValidIndexes(rowIndex, columnIndex, true);
        __classPrivateFieldGet(this, _Matrix_data, "f")[rowIndex][columnIndex] = value;
    }
    /**
     * Returns `true` if this matrix is **squared**
     */
    isSquared() {
        return __classPrivateFieldGet(this, _Matrix_totRows, "f") === __classPrivateFieldGet(this, _Matrix_totColums, "f");
    }
    /**
     * Adds a row to this matrix by appending it at the bottom.
     * The added row will be the **last** one of the matrix
     * @param {Row<number>} row the row to be added
     * @throws {InvalidRowException} if the number of the elements of the given row is not the same
     * of the columns of this matrix
     */
    addRow(row) {
        var _a;
        if (__classPrivateFieldGet(this, _Matrix_totColums, "f") == 0) {
            __classPrivateFieldSet(this, _Matrix_totColums, row.length, "f");
        }
        else {
            if (row.length != __classPrivateFieldGet(this, _Matrix_totColums, "f")) {
                throw new InvalidRowException(row, "the number of the element of the row [" + row.length +
                    "] is not the same of the column of the matrix [" + __classPrivateFieldGet(this, _Matrix_totColums, "f") + "]");
            }
        }
        __classPrivateFieldGet(this, _Matrix_data, "f").push(row);
        __classPrivateFieldSet(this, _Matrix_totRows, (_a = __classPrivateFieldGet(this, _Matrix_totRows, "f"), _a++, _a), "f");
    }
    /**
     * Removes the last row of this matrix.
     * If the matrix is empty, this method will perform nothing
     */
    removeRow() {
        var _a;
        if (__classPrivateFieldGet(this, _Matrix_totRows, "f") > 0) {
            __classPrivateFieldGet(this, _Matrix_data, "f").pop();
        }
        __classPrivateFieldSet(this, _Matrix_totRows, (_a = __classPrivateFieldGet(this, _Matrix_totRows, "f"), _a--, _a), "f");
    }
    /**
     * Get the row at the specified index
     * @param {number} rowIndex the index of the row
     * @throws {IllegalRowIndexException} if the index of the row is not valid
     */
    getRow(rowIndex) {
        this.checkValidRowIndex(rowIndex, true);
        return Object.assign([], __classPrivateFieldGet(this, _Matrix_data, "f")[rowIndex]);
    }
    /**
     * Adds a column to this matrix by appending it at right
     * The added column will be the **last** one of the matrix
     * @param {Column<number>} column the column to be added
     * @throws {InvalidRowException} if the number of the elements of the given column is not the same
     * of the rows of this matrix
     */
    addColumn(column) {
        var _a;
        if (__classPrivateFieldGet(this, _Matrix_totRows, "f") == 0) {
            __classPrivateFieldSet(this, _Matrix_totRows, column.length, "f");
            for (let i = 0; i < __classPrivateFieldGet(this, _Matrix_totRows, "f"); i++) {
                __classPrivateFieldGet(this, _Matrix_data, "f")[i] = [];
            }
        }
        else {
            if (column.length != __classPrivateFieldGet(this, _Matrix_totRows, "f")) {
                throw new InvalidColumnException(column, "the number of the element is not the same of the column of the matrix");
            }
        }
        for (let i = 0; i < column.length; i++) {
            __classPrivateFieldGet(this, _Matrix_data, "f")[i].push(column[i]);
        }
        __classPrivateFieldSet(this, _Matrix_totColums, (_a = __classPrivateFieldGet(this, _Matrix_totColums, "f"), _a++, _a), "f");
    }
    /**
     * Removes the last column of this matrix (the one at the right).
     * If the matrix is empty, this method will perform nothing
     */
    removeColumn() {
        if (__classPrivateFieldGet(this, _Matrix_totColums, "f") > 0) {
            for (let row of __classPrivateFieldGet(this, _Matrix_data, "f")) {
                row.pop();
            }
        }
    }
    /**
     * Get the column at the specified index
     * @param {number} columnIndex the index of the row
     * @throws {IllegalRowIndexException} if the index of the row is not valid
     */
    getColumn(columnIndex) {
        this.checkValidColumnIndex(columnIndex, true);
        let column = [];
        for (let element of __classPrivateFieldGet(this, _Matrix_data, "f")) {
            column.push(element[columnIndex]);
        }
        return column;
    }
    /**
     * Compares the structure of this matrix with the one given as argument.
     * Then, this method returns `true` only if the two matrix have the same number of row
     * and the same number of columns
     * @param other
     */
    sameStructureOf(other) {
        return __classPrivateFieldGet(this, _Matrix_totRows, "f") == __classPrivateFieldGet(other, _Matrix_totRows, "f") && __classPrivateFieldGet(this, _Matrix_totColums, "f") == __classPrivateFieldGet(other, _Matrix_totColums, "f");
    }
    /**
     * Adds the given scalar to this matrix.
     * This method will work properly **only if this matrix contains only
     * numbers**: this means that the behaviour of this method is not predictable
     * using different types of matrices
     * @param {number} scalar the scalar to be added
     */
    scalarAdd(scalar) {
        let res = Matrix.newNumMatrix(__classPrivateFieldGet(this, _Matrix_totRows, "f"), __classPrivateFieldGet(this, _Matrix_totColums, "f"));
        for (let r = 0; r < __classPrivateFieldGet(this, _Matrix_totRows, "f"); r++) {
            for (let c = 0; c < __classPrivateFieldGet(this, _Matrix_totColums, "f"); c++) {
                __classPrivateFieldGet(res, _Matrix_data, "f")[r][c] = __classPrivateFieldGet(this, _Matrix_data, "f")[r][c] + scalar;
            }
        }
        return res;
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
    matAdd(other) {
        if (!this.sameStructureOf(this)) {
            throw new types_1.IllegalArgumentException("illegal matrix to be added: this matrix has size " +
                __classPrivateFieldGet(this, _Matrix_totRows, "f") + " x " + __classPrivateFieldGet(this, _Matrix_totColums, "f") + " while the argument has " + __classPrivateFieldGet(other, _Matrix_totRows, "f") +
                " x " + __classPrivateFieldGet(other, _Matrix_totColums, "f"));
        }
        let res = Matrix.newNumMatrix(__classPrivateFieldGet(this, _Matrix_totRows, "f"), __classPrivateFieldGet(this, _Matrix_totColums, "f"));
        for (let r = 0; r < __classPrivateFieldGet(this, _Matrix_totRows, "f"); r++) {
            for (let c = 0; c < __classPrivateFieldGet(this, _Matrix_totColums, "f"); c++) {
                __classPrivateFieldGet(res, _Matrix_data, "f")[r][c] = __classPrivateFieldGet(this, _Matrix_data, "f")[r][c] + __classPrivateFieldGet(other, _Matrix_data, "f")[r][c];
            }
        }
        return res;
    }
    /**
     * Multiply the given scalar to this matrix.
     * This method will work properly **only if this matrix contains only
     * numbers**: this means that the behaviour of this method is not predictable
     * using different types of matrices
     * @param {number} scalar the scalar to be used for the multiplication
     */
    scalarMultiply(scalar) {
        let res = Matrix.newNumMatrix(__classPrivateFieldGet(this, _Matrix_totRows, "f"), __classPrivateFieldGet(this, _Matrix_totColums, "f"));
        for (let r = 0; r < __classPrivateFieldGet(this, _Matrix_totRows, "f"); r++) {
            for (let c = 0; c < __classPrivateFieldGet(this, _Matrix_totColums, "f"); c++) {
                __classPrivateFieldGet(res, _Matrix_data, "f")[r][c] = __classPrivateFieldGet(this, _Matrix_data, "f")[r][c] * scalar;
            }
        }
        return res;
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
    matMultiply(other) {
        if (__classPrivateFieldGet(this, _Matrix_totColums, "f") != __classPrivateFieldGet(this, _Matrix_totRows, "f")) {
            throw new types_1.IllegalArgumentException("illegal matrix to be multiplied: this matrix has columns " +
                __classPrivateFieldGet(this, _Matrix_totColums, "f") + " while the argument has rows " + __classPrivateFieldGet(other, _Matrix_totRows, "f"));
        }
        let res = Matrix.newNumMatrix(__classPrivateFieldGet(this, _Matrix_totRows, "f"), __classPrivateFieldGet(other, _Matrix_totColums, "f"), 0);
        for (let rT = 0; rT < __classPrivateFieldGet(this, _Matrix_totRows, "f"); rT++) {
            for (let cO = 0; cO < __classPrivateFieldGet(this, _Matrix_totRows, "f"); cO++) {
                for (let rO = 0; rO < other.rowSize(); rO++) {
                    __classPrivateFieldGet(res, _Matrix_data, "f")[rT][cO] += (__classPrivateFieldGet(this, _Matrix_data, "f")[rT][rO] * __classPrivateFieldGet(other, _Matrix_data, "f")[rO][cO]);
                }
            }
        }
        return res;
    }
    /**
     * Returns `true` if the two matrix are equals (contains the same elements)
     * @param {Matrix} other the other matrix
     */
    equals(other) {
        if (other != null) {
            if (other instanceof Matrix) {
                if (this.sameStructureOf(other)) {
                    for (let row = 0; row < __classPrivateFieldGet(this, _Matrix_totRows, "f"); row++) {
                        for (let col = 0; col < __classPrivateFieldGet(this, _Matrix_totColums, "f"); col++) {
                            if (__classPrivateFieldGet(this, _Matrix_data, "f")[row][col] !== __classPrivateFieldGet(other, _Matrix_data, "f")[row][col]) {
                                return false;
                            }
                        }
                    }
                    return true;
                }
            }
        }
        return false;
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
    submatrix(topRow, leftColumn, bottomRow = __classPrivateFieldGet(this, _Matrix_totRows, "f") - 1, rightColumn = __classPrivateFieldGet(this, _Matrix_totColums, "f") - 1) {
        // Check all >= 0
        if (topRow < 0)
            throw new types_1.IllegalArgumentException("top row [" + topRow + "] MUST be greater than 0");
        if (bottomRow < 0)
            throw new types_1.IllegalArgumentException("bottom row [" + bottomRow + "] MUST be greater than 0");
        if (rightColumn < 0)
            throw new types_1.IllegalArgumentException("right column [" + rightColumn + "] MUST be greater than 0");
        if (leftColumn < 0)
            throw new types_1.IllegalArgumentException("left column [" + leftColumn + "] MUST be greater than 0");
        // Check coherence
        if (bottomRow < topRow)
            throw new types_1.IllegalArgumentException("bottom row [" + bottomRow + "] must be greater than top row [" + topRow + "]");
        if (rightColumn < leftColumn)
            throw new types_1.IllegalArgumentException("right column [" + rightColumn + "] must be greater than left column [" + leftColumn + "]");
        //Check inside matrix
        if (topRow >= __classPrivateFieldGet(this, _Matrix_totRows, "f"))
            throw new types_1.IllegalArgumentException("top row [" + topRow + "] MUST NOT go outside the matrix");
        if (bottomRow >= __classPrivateFieldGet(this, _Matrix_totRows, "f"))
            throw new types_1.IllegalArgumentException("bottom row [" + bottomRow + "] MUST NOT go outside the matrix");
        if (leftColumn >= __classPrivateFieldGet(this, _Matrix_totColums, "f"))
            throw new types_1.IllegalArgumentException("left column [" + leftColumn + "] MUST NOT go outside the matrix");
        if (rightColumn >= __classPrivateFieldGet(this, _Matrix_totColums, "f"))
            throw new types_1.IllegalArgumentException("left column [" + rightColumn + "] MUST NOT go outside the matrix");
        let res = Matrix.newMatrix(bottomRow - topRow + 1, rightColumn - leftColumn + 1);
        for (let r = topRow; r <= bottomRow; r++) {
            for (let c = leftColumn; c <= rightColumn; c++) {
                __classPrivateFieldGet(res, _Matrix_data, "f")[r - topRow][c - leftColumn] = __classPrivateFieldGet(this, _Matrix_data, "f")[r][c];
            }
        }
        return res;
    }
    /**
     * Returns the trace of this matrix.
     * This method will work properly **only if the two matrix contain only
     * numbers**: this means that the behaviour of this method is not predictable
     * using different types of matrices
     * @return the trace of this matrix
     * @throws {IllegalArgumentException} if this matrix is not squared
     */
    trace() {
        if (!this.isSquared()) {
            throw new types_1.IllegalArgumentException("this matrix is not squared [size: " + this.size().toArray() + "]");
        }
        let res = 0;
        for (let i = 0; i < __classPrivateFieldGet(this, _Matrix_totRows, "f"); i++)
            res += __classPrivateFieldGet(this, _Matrix_data, "f")[i][i];
        return res;
    }
    /**
     * Returns the transposition of this matrix
     */
    transpose() {
        let res = Matrix.newMatrix(__classPrivateFieldGet(this, _Matrix_totColums, "f"), __classPrivateFieldGet(this, _Matrix_totRows, "f"));
        for (let r = 0; r < __classPrivateFieldGet(this, _Matrix_totRows, "f"); r++) {
            for (let c = 0; c < __classPrivateFieldGet(this, _Matrix_totColums, "f"); c++) {
                __classPrivateFieldGet(res, _Matrix_data, "f")[c][r] = __classPrivateFieldGet(this, _Matrix_data, "f")[r][c];
            }
        }
        return res;
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
    getMinor(rowIndex, columnIndex) {
        this.checkValidIndexes(rowIndex, columnIndex);
        let res = Matrix.newMatrix(__classPrivateFieldGet(this, _Matrix_totRows, "f") - 1, __classPrivateFieldGet(this, _Matrix_totColums, "f") - 1);
        let rR = 0;
        let cR = 0;
        for (let r = 0; r < __classPrivateFieldGet(this, _Matrix_totRows, "f"); r++) {
            if (r != rowIndex) {
                cR = 0;
                for (let c = 0; c < __classPrivateFieldGet(this, _Matrix_totColums, "f"); c++) {
                    if (c != columnIndex) {
                        __classPrivateFieldGet(res, _Matrix_data, "f")[rR][cR] = __classPrivateFieldGet(this, _Matrix_data, "f")[r][c];
                        cR++;
                    }
                }
                rR++;
            }
        }
        return res;
    }
    determinant() {
        return Matrix.determinant(this);
    }
    toString() {
        let res = "Matrix " + __classPrivateFieldGet(this, _Matrix_totRows, "f") + "x" + __classPrivateFieldGet(this, _Matrix_totColums, "f") + ": [";
        for (let row of __classPrivateFieldGet(this, _Matrix_data, "f")) {
            res += ("[" + row.join(", ") + "], ");
        }
        res = res.substring(0, res.length - 2) + "]";
        return res;
    }
}
exports.Matrix = Matrix;
_Matrix_data = new WeakMap(), _Matrix_totColums = new WeakMap(), _Matrix_totRows = new WeakMap();
//# sourceMappingURL=matrix.js.map