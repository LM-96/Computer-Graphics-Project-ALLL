"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MatrixTestCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
const matrix_1 = require("./geometry/matrix/matrix");
const mutable_row_based_matrix_1 = require("./geometry/matrix/mutable-row-based-matrix");
const frozen_row_based_matrix_1 = require("./geometry/matrix/frozen-row-based-matrix");
const arrays_1 = require("./types/arrays");
const TestTs_1 = require("./test/TestTs");
let MatrixTestCase = MatrixTestCase_1 = class MatrixTestCase {
    constructor() {
        this.matrix1_2x2 = new mutable_row_based_matrix_1.MutableRowBasedMatrix(arrays_1.Arrays.clone2(MatrixTestCase_1.DATA2x2));
        this.matrix2_2x2 = new frozen_row_based_matrix_1.FrozenRowBasedMatrix(arrays_1.Arrays.clone2(MatrixTestCase_1.DATA2x2));
        this.matrix1_3x3 = new mutable_row_based_matrix_1.MutableRowBasedMatrix(arrays_1.Arrays.clone2(MatrixTestCase_1.DATA3x3));
        this.matrix2_3x3 = new frozen_row_based_matrix_1.FrozenRowBasedMatrix(arrays_1.Arrays.clone2(MatrixTestCase_1.DATA3x3));
        this.matrix1_4x4 = new mutable_row_based_matrix_1.MutableRowBasedMatrix(arrays_1.Arrays.clone2(MatrixTestCase_1.DATA4x4));
        this.matrix2_4x4 = new frozen_row_based_matrix_1.FrozenRowBasedMatrix(arrays_1.Arrays.clone2(MatrixTestCase_1.DATA4x4));
        this.matrix1_5x5 = new mutable_row_based_matrix_1.MutableRowBasedMatrix(arrays_1.Arrays.clone2(MatrixTestCase_1.DATA5x5));
        this.matrix2_5x5 = new frozen_row_based_matrix_1.FrozenRowBasedMatrix(arrays_1.Arrays.clone2(MatrixTestCase_1.DATA5x5));
    }
    minorTest() {
        let rowIndex = 1;
        let columnIndex = 1;
        let rightMatrix = (0, matrix_1.matrix)([[0, 0, -2, 1], [1, 1, 1, 1], [2, 1, 0, 1], [3, 1, 1, 2]]);
        let minor1_5x5 = this.matrix1_5x5.getMinor(1, 1);
        let minor2_5x5 = this.matrix2_5x5.getMinor(1, 1);
        (0, TestTs_1.assertEquals)(rightMatrix, minor1_5x5);
        (0, TestTs_1.assertEquals)(rightMatrix, minor2_5x5);
    }
    determinant2x2Test() {
        let rigthDeterminant = -2;
        (0, TestTs_1.assertEquals)(rigthDeterminant, this.matrix1_2x2.determinant());
        (0, TestTs_1.assertEquals)(rigthDeterminant, this.matrix2_2x2.determinant());
    }
    determinant3x3Test() {
        let rigthDeterminant = 25;
        (0, TestTs_1.assertEquals)(rigthDeterminant, this.matrix1_3x3.determinant());
        (0, TestTs_1.assertEquals)(rigthDeterminant, this.matrix2_3x3.determinant());
    }
    determinant4x4Test() {
        let rigthDeterminant = -4;
        (0, TestTs_1.assertEquals)(rigthDeterminant, this.matrix1_4x4.determinant());
        (0, TestTs_1.assertEquals)(rigthDeterminant, this.matrix2_4x4.determinant());
    }
    determinant5x5Test() {
        let rigthDeterminant = 4;
        (0, TestTs_1.assertEquals)(rigthDeterminant, this.matrix1_5x5.determinant());
        (0, TestTs_1.assertEquals)(rigthDeterminant, this.matrix2_5x5.determinant());
    }
};
MatrixTestCase.DATA2x2 = [
    [1, 2],
    [3, 4]
];
MatrixTestCase.DATA3x3 = [
    [1, -2, 3],
    [2, 0, 3],
    [1, 5, 4]
];
MatrixTestCase.DATA4x4 = [
    [1, 3, 1, 4],
    [3, 9, 5, 15],
    [0, 2, 1, 1],
    [0, 4, 2, 3]
];
MatrixTestCase.DATA5x5 = [[0, 1, 0, -2, 1],
    [1, 0, 3, 1, 1],
    [1, -1, 1, 1, 1],
    [2, 2, 1, 0, 1],
    [3, 1, 1, 1, 2]
];
__decorate([
    (0, TestTs_1.Test)()
], MatrixTestCase.prototype, "minorTest", null);
__decorate([
    (0, TestTs_1.Test)()
], MatrixTestCase.prototype, "determinant2x2Test", null);
__decorate([
    (0, TestTs_1.Test)()
], MatrixTestCase.prototype, "determinant3x3Test", null);
__decorate([
    (0, TestTs_1.Test)()
], MatrixTestCase.prototype, "determinant4x4Test", null);
__decorate([
    (0, TestTs_1.Test)()
], MatrixTestCase.prototype, "determinant5x5Test", null);
MatrixTestCase = MatrixTestCase_1 = __decorate([
    TestTs_1.TestCase
], MatrixTestCase);
//# sourceMappingURL=main-test.js.map