import {matrix, MatrixFactory} from "./geometry/matrix/matrix-factory";
import {Matrix} from "./geometry/matrix/matrix";
import {MutableRowBasedMatrix} from "./geometry/matrix/mutable-row-based-matrix";
import {FrozenRowBasedMatrix} from "./geometry/matrix/frozen-row-based-matrix";
import {MatrixData, NumMatrix} from "./geometry/matrix/matrix-types";
import {Arrays} from "./types/arrays";
import {assertEquals, Test, TestCase} from "./test/TestTs";
import {MatrixAlgebra} from "./geometry/matrix/matrix-algebra";

@TestCase
class MatrixTestCase {

    static readonly DATA2x2: MatrixData<number> =
        [
            [1, 2],
            [3, 4]
        ]

    static readonly DATA3x3: MatrixData<number> =
        [
            [1, -2, 3],
            [2, 0, 3],
            [1, 5, 4]
        ]

    static readonly DATA4x4: MatrixData<number> =
        [
            [1, 3, 1, 4],
            [3, 9, 5, 15],
            [0, 2, 1, 1],
            [0, 4, 2, 3]
        ]

    static readonly DATA5x5: MatrixData<number> =
        [   [0, 1, 0, -2, 1],
            [1, 0, 3, 1, 1],
            [1, -1, 1, 1, 1],
            [2, 2, 1, 0, 1],
            [3, 1, 1, 1, 2]
        ]

    matrix1_2x2: Matrix<number> = new MutableRowBasedMatrix(Arrays.clone2(MatrixTestCase.DATA2x2))
    matrix2_2x2: Matrix<number> = new FrozenRowBasedMatrix(Arrays.clone2(MatrixTestCase.DATA2x2))
    matrix1_3x3: Matrix<number> = new MutableRowBasedMatrix(Arrays.clone2(MatrixTestCase.DATA3x3))
    matrix2_3x3: Matrix<number> = new FrozenRowBasedMatrix(Arrays.clone2(MatrixTestCase.DATA3x3))
    matrix1_4x4: Matrix<number> = new MutableRowBasedMatrix(Arrays.clone2(MatrixTestCase.DATA4x4))
    matrix2_4x4: Matrix<number> = new FrozenRowBasedMatrix(Arrays.clone2(MatrixTestCase.DATA4x4))
    matrix1_5x5: Matrix<number> = new MutableRowBasedMatrix(Arrays.clone2(MatrixTestCase.DATA5x5))
    matrix2_5x5: Matrix<number> = new FrozenRowBasedMatrix(Arrays.clone2(MatrixTestCase.DATA5x5))

    @Test()
    minorTest() {
        let rowIndex: number = 1
        let columnIndex: number = 1
        let rightMatrix: NumMatrix = matrix(
            [[0, 0, -2, 1], [1, 1, 1, 1], [2, 1, 0, 1], [3, 1, 1, 2]])
        let minor1_5x5 = this.matrix1_5x5.getMinor(1, 1)
        let minor2_5x5 = this.matrix2_5x5.getMinor(1, 1)
        assertEquals(rightMatrix, minor1_5x5)
        assertEquals(rightMatrix, minor2_5x5)
    }

    @Test()
    determinant2x2Test() {
        let rigthDeterminant: number = -2
        assertEquals(rigthDeterminant, this.matrix1_2x2.determinant())
        assertEquals(rigthDeterminant, this.matrix2_2x2.determinant())
    }

    @Test()
    determinant3x3Test() {
        let rigthDeterminant: number = 25
        assertEquals(rigthDeterminant, this.matrix1_3x3.determinant())
        assertEquals(rigthDeterminant, this.matrix2_3x3.determinant())
    }

    @Test()
    determinant4x4Test() {
        let rigthDeterminant: number = -4
        assertEquals(rigthDeterminant, this.matrix1_4x4.determinant())
        assertEquals(rigthDeterminant, this.matrix2_4x4.determinant())
    }

    @Test()
    determinant5x5Test() {
        let rigthDeterminant: number = 4
        assertEquals(rigthDeterminant, this.matrix1_5x5.determinant())
        assertEquals(rigthDeterminant, this.matrix2_5x5.determinant())
    }

}