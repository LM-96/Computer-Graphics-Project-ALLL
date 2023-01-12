"use strict";
/*
let matrix: Matrix<number> = Matrix.asMatrix([[1, 2, 3], [4, 5, 6]])
console.log("matrix: " + matrix.toString())
console.log("flatten by rows: " + matrix.flatten())
console.log("re-created by flatten: " + Matrix.flattenAsMatrix(matrix.flatten(), matrix.columnSize()).toString())
console.log("flatten by columns: " + matrix.flatten(FlatType.BY_COLUMNS))
console.log("re-created by flatten: " + Matrix.flattenAsMatrix(matrix.flatten(FlatType.BY_COLUMNS),
    matrix.rowSize(), FlatType.BY_COLUMNS).toString())*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// let matrix: Matrix<number> = Matrix.asMatrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]])
// console.log("is diagonal: " + matrix.isDiagonal())
//
// let matrix2: Matrix<number> = Matrix.asMatrix([[1, 1, 1], [0, 1, 1], [0, 0, 1]])
// console.log("is upper triangular: " + matrix2.isUpperTriangular())
// console.log("is triangular: " + matrix2.isTriangular())
//
// let matrix3: Matrix<number> = Matrix.asMatrix([[1, 0, 0], [1, 1, 0], [1, 1, 1]])
// console.log("is lower triangular: " + matrix3.isLowerTriangular())
// console.log("is triangular: " + matrix3.isTriangular())
// let matrix: NumMatrix = SimpleRowBasedMatrix.asMatrix([[4, 7], [2, 6]])
// console.log("determinant: " + matrix.determinant())
// console.log("cofactor matrix: " + matrix.getCofactorMatrix().toString())
// console.log("transposed cofactor matrix. " + matrix.getCofactorMatrix().transpose().toString())
// console.log("inverse: " + matrix.invert().toString())
const TestTs_1 = require("./test/TestTs");
let MyTestCase = class MyTestCase {
    constructor() {
        this.myString = "hello";
        this.myNumber = 10;
        this.myBool = false;
    }
    testString() { (0, TestTs_1.assertEquals)("hello", this.myString); }
    testNumber() { (0, TestTs_1.assertEquals)(5, this.myNumber); }
    testBool() { (0, TestTs_1.assertTrue)(this.myBool); (0, TestTs_1.assertFalse)(!this.myBool); }
};
__decorate([
    (0, TestTs_1.Test)()
], MyTestCase.prototype, "testString", null);
__decorate([
    (0, TestTs_1.Test)()
], MyTestCase.prototype, "testNumber", null);
__decorate([
    (0, TestTs_1.Test)()
], MyTestCase.prototype, "testBool", null);
MyTestCase = __decorate([
    TestTs_1.TestCase
], MyTestCase);
//# sourceMappingURL=test.js.map