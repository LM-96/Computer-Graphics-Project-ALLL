"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractMatrix = void 0;
const types_1 = require("../../../types/types");
class AbstractMatrix {
    add(toAdd) {
        if (toAdd instanceof AbstractMatrix) {
            if (!this.sameStructureOf(this)) {
                throw new types_1.IllegalArgumentException("illegal matrix to be added: this matrix has size " +
                    this.rowSize() + " x " + this.rowSize() + " while the argument has " + toAdd.rowSize() +
                    " x " + toAdd.columnSize());
            }
            let res = this.getFactory().newNumMatrix(this.rowSize(), this.columnSize());
            for (let r = 0; r < this.rowSize(); r++) {
                for (let c = 0; c < this.columnSize(); c++) {
                    res.set(this.get(r, c) + toAdd.get(r, c), r, c);
                }
            }
            return res;
        }
    }
    addColumn(column) {
        return undefined;
    }
    addRow(row) {
        return undefined;
    }
    calculateAndFill(builder) {
    }
    checkValidColumnIndex(columnIndex, throwError) {
        return false;
    }
    checkValidIndexes(rowIndex, columnIndex, throwError) {
        return false;
    }
    checkValidRowIndex(rowIndex, throwError) {
        return false;
    }
    clone(rowIndexesToRemove, columnIndexesToRemove) {
        return undefined;
    }
    columnSize() {
        return 0;
    }
    determinant() {
        return 0;
    }
    divide(scalar) {
        return undefined;
    }
    elementSize() {
        return 0;
    }
    equals(other) {
        return false;
    }
    fill(value) {
    }
    flatten(flatType) {
    }
    forEachColumn(block) {
    }
    forEachElement(block) {
    }
    forEachRow(block) {
    }
    get(rowIndex, columnIndex) {
        return undefined;
    }
    getCofactor(rowIndex, columnIndex) {
        return 0;
    }
    getCofactorMatrix() {
        return undefined;
    }
    getColumn(columnIndex) {
        return undefined;
    }
    getFactory() {
        return undefined;
    }
    getMinor(rowIndex, columnIndex) {
        return undefined;
    }
    getRow(rowIndex) {
        return undefined;
    }
    invert() {
        return undefined;
    }
    isDiagonal() {
        return false;
    }
    isInvertible() {
        return false;
    }
    isLowerTriangular() {
        return false;
    }
    isSquared() {
        return false;
    }
    isTriangular() {
        return false;
    }
    isUpperTriangular() {
        return false;
    }
    mapColumnByColumn(mapper) {
        return undefined;
    }
    mapElementByElement(mapper) {
        return undefined;
    }
    mapRowByRow(mapper) {
        return undefined;
    }
    multiply(scalar) {
        return undefined;
    }
    removeColumn() {
        return undefined;
    }
    removeRow() {
        return undefined;
    }
    rowSize() {
        return 0;
    }
    sameStructureOf(other) {
        return false;
    }
    set(value, rowIndex, columnIndex) {
    }
    setColumn(column, columnIndex) {
    }
    setRow(row, rowIndex) {
        return undefined;
    }
    size() {
        return undefined;
    }
    subMatrix(topRow, leftColumn, bottomRow, rightColumn) {
        return undefined;
    }
    subtract(scalar) {
        return undefined;
    }
    toArrayOfColumns() {
        return undefined;
    }
    toArrayOfRows() {
        return undefined;
    }
    trace() {
        return 0;
    }
    transpose() {
        return undefined;
    }
}
exports.AbstractMatrix = AbstractMatrix;
//# sourceMappingURL=abstract-matrix.js.map