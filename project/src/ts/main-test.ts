import {Matrix, matrix} from "./geometry/matrix/matrix";
import {MutableRowBasedMatrix} from "./geometry/matrix/mutable-row-based-matrix";
import {FrozenRowBasedMatrix} from "./geometry/matrix/frozen-row-based-matrix";
import {MatrixData, NumMatrix} from "./geometry/matrix/matrix-types";
import {Arrays} from "./types/arrays";
import {assertEquals, assertTrue, Test, TestCase} from "./test/TestTs";
import SignalFlows, {SingleSignalFlow} from "./signals/flow";
import {handler, SignalHandler} from "./signals/options";
import {getTypeName} from "./types/types";
import {SyncFiredSignal, Signal, SignalName} from "./signals/signal";
import {SubscriptionReceipt} from "./signals/subscriptions";
import {resultOf} from "./types/result";

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
        let rightDeterminant: number = -2
        assertEquals(rightDeterminant, this.matrix1_2x2.determinant())
        assertEquals(rightDeterminant, this.matrix2_2x2.determinant())
    }

    @Test()
    determinant3x3Test() {
        let rightDeterminant: number = 25
        assertEquals(rightDeterminant, this.matrix1_3x3.determinant())
        assertEquals(rightDeterminant, this.matrix2_3x3.determinant())
    }

    @Test()
    determinant4x4Test() {
        let rightDeterminant: number = -4
        assertEquals(rightDeterminant, this.matrix1_4x4.determinant())
        assertEquals(rightDeterminant, this.matrix2_4x4.determinant())
    }

    @Test()
    determinant5x5Test() {
        let rightDeterminant: number = 4
        assertEquals(rightDeterminant, this.matrix1_5x5.determinant())
        assertEquals(rightDeterminant, this.matrix2_5x5.determinant())
    }

    @Test()
    signalSystemTest() {
        let signalNameString: string = 'test-signal'
        let flow: SingleSignalFlow<MatrixTestCase, string, string> =
            SignalFlows.newSingleFlow<MatrixTestCase, string, string>(signalNameString)
        let eventHandled: boolean = false
        let data: string = 'data'
        let result: string = 'result'
        let receivedData: string = undefined

        function handlerFun(signal: Signal<MatrixTestCase, string, string>): string {
            eventHandled = true
            receivedData = signal.data
            return result
        }

        let receipt: SubscriptionReceipt<MatrixTestCase, string, string> = flow.subscribe(handler(handlerFun))
        assertEquals(flow.signalName.name, receipt.signalName.name)

        let fired: SyncFiredSignal<MatrixTestCase, string, string> = flow.fire(this, data)
        assertEquals(data, receivedData)
        assertEquals("result", fired.getResultOf(receipt.subscriptionId).getValue())
        assertTrue(eventHandled)
    }

}