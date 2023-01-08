"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractMatrix = void 0;
const illegal_column_index_exception_1 = require("./illegal-column-index-exception");
const illegal_row_index_exception_1 = require("./illegal-row-index-exception");
class AbstractMatrix {
    calculateAndFill(builder) {
        for (let r = 0; r < this.rowSize(); r++) {
            for (let c = 0; r < this.columnSize(); c++) {
                this.set(builder(r, c), r, c);
            }
        }
    }
    checkValidColumnIndex(columnIndex, throwError) {
        if (throwError == undefined) {
            throwError = false;
        }
        if (columnIndex < 0 || columnIndex >= this.columnSize()) {
            if (throwError) {
                throw new illegal_column_index_exception_1.IllegalColumnIndexException(columnIndex, this.columnSize() - 1);
            }
            return true;
        }
    }
    checkValidIndexes(rowIndex, columnIndex, throwError) {
        if (throwError == undefined) {
            throwError = false;
        }
        if (this.checkValidRowIndex(rowIndex, throwError))
            return this.checkValidColumnIndex(columnIndex, throwError);
        return false;
    }
    checkValidRowIndex(rowIndex, throwError) {
        if (throwError == undefined) {
            throwError = false;
        }
        if (rowIndex < 0 || rowIndex >= this.rowSize()) {
            if (throwError) {
                throw new illegal_row_index_exception_1.IllegalRowIndexException(rowIndex, this.rowSize() - 1);
            }
            return true;
        }
    }
    clone(rowIndexesToRemove, columnIndexesToRemove) {
        if (rowIndexesToRemove == undefined) {
            rowIndexesToRemove = [];
        }
        if (columnIndexesToRemove == undefined) {
            columnIndexesToRemove = [];
        }
        let res;
        if (rowIndexesToRemove.length == 0 && columnIndexesToRemove.length == 0) {
            /* Normal Clone *************************************************** */
            res = this.getFactory().createMatrix(this.rowSize(), this.columnSize());
            for (let r = 0; r < this.rowSize(); r++) {
                for (let c = 0; c < this.columnSize(); c++) {
                    res.set(this.get(r, c), r, c);
                }
            }
        }
        else {
            /* Clone with cuts ************************************************ */
            res = this.getFactory().createMatrix(this.rowSize() - rowIndexesToRemove.length, this.columnSize() - columnIndexesToRemove.length);
            let rR = 0;
            let cR = 0;
            for (let r = 0; r < this.rowSize(); r++) {
                if (!rowIndexesToRemove.includes(r)) {
                    cR = 0;
                    for (let c = 0; r < this.columnSize(); c++) {
                        if (!columnIndexesToRemove.includes(c)) {
                            res.set(this.get(r, c), rR, cR);
                            cR++;
                        }
                    }
                    rR++;
                }
            }
        }
        return res;
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