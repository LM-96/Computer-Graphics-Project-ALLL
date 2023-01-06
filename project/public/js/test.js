"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const matrix_1 = require("./matrix");
let m1 = new matrix_1.Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
let m2 = new matrix_1.Matrix([[5, 6], [7, 8]]);
console.log(m1.trace());
console.log(m1.transpose().toString());
//# sourceMappingURL=test.js.map