"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const matrix_1 = require("./matrix");
let matrix = matrix_1.Matrix.asMatrix([[1, 2, 3], [4, 5, 6]]);
console.log("matrix: " + matrix.toString());
console.log("flatten by rows: " + matrix.flatten());
console.log("re-created by flatten: " + matrix_1.Matrix.flattenAsMatrix(matrix.flatten(), matrix.columnSize()).toString());
console.log("flatten by columns: " + matrix.flatten(matrix_1.FlatType.BY_COLUMNS));
console.log("re-created by flatten: " + matrix_1.Matrix.flattenAsMatrix(matrix.flatten(matrix_1.FlatType.BY_COLUMNS), matrix.rowSize(), matrix_1.FlatType.BY_COLUMNS).toString());
//# sourceMappingURL=test.js.map