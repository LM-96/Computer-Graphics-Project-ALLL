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
var _SimpleRowBasedMatrix_data, _SimpleRowBasedMatrix_totColumns, _SimpleRowBasedMatrix_totRows;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleRowBasedMatrix = void 0;
const types_1 = require("../../types/types");
const abstract_matrix_old_1 = require("./abstract-matrix-old");
const matrix_factory_1 = require("./matrix-factory");
const invalid_row_exception_1 = require("./exceptions/invalid-row-exception");
const invalid_column_exception_1 = require("./exceptions/invalid-column-exception");
/**
 * A NxN Matrix.
 * This class contains also methods that makes sense only if the type of the element is `number`
 * (like `determinant` or `trace`). Check the documentation before using a method and make
 * sure that the matrix contains only numbers before using these kind of methods
 */
class SimpleRowBasedMatrix extends abstract_matrix_old_1.AbstractMatrix {
    constructor(data = []) {
        super();
        _SimpleRowBasedMatrix_data.set(this, []);
        _SimpleRowBasedMatrix_totColumns.set(this, 0);
        _SimpleRowBasedMatrix_totRows.set(this, 0
        /**
         * Calculates and return the determinant of a numeric matrix
         * @param {NumMatrix} matrix the matrix
         * @throws {IllegalArgumentException} if the matrix is not squared (the determinant
         * is not defined to **non-squared** matrix)
         */
        );
        if (data.length > 0) {
            __classPrivateFieldSet(this, _SimpleRowBasedMatrix_totRows, data.length, "f");
            __classPrivateFieldSet(this, _SimpleRowBasedMatrix_totColumns, data[0].length, "f");
            for (let row of data) {
                if (row.length != __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f")) {
                    throw Error("every row must have the same number of elements");
                }
            }
            __classPrivateFieldSet(this, _SimpleRowBasedMatrix_data, data, "f");
        }
    }
    getFactory() {
        return SimpleRowBasedMatrix.factory;
    }
    /**
     * Calculates and return the determinant of a numeric matrix
     * @param {NumMatrix} matrix the matrix
     * @throws {IllegalArgumentException} if the matrix is not squared (the determinant
     * is not defined to **non-squared** matrix)
     */
    static determinant(matrix) {
        if (!matrix.isSquared()) {
            throw new types_1.IllegalArgumentException("this matrix is not squared [size: " + matrix.size().toArray() +
                "]: determinant undefined for non-squared matrix");
        }
        let data = __classPrivateFieldGet(matrix, _SimpleRowBasedMatrix_data, "f");
        switch (__classPrivateFieldGet(matrix, _SimpleRowBasedMatrix_totRows, "f")) {
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
                    + data[0][1] * data[1][3] * data[2][2] * data[3][0];
            }
            default: {
                let res = 0;
                let sign = 1;
                for (let col = 0; col < __classPrivateFieldGet(matrix, _SimpleRowBasedMatrix_totColumns, "f"); col++) {
                    res += (sign * data[0][col] * SimpleRowBasedMatrix.determinant(matrix.getMinor(0, col)));
                    sign *= -1;
                }
                return res;
            }
        }
    }
    rowSize() {
        return __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f");
    }
    columnSize() {
        return __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f");
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
        return __classPrivateFieldGet(this, _SimpleRowBasedMatrix_data, "f")[rowIndex][columnIndex];
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
        __classPrivateFieldGet(this, _SimpleRowBasedMatrix_data, "f")[rowIndex][columnIndex] = value;
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
        if (__classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f") == 0) {
            __classPrivateFieldSet(this, _SimpleRowBasedMatrix_totColumns, row.length, "f");
        }
        else {
            if (row.length != __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f")) {
                throw new invalid_row_exception_1.InvalidRowException(row, "the number of the element of the row [" + row.length +
                    "] is not the same of the column of the matrix [" + __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f") + "]");
            }
        }
        __classPrivateFieldGet(this, _SimpleRowBasedMatrix_data, "f").push(row);
        __classPrivateFieldSet(this, _SimpleRowBasedMatrix_totRows, (_a = __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f"), _a++, _a), "f");
    }
    /**
     * Removes the last row of this matrix.
     * If the matrix is empty, this method will perform nothing
     */
    removeRow() {
        var _a;
        if (__classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f") > 0) {
            __classPrivateFieldGet(this, _SimpleRowBasedMatrix_data, "f").pop();
        }
        __classPrivateFieldSet(this, _SimpleRowBasedMatrix_totRows, (_a = __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f"), _a--, _a), "f");
    }
    /**
     * Get the row at the specified index.
     * Every change on the returning row **will not affect** the internal row
     * in the matrix
     * @param {number} rowIndex the index of the row
     * @throws {IllegalRowIndexException} if the index of the row is not valid
     */
    getRow(rowIndex) {
        this.checkValidRowIndex(rowIndex, true);
        let row = [];
        for (let element of __classPrivateFieldGet(this, _SimpleRowBasedMatrix_data, "f")[rowIndex]) {
            row.push(element);
        }
        return row;
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
    setRow(row, rowIndex) {
        this.checkValidRowIndex(rowIndex, true);
        if (row.length != __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f")) {
            throw new invalid_row_exception_1.InvalidRowException(row, "the number of the element of the row [" + row.length +
                "] is not the same of the column of the matrix [" + __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f") + "]");
        }
        for (let c = 0; c < __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f"); c++) {
            __classPrivateFieldGet(this, _SimpleRowBasedMatrix_data, "f")[rowIndex][c] = row[c];
        }
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
        if (__classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f") == 0) {
            __classPrivateFieldSet(this, _SimpleRowBasedMatrix_totRows, column.length, "f");
            for (let i = 0; i < __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f"); i++) {
                __classPrivateFieldGet(this, _SimpleRowBasedMatrix_data, "f")[i] = [];
            }
        }
        else {
            if (column.length != __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f")) {
                throw new invalid_column_exception_1.InvalidColumnException(column, "the number of the element is not the same of the column of the matrix");
            }
        }
        for (let i = 0; i < column.length; i++) {
            __classPrivateFieldGet(this, _SimpleRowBasedMatrix_data, "f")[i].push(column[i]);
        }
        __classPrivateFieldSet(this, _SimpleRowBasedMatrix_totColumns, (_a = __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f"), _a++, _a), "f");
    }
    /**
     * Removes the last column of this matrix (the one at the right).
     * If the matrix is empty, this method will perform nothing
     */
    removeColumn() {
        if (__classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f") > 0) {
            for (let row of __classPrivateFieldGet(this, _SimpleRowBasedMatrix_data, "f")) {
                row.pop();
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
    getColumn(columnIndex) {
        this.checkValidColumnIndex(columnIndex, true);
        let column = [];
        for (let element of __classPrivateFieldGet(this, _SimpleRowBasedMatrix_data, "f")) {
            column.push(element[columnIndex]);
        }
        return column;
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
    setColumn(column, columnIndex) {
        this.checkValidColumnIndex(columnIndex, true);
        if (column.length != __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f")) {
            throw new invalid_column_exception_1.InvalidColumnException(column, "the number of the element is not the same of the column of the matrix");
        }
        for (let r = 0; r < __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f"); r++) {
            __classPrivateFieldGet(this, _SimpleRowBasedMatrix_data, "f")[r][columnIndex] = column[r];
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
    scalarAdd(scalar) {
        let res = SimpleRowBasedMatrix.newNumMatrix(__classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f"), __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f"));
        for (let r = 0; r < __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f"); r++) {
            for (let c = 0; c < __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f"); c++) {
                __classPrivateFieldGet(res, _SimpleRowBasedMatrix_data, "f")[r][c] = __classPrivateFieldGet(this, _SimpleRowBasedMatrix_data, "f")[r][c] + scalar;
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
                __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f") + " x " + __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f") + " while the argument has " + __classPrivateFieldGet(other, _SimpleRowBasedMatrix_totRows, "f") +
                " x " + __classPrivateFieldGet(other, _SimpleRowBasedMatrix_totColumns, "f"));
        }
        let res = SimpleRowBasedMatrix.newNumMatrix(__classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f"), __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f"));
        for (let r = 0; r < __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f"); r++) {
            for (let c = 0; c < __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f"); c++) {
                __classPrivateFieldGet(res, _SimpleRowBasedMatrix_data, "f")[r][c] = __classPrivateFieldGet(this, _SimpleRowBasedMatrix_data, "f")[r][c] + __classPrivateFieldGet(other, _SimpleRowBasedMatrix_data, "f")[r][c];
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
        let res = SimpleRowBasedMatrix.newNumMatrix(__classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f"), __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f"), 0);
        for (let r = 0; r < __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f"); r++) {
            for (let c = 0; c < __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f"); c++) {
                __classPrivateFieldGet(res, _SimpleRowBasedMatrix_data, "f")[r][c] = __classPrivateFieldGet(this, _SimpleRowBasedMatrix_data, "f")[r][c] * scalar;
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
        if (__classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f") != __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f")) {
            throw new types_1.IllegalArgumentException("illegal matrix to be multiplied: this matrix has columns " +
                __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f") + " while the argument has rows " + __classPrivateFieldGet(other, _SimpleRowBasedMatrix_totRows, "f"));
        }
        let res = SimpleRowBasedMatrix.newNumMatrix(__classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f"), __classPrivateFieldGet(other, _SimpleRowBasedMatrix_totColumns, "f"), 0);
        for (let rT = 0; rT < __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f"); rT++) {
            for (let cO = 0; cO < __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f"); cO++) {
                for (let rO = 0; rO < other.rowSize(); rO++) {
                    __classPrivateFieldGet(res, _SimpleRowBasedMatrix_data, "f")[rT][cO] += (__classPrivateFieldGet(this, _SimpleRowBasedMatrix_data, "f")[rT][rO] * __classPrivateFieldGet(other, _SimpleRowBasedMatrix_data, "f")[rO][cO]);
                }
            }
        }
        return res;
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
    submatrix(topRow, leftColumn, bottomRow = __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f") - 1, rightColumn = __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f") - 1) {
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
        if (topRow >= __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f"))
            throw new types_1.IllegalArgumentException("top row [" + topRow + "] MUST NOT go outside the matrix");
        if (bottomRow >= __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f"))
            throw new types_1.IllegalArgumentException("bottom row [" + bottomRow + "] MUST NOT go outside the matrix");
        if (leftColumn >= __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f"))
            throw new types_1.IllegalArgumentException("left column [" + leftColumn + "] MUST NOT go outside the matrix");
        if (rightColumn >= __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f"))
            throw new types_1.IllegalArgumentException("left column [" + rightColumn + "] MUST NOT go outside the matrix");
        let res = SimpleRowBasedMatrix.newMatrix(bottomRow - topRow + 1, rightColumn - leftColumn + 1);
        for (let r = topRow; r <= bottomRow; r++) {
            for (let c = leftColumn; c <= rightColumn; c++) {
                __classPrivateFieldGet(res, _SimpleRowBasedMatrix_data, "f")[r - topRow][c - leftColumn] = __classPrivateFieldGet(this, _SimpleRowBasedMatrix_data, "f")[r][c];
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
        for (let i = 0; i < __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f"); i++)
            res += __classPrivateFieldGet(this, _SimpleRowBasedMatrix_data, "f")[i][i];
        return res;
    }
    /**
     * Returns the transposition of this matrix
     */
    transpose() {
        let res = SimpleRowBasedMatrix.newMatrix(__classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f"), __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f"));
        for (let r = 0; r < __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f"); r++) {
            for (let c = 0; c < __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f"); c++) {
                __classPrivateFieldGet(res, _SimpleRowBasedMatrix_data, "f")[c][r] = __classPrivateFieldGet(this, _SimpleRowBasedMatrix_data, "f")[r][c];
            }
        }
        return res;
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
    getMinor(rowIndex, columnIndex) {
        this.checkValidIndexes(rowIndex, columnIndex, true);
        let res = SimpleRowBasedMatrix.newMatrix(__classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f") - 1, __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f") - 1);
        let rR = 0;
        let cR = 0;
        for (let r = 0; r < __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f"); r++) {
            if (r != rowIndex) {
                cR = 0;
                for (let c = 0; c < __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f"); c++) {
                    if (c != columnIndex) {
                        __classPrivateFieldGet(res, _SimpleRowBasedMatrix_data, "f")[rR][cR] = __classPrivateFieldGet(this, _SimpleRowBasedMatrix_data, "f")[r][c];
                        cR++;
                    }
                }
                rR++;
            }
        }
        return res;
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
    getCofactor(rowIndex, columnIndex) {
        this.checkValidIndexes(rowIndex, columnIndex, true);
        return Math.pow(-1, rowIndex + columnIndex) * (this.getMinor(rowIndex, columnIndex).determinant());
    }
    /**
     * Computes and returns the **cofactor matrix** which is the matrix that contains
     * each method of this one replaced with its cofactor
     * @return {NumMatrix} the *cofactor matrix*
     * @throws {IllegalArgumentException} if the matrix is not squared (the determinant
     * is not defined to **non-squared** matrix)
     */
    getCofactorMatrix() {
        let res = SimpleRowBasedMatrix.newNumMatrix(__classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f"), __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f"));
        for (let r = 0; r < __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f"); r++) {
            for (let c = 0; c < __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f"); c++) {
                __classPrivateFieldGet(res, _SimpleRowBasedMatrix_data, "f")[r][c] = this.getCofactor(r, c);
            }
        }
        return res;
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
    determinant() {
        return SimpleRowBasedMatrix.determinant(this);
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
    invert() {
        if (!this.isSquared()) {
            throw new NotInvertibleMatrixException(NotInvertibleReason.NOT_SQUARED);
        }
        let determinant = this.determinant();
        if (determinant == 0) {
            throw new NotInvertibleMatrixException(NotInvertibleReason.ZERO_DETERMINANT);
        }
        return this.getCofactorMatrix() /* 1. Take the cofactor matrix */
            .transpose() /* 2. Calculate the transposed cofactor matrix (added matrix) */
            .scalarMultiply(1 / determinant); /* 3. Multiply by 1/det */
    }
    /* FUNCTIONAL ************************************************************************************************ */
    /**
     * Executes the given block over each row of this matrix.
     * The row passed as parameter to the `block` function is a copy of the internal one,
     * so every change done using `block` **will not affect** the internal matrix
     * @param {(row: Row<T>, rowIndex: number) => void} block the function to be executed over each row
     * of this matrix
     */
    forEachRow(block) {
        for (let r = 0; r < __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f"); r++) {
            block(this.getRow(r), r);
        }
    }
    /**
     * Executes the given block over each column of this matrix.
     * The column passed as parameter to the `block` function is a copy of the internal one,
     * so every change done using `block` **will not affect** the internal matrix
     * @param {(column: Column<T>, columnIndex: number) => void} block the function to be
     * executed over each column of this matrix
     */
    forEachColumn(block) {
        for (let c = 0; c < __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f"); c++) {
            block(this.getColumn(c), c);
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
    mapRowByRow(mapper) {
        let result = SimpleRowBasedMatrix.newMatrix(__classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f"), __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f"));
        for (let r = 0; r < __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f"); r++) {
            result.setRow(mapper(this.getRow(r), r), r);
        }
        return result;
    }
    /**
     * Maps this matrix *column-by-column*, by applying the `mapper` function on each column
     * of this matrix and using the result of this as the new column with the same index
     * of the resulting matrix
     * @param {(column: Column<T>, columnIndex: number) => Column<R>} mapper the function that
     * transforms each column of the matrix
     * @return {Matrix<R>} the new matrix
     */
    mapColumnByColumn(mapper) {
        let result = SimpleRowBasedMatrix.newMatrix(__classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f"), __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f"));
        for (let c = 0; c < __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f"); c++) {
            result.setColumn(mapper(this.getColumn(c), c), c);
        }
        return result;
    }
    /**
     * Maps this matrix *element-by-element*, by applying the `mapper` function on each element
     * of this matrix and using the result of this as the new element with the same indexes
     * of the resulting matrix
     * @param {(element: T, rowIndex: number, columnIndex: number) => R} mapper the function that
     * transforms each element of the matrix
     * @return {Matrix<R>} the new matrix
     */
    mapElementByElement(mapper) {
        let result = SimpleRowBasedMatrix.newMatrix(__classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f"), __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f"));
        for (let r = 0; r < __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f"); r++) {
            for (let c = 0; c < __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f"); c++) {
                __classPrivateFieldGet(result, _SimpleRowBasedMatrix_data, "f")[r][c] = mapper(__classPrivateFieldGet(this, _SimpleRowBasedMatrix_data, "f")[r][c], r, c);
            }
        }
        return result;
    }
    /* OBJECT METHODS ******************************************************************************************** */
    /**
     * Returns `true` if the two matrix are equals (contains the same elements)
     * @param {SimpleRowBasedMatrix} other the other matrix
     */
    equals(other) {
        if (other != null) {
            if (other instanceof SimpleRowBasedMatrix) {
                if (this.sameStructureOf(other)) {
                    for (let row = 0; row < __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f"); row++) {
                        for (let col = 0; col < __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f"); col++) {
                            if (__classPrivateFieldGet(this, _SimpleRowBasedMatrix_data, "f")[row][col] !== __classPrivateFieldGet(other, _SimpleRowBasedMatrix_data, "f")[row][col]) {
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
    toString() {
        let res = "Matrix " + __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f") + "x" + __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f") + ": [";
        for (let row of __classPrivateFieldGet(this, _SimpleRowBasedMatrix_data, "f")) {
            res += ("[" + row.join(", ") + "], ");
        }
        res = res.substring(0, res.length - 2) + "]";
        return res;
    }
    /**
     * Returns a clone of this matrix.
     * This method also allow to specify some rows or column that have to be **dropped** but, by default,
     * it clones the original matrix without drop anything
     * @param {Array<Number>} rowIndexesToRemove the indices of the rows that have to be dropped (empty by default)
     * @param {Array<Number>} columnIndexesToRemove the indices of the columns that have to be
     * dropped (empty by default)
     */
    clone(rowIndexesToRemove = [], columnIndexesToRemove = []) {
        let res;
        if (rowIndexesToRemove.length == 0 && columnIndexesToRemove.length == 0) {
            /* Normal Clone *************************************************** */
            res = SimpleRowBasedMatrix.newMatrix(__classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f"), __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f"));
            for (let r = 0; r < __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f"); r++) {
                for (let c = 0; c < __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f"); c++) {
                    __classPrivateFieldGet(res, _SimpleRowBasedMatrix_data, "f")[r][c] = __classPrivateFieldGet(this, _SimpleRowBasedMatrix_data, "f")[r][c];
                }
            }
        }
        else {
            res = SimpleRowBasedMatrix.newMatrix(__classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f") - rowIndexesToRemove.length, __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f") - columnIndexesToRemove.length);
            let rR = 0;
            let cR = 0;
            for (let r = 0; r < __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totRows, "f"); r++) {
                if (!rowIndexesToRemove.includes(r)) {
                    cR = 0;
                    for (let c = 0; r < __classPrivateFieldGet(this, _SimpleRowBasedMatrix_totColumns, "f"); c++) {
                        if (!columnIndexesToRemove.includes(c)) {
                            __classPrivateFieldGet(res, _SimpleRowBasedMatrix_data, "f")[rR][cR] = __classPrivateFieldGet(this, _SimpleRowBasedMatrix_data, "f")[r][c];
                            cR++;
                        }
                    }
                    rR++;
                }
            }
        }
        return res;
    }
}
exports.SimpleRowBasedMatrix = SimpleRowBasedMatrix;
_SimpleRowBasedMatrix_data = new WeakMap(), _SimpleRowBasedMatrix_totColumns = new WeakMap(), _SimpleRowBasedMatrix_totRows = new WeakMap();
SimpleRowBasedMatrix.factory = new class extends matrix_factory_1.MatrixFactory {
    createMatrix(rows, columns, fill) {
        let data = Array(rows);
        for (let r = 0; r < rows; r++) {
            data[r] = Array(columns);
            if (fill != null) {
                for (let c = 0; c < columns; c++) {
                    data[r][c] = fill;
                }
            }
        }
        return new SimpleRowBasedMatrix(data);
    }
};
//# sourceMappingURL=simple-row-based-matrix.js.map