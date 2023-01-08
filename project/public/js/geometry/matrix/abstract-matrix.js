"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractMatrix = exports.FlatType = void 0;
const types_1 = require("../../types/types");
const illegal_row_index_exception_1 = require("./exceptions/illegal-row-index-exception");
const illegal_column_index_exception_1 = require("./exceptions/illegal-column-index-exception");
var FlatType;
(function (FlatType) {
    FlatType[FlatType["BY_ROWS"] = 0] = "BY_ROWS";
    FlatType[FlatType["BY_COLUMNS"] = 1] = "BY_COLUMNS";
})(FlatType = exports.FlatType || (exports.FlatType = {}));
/**
 * A NxN Matrix.
 * This class contains also methods that makes sense only if the type of the element is `number`
 * (like `determinant` or `trace`). Check the documentation before using a method and make
 * sure that the matrix contains only numbers before using these kind of methods.
 *
 * **Each implementation of this class should also have a *static* and *readonly* instance of `MatrixFactory`**
 * that is the one returned by the `getFactory()` method
 */
class AbstractMatrix extends types_1.AbstractFunctionalObject {
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
    checkValidRowIndex(rowIndex, throwError = false) {
        if (rowIndex < 0 || rowIndex >= this.rowSize()) {
            if (throwError) {
                throw new illegal_row_index_exception_1.IllegalRowIndexException(rowIndex, this.rowSize() - 1);
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
        if (columnIndex < 0 || columnIndex >= this.columnSize()) {
            if (throwError) {
                throw new illegal_column_index_exception_1.IllegalColumnIndexException(columnIndex, this.columnSize() - 1);
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
     * Returns `true` if this matrix is **squared**
     */
    isSquared() {
        return this.rowSize() === this.columnSize();
    }
    /**
     * Returns `true` if this matrix is diagonal.
     * This method will **work also with non-numerical matrices** by checking
     * if all the elements outside the diagonal are `null`
     */
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
    /**
     * Returns `true` if this matrix is **upper triangular**.
     * This method will **work also with non-numerical matrices** by checking
     * if all the elements upper to the diagonal are `null`
     */
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
    /**
     * Returns `true` if this matrix is **upper triangular**.
     * This method will **work also with non-numerical matrices** by checking
     * if all the elements lower to the diagonal are `null`
     */
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
    /**
     * Returns `true` if this matrix is **triangular** (*upper* or *lower*).
     * This method will **work also with non-numerical matrices** by checking
     * if all the elements upper or lower to the diagonal are `null`
     */
    isTriangular() {
        return this.isUpperTriangular() || this.isLowerTriangular();
    }
    /**
     * Returns `true` if this matrix is *invertible*.
     * If this method returns `true`, it is possible to invoke the
     * `invert` method to obtain the *inverse matrix*
     */
    isInvertible() {
        return this.isSquared() && this.determinant() != 0;
    }
    /**
     * Returns the number of the elements in this matrix
     */
    elementSize() {
        return this.rowSize() * this.columnSize();
    }
    /**
     * Returns a couple which contains the size of the matrix.
     * In particular:
     * - the **first** element is the number of the **rows**
     * - the **second** element is the number of the **columns**
     */
    size() {
        return (0, types_1.coupleOf)(this.rowSize(), this.columnSize());
    }
    /**
     * Compares the structure of this matrix with the one given as argument.
     * Then, this method returns `true` only if the two matrix have the same number of row
     * and the same number of columns
     * @param other
     */
    sameStructureOf(other) {
        return this.rowSize() == other.rowSize() && this.columnSize() == other.columnSize();
    }
    /**
     * Fills this matrix by overriding all the values with the one given as parameter
     * @param {T} value the value to be used
     */
    fill(value) {
        for (let r = 0; r < this.rowSize(); r++) {
            for (let c = 0; r < this.columnSize(); c++) {
                this.set(value, r, c);
            }
        }
    }
    /**
     * Fills this matrix by calculating each element using the `builder` function
     * @param {(rowIndex: number, columnIndex: number) => T} builder the function that
     * let to create each element of the matrix knowing its row and its column
     */
    calculateAndFill(builder) {
        for (let r = 0; r < this.rowSize(); r++) {
            for (let c = 0; r < this.columnSize(); c++) {
                this.set(builder(r, c), r, c);
            }
        }
    }
    forEachRow(block) {
        for (let r = 0; r < this.rowSize(); r++) {
            block(this.getRow(r), r);
        }
    }
    forEachColumn(block) {
        for (let c = 0; c < this.columnSize(); c++) {
            block(this.getColumn(c), c);
        }
    }
    mapRowByRow(mapper) {
        let result = this.getFactory().createMatrix(this.rowSize(), this.columnSize());
        for (let r = 0; r < this.rowSize(); r++) {
            result.setRow(mapper(this.getRow(r), r), r);
        }
        return result;
    }
    mapColumnByColumn(mapper) {
        let result = this.getFactory().createMatrix(this.rowSize(), this.columnSize());
        for (let c = 0; c < this.columnSize(); c++) {
            result.setColumn(mapper(this.getColumn(c), c), c);
        }
        return result;
    }
    mapElementByElement(mapper) {
        let result = this.getFactory().createMatrix(this.rowSize(), this.columnSize());
        for (let r = 0; r < this.rowSize(); r++) {
            for (let c = 0; c < this.columnSize(); c++) {
                result.set(mapper(this.get(r, c), r, c), r, c);
            }
        }
        return result;
    }
    /**
     * Returns `true` if the two matrix are equals (contains the same elements)
     * @param {SimpleRowBasedMatrix} other the other matrix
     */
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
    toString() {
        let res = "Matrix " + this.rowSize() + "x" + this.columnSize() + ": [";
        for (let r = 0; r < this.rowSize(); r++) {
            res += ("[" + this.getRow(r).join(", ") + "], ");
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
            res = this.getFactory().createMatrix(this.rowSize(), this.columnSize());
            for (let r = 0; r < this.rowSize(); r++) {
                for (let c = 0; c < this.columnSize(); c++) {
                    res.set(this.get(r, c), r, c);
                }
            }
        }
        else {
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
    flatten(flatType = FlatType.BY_ROWS) {
        let res = Array(this.elementSize());
        switch (flatType) {
            case FlatType.BY_ROWS: {
                for (let r = 0; r < this.rowSize(); r++) {
                    for (let c = 0; c < this.columnSize(); c++) {
                        res[r * this.columnSize() + c] = this.get(r, c);
                    }
                }
                break;
            }
            case FlatType.BY_COLUMNS: {
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
}
exports.AbstractMatrix = AbstractMatrix;
//# sourceMappingURL=abstract-matrix.js.map