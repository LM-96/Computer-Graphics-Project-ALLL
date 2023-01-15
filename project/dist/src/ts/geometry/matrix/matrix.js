"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.identityMatrix = exports.checkValidMatrixData = exports.matrixData = exports.mutableMatrix = exports.frozenMatrix = exports.matrix = exports.MatrixFactory = exports.FlatType = void 0;
var FlatType;
(function (FlatType) {
    FlatType[FlatType["BY_ROWS"] = 0] = "BY_ROWS";
    FlatType[FlatType["BY_COLUMNS"] = 1] = "BY_COLUMNS";
})(FlatType = exports.FlatType || (exports.FlatType = {}));
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
     * Creates and return the identity matrix with the given dimension
     * @param {number} dim the dimension of the identity matrix
     */
    createIdentityMatrix(dim) {
        return this.createSquaredNumberMatrix(dim).calculateAndFill((rowIndex, columnIndex) => {
            if (rowIndex == columnIndex) {
                return 1;
            }
            else {
                return 0;
            }
        });
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
    createFromFlatten(array, groupSize, flatType = FlatType.BY_ROWS) {
        if (array.length % groupSize != 0) {
            throw new illegal_argument_exception_1.IllegalArgumentException("the dimension of the given array is not a multiple of the size of the group");
        }
        let res;
        switch (flatType) {
            case FlatType.BY_ROWS: {
                let rows = array.length / groupSize;
                res = this.createMatrix(rows, groupSize);
                for (let i = 0; i < array.length; i++) {
                    res.set(array[i], Math.floor(i / groupSize), groupSize);
                }
                break;
            }
            case FlatType.BY_COLUMNS: {
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
    /**
     * Creates a new matrix starting from another one by transforming each element of the `other` matrix
     * to the elements of the new one by applying the `elementMapper` function
     * @param {Matrix<T>>} other the other matrix
     * @param {element: T, row: number, column: number) => R} elementMapper the function to be applied on each
     * element of the `other` matrix to create the new ones
     * @return {Matrix<R>} the new matrix
     */
    createFromOther(other, elementMapper) {
        let res = this.createMatrix(other.rowSize(), other.columnSize());
        for (let r = 0; r < res.rowSize(); r++) {
            for (let c = 0; c < res.columnSize(); c++) {
                res = res.set(elementMapper(other.get(r, c), r, c), r, c);
            }
        }
        return res;
    }
    /**
     * Creates and returns a new matrix with the same structure of the `other` given as parameter
     * (with the same number of rows and columns)
     * @param {Matrix<any>} other the other matrix
     * @return {Matrix<T>} the new matrix with the same structure of the `other`
     */
    createWithSameStructureOf(other) {
        return this.createMatrix(other.rowSize(), other.columnSize());
    }
}
exports.MatrixFactory = MatrixFactory;
const frozen_row_based_matrix_1 = require("./frozen-row-based-matrix");
const mutable_row_based_matrix_1 = require("./mutable-row-based-matrix");
const illegal_argument_exception_1 = require("../../types/exceptions/illegal-argument-exception");
function matrix(arrayOrRows, columns, fill) {
    let factory = frozen_row_based_matrix_1.FrozenRowBasedMatrix.factory;
    if (typeof arrayOrRows == "number") {
        return factory.createMatrix(arrayOrRows, columns, fill);
    }
    else {
        return factory.createMatrix(arrayOrRows);
    }
    /*
    let factory: MatrixFactory = FrozenRowBasedMatrix.factory

    if(arrayOrRows instanceof Array) {
        let rRows = arrayOrRows.length
        let rColumns = Math.max(...arrayOrRows.map((array: Array<T>) => array.length))
        let res: Matrix<T> = factory.createMatrix(rRows, rColumns)
        let currRow: Row<T>

        for(let r = 0; r < rRows; r++) {
            currRow = arrayOrRows[r]
            for(let c = 0; c < currRow.length; c++) {
                res.set(currRow[c], r, c)
            }
        }
        return res

    } else {
        return factory.createMatrix<T>(arrayOrRows as number, columns, fill)
    }*/
}
exports.matrix = matrix;
function frozenMatrix(arrayOrRows, columns, fill) {
    let factory = frozen_row_based_matrix_1.FrozenRowBasedMatrix.factory;
    if (typeof arrayOrRows == "number") {
        return factory.createMatrix(arrayOrRows, columns, fill);
    }
    else {
        return factory.createMatrix(arrayOrRows);
    }
}
exports.frozenMatrix = frozenMatrix;
function mutableMatrix(arrayOrRows, columns, fill) {
    let factory = mutable_row_based_matrix_1.MutableRowBasedMatrix.factory;
    if (typeof arrayOrRows == "number") {
        return factory.createMatrix(arrayOrRows, columns, fill);
    }
    else {
        return factory.createMatrix(arrayOrRows);
    }
}
exports.mutableMatrix = mutableMatrix;
function matrixData(rows, columns, fill) {
    let res = new Array(rows);
    if (fill == undefined) {
        for (let r = 0; r < rows; r++) {
            res[r] = new Array(columns);
        }
    }
    else {
        let row;
        for (let r = 0; r < rows; r++) {
            row = new Array(columns);
            for (let c = 0; c < columns; c++) {
                row[c] = fill;
            }
            res[r] = row;
        }
    }
    return res;
}
exports.matrixData = matrixData;
/**
 * Checks if the given bi-dimensional array has a valid format to be the internal data af a matrix.
 * This means that the bi-dimensional array given has parameter must have each element that is an
 * array with the same length as the others,
 * If `throwError` is true, this method will throw `IllegalArgumentException` if the given data
 * is not valid instead of returning a boolean
 * @param {Array<Array<T>>|Array<Row<T>>|MatrixData<T>} data the data to be checked
 * @param {boolean} throwError a flag that, if `true` make this method throwing an exception
 * @return {boolean} a boolean that indicates if the data is valid
 * @throws {IllegalArgumentException} if `throwError` is `true` and the data is not valid
 */
function checkValidMatrixData(data, throwError = false) {
    let totColumns = data[0].length;
    for (let row of data) {
        if (row.length != totColumns) {
            if (throwError) {
                throw new illegal_argument_exception_1.IllegalArgumentException("every row must have the same number of elements");
            }
            return false;
        }
    }
    return true;
}
exports.checkValidMatrixData = checkValidMatrixData;
/**
 * Creates and returns the identity matrix
 * @param {number} dim the dimension of the matrix to be created
 * @return {NumMatrix} the identity matrix with the specified dimension
 */
function identityMatrix(dim) {
    let res = matrix(dim, dim, 0);
    for (let i = 0; i < dim; i++) {
        res.set(1, i, i);
    }
    return res;
}
exports.identityMatrix = identityMatrix;
//# sourceMappingURL=matrix.js.map