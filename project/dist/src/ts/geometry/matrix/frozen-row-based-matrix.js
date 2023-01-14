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
var _FrozenRowBasedMatrix_data, _FrozenRowBasedMatrix_totRows, _FrozenRowBasedMatrix_totColumns;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrozenRowBasedMatrix = void 0;
const abstract_matrix_1 = require("./abstract-matrix");
const matrix_1 = require("./matrix");
const matrix_algebra_1 = require("./matrix-algebra");
const invalid_row_exception_1 = require("./exceptions/invalid-row-exception");
const arrays_1 = require("../../types/arrays");
const mutable_row_based_matrix_1 = require("./mutable-row-based-matrix");
/**
 * A **frozen** implementation of matrix based on a bi-dimensional array.
 * Every instance of this class **can NOT be modified** and each method that has to modify the
 * internal data *returns a copy* of this matrix with the required modification.
 * This means that the original matrix will never been modified
 */
class FrozenRowBasedMatrix extends abstract_matrix_1.AbstractMatrix {
    constructor(data) {
        super();
        _FrozenRowBasedMatrix_data.set(this, void 0);
        _FrozenRowBasedMatrix_totRows.set(this, void 0);
        _FrozenRowBasedMatrix_totColumns.set(this, void 0);
        if (data.length > 0) {
            (0, matrix_1.checkValidMatrixData)(data, true);
            __classPrivateFieldSet(this, _FrozenRowBasedMatrix_data, data, "f");
            __classPrivateFieldSet(this, _FrozenRowBasedMatrix_totRows, data.length, "f");
            __classPrivateFieldSet(this, _FrozenRowBasedMatrix_totColumns, data[0].length, "f");
        }
    }
    add(other) {
        if (typeof other == "number") {
            return matrix_algebra_1.MatrixAlgebra.add(this, other);
        }
        return matrix_algebra_1.MatrixAlgebra.add(this, other);
    }
    addColumn(column) {
        return new FrozenRowBasedMatrix(arrays_1.Arrays.clone2(__classPrivateFieldGet(this, _FrozenRowBasedMatrix_data, "f"), __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totRows, "f"), __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totColumns, "f") + 1));
    }
    addRow(row) {
        if (row.length != __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totColumns, "f")) {
            throw new invalid_row_exception_1.InvalidRowException(row, "the row to add has size " + row.length + " but " +
                "the matrix has " + __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totColumns, "f") + " columns");
        }
        let data = arrays_1.Arrays.clone2(__classPrivateFieldGet(this, _FrozenRowBasedMatrix_data, "f"), __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totRows, "f") + 1, __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totColumns, "f"));
        for (let c = 0; c < __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totColumns, "f"); c++) {
            data[__classPrivateFieldGet(this, _FrozenRowBasedMatrix_totRows, "f")][c] = row[c];
        }
        return new FrozenRowBasedMatrix(data);
    }
    calculateAndFill(builder) {
        let data = new Array(__classPrivateFieldGet(this, _FrozenRowBasedMatrix_totRows, "f"));
        for (let r = 0; r < __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totRows, "f"); r++) {
            data[r] = new Array(__classPrivateFieldGet(this, _FrozenRowBasedMatrix_totColumns, "f"));
            for (let c = 0; c < __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totColumns, "f"); c++) {
                data[r][c] = builder(r, c);
            }
        }
        return new FrozenRowBasedMatrix(data);
    }
    columnSize() {
        return __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totColumns, "f");
    }
    determinant() {
        return matrix_algebra_1.MatrixAlgebra.determinant(this);
    }
    divide(other) {
        if (typeof other == "number")
            return matrix_algebra_1.MatrixAlgebra.divide(this, other);
        return matrix_algebra_1.MatrixAlgebra.divide(this, other);
    }
    fill(value) {
        let data = new Array(__classPrivateFieldGet(this, _FrozenRowBasedMatrix_totRows, "f"));
        for (let r = 0; r < __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totRows, "f"); r++) {
            data[r] = new Array(__classPrivateFieldGet(this, _FrozenRowBasedMatrix_totColumns, "f"));
            for (let c = 0; c < __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totColumns, "f"); c++) {
                data[r][c] = value;
            }
        }
        return new FrozenRowBasedMatrix(data);
    }
    frozen() {
        return this;
    }
    get(rowIndex, columnIndex) {
        return __classPrivateFieldGet(this, _FrozenRowBasedMatrix_data, "f")[rowIndex][columnIndex];
    }
    getCharacteristicPolynomial() {
        return matrix_algebra_1.MatrixAlgebra.characteristicPolynomial(this);
    }
    getColumn(columnIndex) {
        let res = new Array(__classPrivateFieldGet(this, _FrozenRowBasedMatrix_totRows, "f"));
        for (let r = 0; r < __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totRows, "f"); r++) {
            res[r] = __classPrivateFieldGet(this, _FrozenRowBasedMatrix_data, "f")[r][columnIndex];
        }
        return res;
    }
    getFactory() {
        return FrozenRowBasedMatrix.factory;
    }
    getRow(rowIndex) {
        let res = new Array(__classPrivateFieldGet(this, _FrozenRowBasedMatrix_totColumns, "f"));
        for (let c = 0; c < __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totColumns, "f"); c++) {
            res[c] = __classPrivateFieldGet(this, _FrozenRowBasedMatrix_data, "f")[rowIndex][c];
        }
        return res;
    }
    invert() {
        return matrix_algebra_1.MatrixAlgebra.invert(this);
    }
    isFrozen() {
        return true;
    }
    isUnfrozen() {
        return false;
    }
    multiply(other) {
        if (typeof other == "number") {
            return matrix_algebra_1.MatrixAlgebra.multiply(this, other);
        }
        return matrix_algebra_1.MatrixAlgebra.multiply(this, other);
    }
    removeColumn() {
        return new FrozenRowBasedMatrix(arrays_1.Arrays.clone2(__classPrivateFieldGet(this, _FrozenRowBasedMatrix_data, "f"), __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totRows, "f"), __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totColumns, "f") - 1));
    }
    removeRow() {
        return new FrozenRowBasedMatrix(arrays_1.Arrays.clone2(__classPrivateFieldGet(this, _FrozenRowBasedMatrix_data, "f"), __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totRows, "f") - 1, __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totColumns, "f")));
    }
    rowSize() {
        return __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totRows, "f");
    }
    set(value, rowIndex, columnIndex) {
        this.checkValidIndexes(rowIndex, columnIndex);
        let data = arrays_1.Arrays.clone2(__classPrivateFieldGet(this, _FrozenRowBasedMatrix_data, "f"));
        data[rowIndex][columnIndex] = value;
        return new FrozenRowBasedMatrix(data);
    }
    setColumn(column, columnIndex) {
        this.checkValidColumnIndex(columnIndex);
        let data = arrays_1.Arrays.clone2(__classPrivateFieldGet(this, _FrozenRowBasedMatrix_data, "f"));
        for (let r = 0; r < __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totRows, "f"); r++) {
            data[r][columnIndex] = column[r];
        }
        return new FrozenRowBasedMatrix(data);
    }
    setRow(row, rowIndex) {
        this.checkValidRowIndex(rowIndex);
        let data = arrays_1.Arrays.clone2(__classPrivateFieldGet(this, _FrozenRowBasedMatrix_data, "f"));
        for (let c = 0; c < __classPrivateFieldGet(this, _FrozenRowBasedMatrix_totColumns, "f"); c++) {
            data[rowIndex][c] = row[c];
        }
        return new FrozenRowBasedMatrix(data);
    }
    subtract(other) {
        if (typeof other == "number") {
            return matrix_algebra_1.MatrixAlgebra.subtract(this, other);
        }
        return matrix_algebra_1.MatrixAlgebra.subtract(this, other);
    }
    transpose() {
        return matrix_algebra_1.MatrixAlgebra.transpose(this);
    }
    unfrozen() {
        return new mutable_row_based_matrix_1.MutableRowBasedMatrix(__classPrivateFieldGet(this, _FrozenRowBasedMatrix_data, "f"));
    }
}
exports.FrozenRowBasedMatrix = FrozenRowBasedMatrix;
_FrozenRowBasedMatrix_data = new WeakMap(), _FrozenRowBasedMatrix_totRows = new WeakMap(), _FrozenRowBasedMatrix_totColumns = new WeakMap();
FrozenRowBasedMatrix.factory = new class extends matrix_1.MatrixFactory {
    createMatrix(rows, columns, fill) {
        if (typeof rows == "number") {
            return new FrozenRowBasedMatrix((0, matrix_1.matrixData)(rows, columns, fill));
        }
        else {
            return new FrozenRowBasedMatrix(rows);
        }
    }
};
//# sourceMappingURL=frozen-row-based-matrix.js.map