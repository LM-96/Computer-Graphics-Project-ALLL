"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const matrix_1 = require("./matrix");
let m1 = new matrix_1.Matrix([[10, 2, 3, 4], [5, 21, 7, 9], [9, 10, 11, 12], [13, 43, 15, 16]]);
let m2 = new matrix_1.Matrix([[5, 6], [7, 8]]);
console.log(m1.trace());
console.log(m1.determinant().toString());
//# sourceMappingURL=test.js.map