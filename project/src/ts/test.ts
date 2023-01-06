import {FlatType, Matrix} from "./matrix";

let matrix: Matrix<number> = Matrix.asMatrix([[1, 2, 3], [4, 5, 6]])
console.log("matrix: " + matrix.toString())
console.log("flatten by rows: " + matrix.flatten())
console.log("re-created by flatten: " + Matrix.flattenAsMatrix(matrix.flatten(), matrix.columnSize()).toString())
console.log("flatten by columns: " + matrix.flatten(FlatType.BY_COLUMNS))
console.log("re-created by flatten: " + Matrix.flattenAsMatrix(matrix.flatten(FlatType.BY_COLUMNS),
    matrix.rowSize(), FlatType.BY_COLUMNS).toString())