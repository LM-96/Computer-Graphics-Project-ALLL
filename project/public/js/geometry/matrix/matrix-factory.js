"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matrix = exports.MatrixFactory = void 0;
const abstract_matrix_old_1 = require("./abstract-matrix-old");
const simple_row_based_matrix_1 = require("./simple-row-based-matrix");
const illegal_argument_exception_1 = require("../../types/illegal-argument-exception");
/**
 * A factory for a type of matrix.
 * Each class which extends `Matrix` should have a *static* factory
 */
class MatrixFactory {
    createSquaredMatrix(dim, fill) {
        return this.createMatrix(dim, dim, fill);
    }
    createNumberMatrix(rows, columns, fill) {
        return this.createMatrix(rows, columns, fill);
    }
    createSquaredNumberMatrix(dim, fill) {
        return this.createSquaredMatrix(dim, fill);
    }
    /**
     * Converts a flat array to a matrix by specifying the type of the flat and the numbers of the
     * element of a group. This method performs the opposite operations of `flatten`.
     * Precisely, if `flatType` is:
     *
     * - `FlatType.BY_ROWS` then the elements of the array will be split in groups, each with the
     * dimension specified by `groupSize`; **each group will be a row** of the resulting matrix
     * (for example `[1, 2, 3, 4, 5, 6]` with `groupSize=2` and `flatType=FlatType.BY_ROWS` will make
     * this method returning the matrix `[[1, 2], [3, 4], [5, 6]]`);
     * this means that in this case **`groupSize` will become the number of the columns** of the resulting matrix
     *
     * - `FlatType.BY_COLUMNS` then the elements of the array will be split in groups, each with the
     * dimension specified by `groupSize`; **each group will be a column** of the resulting matrix
     * (for example `[1, 2, 3, 4, 5, 6]` with `groupSize=2` and `flatType=FlatType.BY_COLUMNS` will make
     * this method returning the matrix `[[1, 3, 5], [2, 4, 6]]`);
     * this means that in this case **`groupSize` will become the number of the rows** of the resulting matrix
     * @param array the flat array to be converted into a matrix
     * @param groupSize the number of the elements of each group
     * @param flatType the type of the groups (indicates if each group will be a *row* or a *column*
     * of the new matrix
     */
    createFromFlatten(array, groupSize, flatType = abstract_matrix_old_1.FlatType.BY_ROWS) {
        if (array.length % groupSize != 0) {
            throw new illegal_argument_exception_1.IllegalArgumentException("the dimension of the given array is not a multiple of the size of the group");
        }
        let res;
        switch (flatType) {
            case abstract_matrix_old_1.FlatType.BY_ROWS: {
                let rows = array.length / groupSize;
                res = this.createMatrix(rows, groupSize);
                for (let i = 0; i < array.length; i++) {
                    res.set(array[i], Math.floor(i / groupSize), groupSize);
                }
                break;
            }
            case abstract_matrix_old_1.FlatType.BY_COLUMNS: {
                let columns = array.length / groupSize;
                res = this.createMatrix(groupSize, columns);
                for (let i = 0; i < array.length; i++) {
                    res.set(array[i], i % groupSize, Math.floor(i / groupSize));
                }
                break;
            }
        }
        return res;
    }
}
exports.MatrixFactory = MatrixFactory;
function matrix(arrayOrRows, columns) {
    let factory = simple_row_based_matrix_1.SimpleRowBasedMatrix.factory;
    if (arrayOrRows instanceof Array) {
        let rRows = arrayOrRows.length;
        let rColumns = Math.max(...arrayOrRows.map((array) => array.length));
        let res = factory.createMatrix(rRows, rColumns);
        let currRow;
        for (let r = 0; r < rRows; r++) {
            currRow = arrayOrRows[r];
            for (let c = 0; c < currRow.length; c++) {
                res.set(currRow[c], r, c);
            }
        }
        return res;
    }
    else {
        return factory.createMatrix(arrayOrRows, columns);
    }
}
exports.matrix = matrix;
//# sourceMappingURL=matrix-factory.js.map