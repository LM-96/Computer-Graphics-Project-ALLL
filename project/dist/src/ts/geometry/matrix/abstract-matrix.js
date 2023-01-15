"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractMatrix = void 0;
const matrix_1 = require("./matrix");
const illegal_column_index_exception_1 = require("./exceptions/illegal-column-index-exception");
const illegal_row_index_exception_1 = require("./exceptions/illegal-row-index-exception");
const illegal_argument_exception_1 = require("../../types/exceptions/illegal-argument-exception");
const pair_1 = require("../../types/pair");
class AbstractMatrix {
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
    elementSize() {
        return this.rowSize() * this.columnSize();
    }
    equals(other) {
        if (other != null) {
            if (other instanceof AbstractMatrix) {
                if (this.sameStructureOf(other)) {
                    for (let row = 0; row < this.rowSize(); row++) {
                        for (let col = 0; col < this.columnSize(); col++) {
                            if (this.get(row, col) !== other.get(row, col)) {
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
    flatten(flatType) {
        if (flatType == undefined) {
            flatType = matrix_1.FlatType.BY_ROWS;
        }
        let res = Array(this.elementSize());
        switch (flatType) {
            case matrix_1.FlatType.BY_ROWS: {
                for (let r = 0; r < this.rowSize(); r++) {
                    for (let c = 0; c < this.columnSize(); c++) {
                        res[r * this.columnSize() + c] = this.get(r, c);
                    }
                }
                break;
            }
            case matrix_1.FlatType.BY_COLUMNS: {
                for (let r = 0; r < this.rowSize(); r++) {
                    for (let c = 0; c < this.columnSize(); c++) {
                        res[c * this.rowSize() + r] = this.get(r, c);
                    }
                }
                break;
            }
        }
        return res;
    }
    forEachColumn(block) {
        for (let c = 0; c < this.columnSize(); c++) {
            block(this.getColumn(c), c);
        }
    }
    forEachElement(block) {
        for (let r = 0; r < this.rowSize(); r++) {
            for (let c = 0; c < this.columnSize(); c++) {
                block(this.get(r, c), r, c);
            }
        }
    }
    forEachRow(block) {
        for (let r = 0; r < this.rowSize(); r++) {
            block(this.getRow(r), r);
        }
    }
    getCofactor(rowIndex, columnIndex) {
        this.checkValidIndexes(rowIndex, columnIndex, true);
        return Math.pow(-1, rowIndex + columnIndex) * (this.getMinor(rowIndex, columnIndex).determinant());
    }
    getCofactorMatrix() {
        let res = this.getFactory().createNumberMatrix(this.rowSize(), this.columnSize());
        for (let r = 0; r < this.rowSize(); r++) {
            for (let c = 0; c < this.columnSize(); c++) {
                res.set(this.getCofactor(r, c), r, c);
            }
        }
        return res;
    }
    getMinor(rowIndex, columnIndex) {
        this.checkValidIndexes(rowIndex, columnIndex, true);
        let data = (0, matrix_1.matrixData)(this.rowSize() - 1, this.columnSize() - 1);
        let rR = 0;
        let cR = 0;
        for (let r = 0; r < this.rowSize(); r++) {
            if (r != rowIndex) {
                cR = 0;
                for (let c = 0; c < this.columnSize(); c++) {
                    if (c != columnIndex) {
                        data[rR][cR] = this.get(r, c);
                        cR++;
                    }
                }
                rR++;
            }
        }
        return this.getFactory().createMatrix(data);
    }
    isDiagonal() {
        let element;
        for (let r = 0; r < this.rowSize(); r++) {
            for (let c = 0; c < this.columnSize(); c++) {
                if (r != c) {
                    element = this.get(r, c);
                    if (element != null && element != 0)
                        return false;
                }
            }
        }
        return true;
    }
    isInvertible() {
        return this.isSquared() && this.determinant() != 0;
    }
    isLowerTriangular() {
        let element;
        for (let r = 0; r < this.rowSize(); r++) {
            for (let c = 0; c < this.columnSize(); c++) {
                if (r < c) {
                    element = this.get(r, c);
                    if (element != null && element != 0)
                        return false;
                }
            }
        }
        return true;
    }
    isSquared() {
        return this.rowSize() === this.columnSize();
    }
    isTriangular() {
        return this.isUpperTriangular() || this.isLowerTriangular();
    }
    isUpperTriangular() {
        let element;
        for (let r = 0; r < this.rowSize(); r++) {
            for (let c = 0; c < this.columnSize(); c++) {
                if (r > c) {
                    element = this.get(r, c);
                    if (element != null && element != 0)
                        return false;
                }
            }
        }
        return true;
    }
    mapColumnByColumn(mapper) {
        let res = this.getFactory().createMatrix(this.rowSize(), this.columnSize());
        for (let c = 0; c < res.columnSize(); c++) {
            res.setColumn(mapper(this.getColumn(c), c), c);
        }
        return res;
    }
    mapElementByElement(mapper) {
        let res = this.getFactory().createMatrix(this.rowSize(), this.columnSize());
        for (let r = 0; r < res.rowSize(); r++) {
            for (let c = 0; c < res.columnSize(); c++) {
                res.set(mapper(this.get(r, c), r, c), r, c);
            }
        }
        return res;
    }
    mapRowByRow(mapper) {
        let res = this.getFactory().createMatrix(this.rowSize(), this.columnSize());
        for (let r = 0; r < res.rowSize(); r++) {
            res.setRow(mapper(this.getRow(r), r), r);
        }
        return res;
    }
    sameStructureOf(other) {
        return this.rowSize() == other.rowSize() && this.columnSize() == other.columnSize();
    }
    size() {
        return (0, pair_1.coupleOf)(this.rowSize(), this.columnSize());
    }
    subMatrix(topRow, leftColumn, bottomRow, rightColumn) {
        if (bottomRow == undefined) {
            bottomRow = this.rowSize() - 1;
        }
        if (rightColumn == undefined) {
            rightColumn = this.columnSize() - 1;
        }
        // Check all >= 0
        if (topRow < 0)
            throw new illegal_argument_exception_1.IllegalArgumentException("top row [" + topRow + "] MUST be greater than 0");
        if (bottomRow < 0)
            throw new illegal_argument_exception_1.IllegalArgumentException("bottom row [" + bottomRow + "] MUST be greater than 0");
        if (rightColumn < 0)
            throw new illegal_argument_exception_1.IllegalArgumentException("right column [" + rightColumn + "] MUST be greater than 0");
        if (leftColumn < 0)
            throw new illegal_argument_exception_1.IllegalArgumentException("left column [" + leftColumn + "] MUST be greater than 0");
        // Check coherence
        if (bottomRow < topRow)
            throw new illegal_argument_exception_1.IllegalArgumentException("bottom row [" + bottomRow + "] must be greater than top row [" + topRow + "]");
        if (rightColumn < leftColumn)
            throw new illegal_argument_exception_1.IllegalArgumentException("right column [" + rightColumn + "] must be greater than left column [" + leftColumn + "]");
        //Check inside matrix
        if (topRow >= this.rowSize())
            throw new illegal_argument_exception_1.IllegalArgumentException("top row [" + topRow + "] MUST NOT go outside the matrix");
        if (bottomRow >= this.rowSize())
            throw new illegal_argument_exception_1.IllegalArgumentException("bottom row [" + bottomRow + "] MUST NOT go outside the matrix");
        if (leftColumn >= this.columnSize())
            throw new illegal_argument_exception_1.IllegalArgumentException("left column [" + leftColumn + "] MUST NOT go outside the matrix");
        if (rightColumn >= this.columnSize())
            throw new illegal_argument_exception_1.IllegalArgumentException("left column [" + rightColumn + "] MUST NOT go outside the matrix");
        let res = this.getFactory().createMatrix(bottomRow - topRow + 1, rightColumn - leftColumn + 1);
        for (let r = topRow; r <= bottomRow; r++) {
            for (let c = leftColumn; c <= rightColumn; c++) {
                this.set(this.get(r, c), r - topRow, c - leftColumn);
            }
        }
        return res;
    }
    toArrayOfColumns() {
        let res = new Array();
        for (let c = 0; c < this.columnSize(); c++) {
            res.push(this.getColumn(c));
        }
        return res;
    }
    toArrayOfRows() {
        let res = new Array();
        for (let r = 0; r < this.rowSize(); r++) {
            res.push(this.getRow(r));
        }
        return res;
    }
    trace() {
        if (!this.isSquared()) {
            throw new illegal_argument_exception_1.IllegalArgumentException("this matrix is not squared [size: " + this.size().toArray() + "]");
        }
        let res = 0;
        for (let i = 0; i < this.rowSize(); i++)
            res += this.get(i, i);
        return res;
    }
    toString() {
        return this.toArrayOfRows().toString();
    }
}
exports.AbstractMatrix = AbstractMatrix;
//# sourceMappingURL=abstract-matrix.js.map