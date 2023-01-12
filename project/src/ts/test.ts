/*
let matrix: Matrix<number> = Matrix.asMatrix([[1, 2, 3], [4, 5, 6]])
console.log("matrix: " + matrix.toString())
console.log("flatten by rows: " + matrix.flatten())
console.log("re-created by flatten: " + Matrix.flattenAsMatrix(matrix.flatten(), matrix.columnSize()).toString())
console.log("flatten by columns: " + matrix.flatten(FlatType.BY_COLUMNS))
console.log("re-created by flatten: " + Matrix.flattenAsMatrix(matrix.flatten(FlatType.BY_COLUMNS),
    matrix.rowSize(), FlatType.BY_COLUMNS).toString())*/

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

import {assertEquals, assertFalse, assertTrue, Test, TestCase} from "./test/TestTs";

@TestCase
class MyTestCase {
    myString: string = "hello"
    myNumber: number = 10
    myBool: boolean = false

    @Test() testString() { assertEquals("hello", this.myString) }

    @Test() testNumber() { assertEquals(5, this.myNumber) }

    @Test() testBool() { assertTrue(this.myBool); assertFalse(!this.myBool) }
}