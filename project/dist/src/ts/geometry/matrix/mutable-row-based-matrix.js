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
var _MutableRowBasedMatrix_data, _MutableRowBasedMatrix_totRows, _MutableRowBasedMatrix_totColumns;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MutableRowBasedMatrix = void 0;
const abstract_matrix_1 = require("./abstract-matrix");
const matrix_1 = require("./matrix");
const illegal_argument_exception_1 = require("../../types/exceptions/illegal-argument-exception");
const invalid_column_exception_1 = require("./exceptions/invalid-column-exception");
const invalid_row_exception_1 = require("./exceptions/invalid-row-exception");
const matrix_algebra_1 = require("./matrix-algebra");
const frozen_row_based_matrix_1 = require("./frozen-row-based-matrix");
const arrays_1 = require("../../types/arrays");
/**
 * A **mutable** implementation of matrix based on a bi-dimensional array.
 * Every instance of this class is mutable and this means that can be modified with no problems.
 * So, methods like the matrix operations (`add()`, `multiply()`, `subtract()`, `divide()`) or
 * the matrix manipulation (`addRow()`, `removeRow()`, `addColumn()`, `removeColumn()`, `set()`, ecc...)
 * will modify the internal data of the matrix; **these methods will return this matrix** after the modification
 */
class MutableRowBasedMatrix extends abstract_matrix_1.AbstractMatrix {
    constructor(data) {
        super();
        _MutableRowBasedMatrix_data.set(this, void 0);
        _MutableRowBasedMatrix_totRows.set(this, void 0);
        _MutableRowBasedMatrix_totColumns.set(this, void 0);
        if (data.length > 0) {
            __classPrivateFieldSet(this, _MutableRowBasedMatrix_totRows, data.length, "f");
            __classPrivateFieldSet(this, _MutableRowBasedMatrix_totColumns, data[0].length, "f");
            for (let row of data) {
                if (row.length != __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f")) {
                    throw Error("every row must have the same number of elements");
                }
            }
            __classPrivateFieldSet(this, _MutableRowBasedMatrix_data, data, "f");
        }
    }
    add(other) {
        let mat = this;
        if (typeof other == 'number') {
            for (let r = 0; r < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"); r++) {
                for (let c = 0; c < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f"); c++) {
                    (__classPrivateFieldGet(mat, _MutableRowBasedMatrix_data, "f")[r][c]) += other;
                }
            }
        }
        else if (other instanceof abstract_matrix_1.AbstractMatrix) {
            if (!this.sameStructureOf(this)) {
                throw new illegal_argument_exception_1.IllegalArgumentException("illegal matrix to be added: this matrix has size " +
                    __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f") + " x " + __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f") + " while the argument has " + other.rowSize() +
                    " x " + other.columnSize());
            }
            for (let r = 0; r < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"); r++) {
                for (let c = 0; c < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f"); c++) {
                    __classPrivateFieldGet(mat, _MutableRowBasedMatrix_data, "f")[r][c] += other.get(r, c);
                }
            }
        }
        return mat;
    }
    addColumn(column) {
        var _a;
        if (__classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f") == 0) {
            __classPrivateFieldSet(this, _MutableRowBasedMatrix_totRows, column.length, "f");
            for (let i = 0; i < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"); i++) {
                __classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f")[i] = [];
            }
        }
        else {
            if (column.length != __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f")) {
                throw new invalid_column_exception_1.InvalidColumnException(column, "the number of the element is not the same of the column of the matrix");
            }
        }
        for (let i = 0; i < column.length; i++) {
            __classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f")[i].push(column[i]);
        }
        __classPrivateFieldSet(this, _MutableRowBasedMatrix_totColumns, (_a = __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f"), _a++, _a), "f");
        return this;
    }
    addRow(row) {
        var _a;
        if (__classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f") == 0) {
            __classPrivateFieldSet(this, _MutableRowBasedMatrix_totColumns, row.length, "f");
        }
        else {
            if (row.length != __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f")) {
                throw new invalid_row_exception_1.InvalidRowException(row, "the number of the element of the row [" + row.length +
                    "] is not the same of the column of the matrix [" + __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f") + "]");
            }
        }
        __classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f").push(row);
        __classPrivateFieldSet(this, _MutableRowBasedMatrix_totRows, (_a = __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"), _a++, _a), "f");
        return this;
    }
    calculateAndFill(builder) {
        for (let r = 0; r < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"); r++) {
            for (let c = 0; c < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f"); c++) {
                __classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f")[r][c] = builder(r, c);
            }
        }
        return this;
    }
    columnSize() {
        return __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f");
    }
    determinant() {
        return matrix_algebra_1.MatrixAlgebra.determinant(this);
    }
    divide(other) {
        let mat = this;
        if (typeof other == "number") {
            for (let r = 0; r < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"); r++) {
                for (let c = 0; c < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f"); c++) {
                    __classPrivateFieldGet(mat, _MutableRowBasedMatrix_data, "f")[r][c] /= other;
                }
            }
        }
        else {
            mat.multiply(matrix_algebra_1.MatrixAlgebra.invert(other));
        }
        return mat;
    }
    fill(value) {
        for (let r = 0; r < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"); r++) {
            for (let c = 0; c < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f"); c++) {
                __classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f")[r][c] = value;
            }
        }
        return this;
    }
    frozen() {
        return new frozen_row_based_matrix_1.FrozenRowBasedMatrix(__classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f"));
    }
    get(rowIndex, columnIndex) {
        return __classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f")[rowIndex][columnIndex];
    }
    getCharacteristicPolynomial() {
        return matrix_algebra_1.MatrixAlgebra.characteristicPolynomial(this);
    }
    getColumn(columnIndex) {
        let res = new Array(__classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"));
        for (let r = 0; r < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"); r++) {
            res[r] = __classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f")[r][columnIndex];
        }
        return res;
    }
    getFactory() {
        return MutableRowBasedMatrix.factory;
    }
    getRow(rowIndex) {
        return arrays_1.Arrays.clone(__classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f")[rowIndex]);
    }
    invert() {
        let determinant = matrix_algebra_1.MatrixAlgebra.checkInvertible(this, true);
        return this.getCofactorMatrix().transpose().multiply((1 / determinant));
    }
    isFrozen() {
        return false;
    }
    isUnfrozen() {
        return true;
    }
    multiply(other) {
        let mat = this;
        if (typeof other == "number") {
            for (let r = 0; r < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"); r++) {
                for (let c = 0; c < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f"); c++) {
                    __classPrivateFieldGet(mat, _MutableRowBasedMatrix_data, "f")[r][c] *= other;
                }
            }
        }
        else {
            let data = (0, matrix_1.matrixData)(__classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"), __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f"));
            for (let rT = 0; rT < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"); rT++) {
                for (let cO = 0; cO < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"); cO++) {
                    for (let rO = 0; rO < other.rowSize(); rO++) {
                        data[rT][cO] = data[rT][cO] + __classPrivateFieldGet(mat, _MutableRowBasedMatrix_data, "f")[rT][rO] * other.get(rO, cO);
                    }
                }
            }
            arrays_1.Arrays.copy2(data, __classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f"));
        }
        return mat;
    }
    removeColumn() {
        var _a;
        for (let r = 0; r < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"); r++) {
            __classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f").splice(__classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f") - 1, 1);
        }
        __classPrivateFieldSet(this, _MutableRowBasedMatrix_totColumns, (_a = __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f"), _a--, _a), "f");
        return this;
    }
    removeRow() {
        var _a;
        __classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f").splice(__classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f") - 1, 1);
        __classPrivateFieldSet(this, _MutableRowBasedMatrix_totRows, (_a = __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"), _a--, _a), "f");
        return this;
    }
    rowSize() {
        return __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f");
    }
    set(value, rowIndex, columnIndex) {
        this.checkValidIndexes(rowIndex, columnIndex);
        __classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f")[rowIndex][columnIndex] = value;
        return this;
    }
    setColumn(column, columnIndex) {
        this.checkValidColumnIndex(columnIndex);
        for (let r = 0; r < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"); r++) {
            __classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f")[r][columnIndex] = column[r];
        }
        return this;
    }
    setRow(row, rowIndex) {
        this.checkValidRowIndex(rowIndex);
        for (let c = 0; c < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f"); c++) {
            __classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f")[rowIndex][c] = row[c];
        }
        return this;
    }
    subtract(other) {
        let mat = this;
        let row;
        if (typeof other == "number") {
            for (let r = 0; r < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"); r++) {
                row = __classPrivateFieldGet(mat, _MutableRowBasedMatrix_data, "f")[r];
                for (let c = 0; c < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f"); c++) {
                    row[c] -= other;
                }
            }
        }
        else {
            for (let r = 0; r < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"); r++) {
                row = __classPrivateFieldGet(mat, _MutableRowBasedMatrix_data, "f")[r];
                for (let c = 0; c < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f"); c++) {
                    row[c] -= other.get(r, c);
                }
            }
        }
        return mat;
    }
    transpose() {
        if (!this.isSquared()) {
            let dim = Math.max(__classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"), __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f"));
            arrays_1.Arrays.reshape2(__classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f"), dim, dim);
        }
        for (let r = 0; r < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f") - 1; r++) {
            for (let c = r + 1; c < __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f"); c++) {
                [__classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f")[r][c], __classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f")[c][r]] = [__classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f")[c][r], __classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f")[r][c]];
            }
        }
        if (!this.isSquared()) {
            arrays_1.Arrays.reshape2(__classPrivateFieldGet(this, _MutableRowBasedMatrix_data, "f"), __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f"), __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f"));
            let temp = __classPrivateFieldGet(this, _MutableRowBasedMatrix_totRows, "f");
            __classPrivateFieldSet(this, _MutableRowBasedMatrix_totRows, __classPrivateFieldGet(this, _MutableRowBasedMatrix_totColumns, "f"), "f");
            __classPrivateFieldSet(this, _MutableRowBasedMatrix_totColumns, temp, "f");
        }
        return this;
    }
    unfrozen() {
        return this;
    }
}
exports.MutableRowBasedMatrix = MutableRowBasedMatrix;
_MutableRowBasedMatrix_data = new WeakMap(), _MutableRowBasedMatrix_totRows = new WeakMap(), _MutableRowBasedMatrix_totColumns = new WeakMap();
MutableRowBasedMatrix.factory = new class extends matrix_1.MatrixFactory {
    createMatrix(rows, columns, fill) {
        if (typeof rows == "number") {
            let data = new Array(rows);
            for (let r = 0; r < rows; r++) {
                data[r] = Array(columns);
            }
            let res = new MutableRowBasedMatrix(data);
            if (fill != undefined) {
                res.fill(fill);
            }
            return res;
        }
        else {
            return new MutableRowBasedMatrix(rows);
        }
    }
};
//# sourceMappingURL=mutable-row-based-matrix.js.map