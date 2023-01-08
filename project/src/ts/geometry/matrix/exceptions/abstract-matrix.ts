import {Matrix} from "../Matrix";
import {Column, NumMatrix, Row} from "../type-aliases";
import {IllegalArgumentException} from "../../../types/illegal-argument-exception";
import {IllegalColumnIndexException} from "./illegal-column-index-exception";
import {IllegalRowIndexException} from "./illegal-row-index-exception";

export abstract class AbstractMatrix<T> implements Matrix<T> {

    abstract add(scalar: number): NumMatrix;
    abstract add(other: NumMatrix): NumMatrix;

    abstract addColumn(column: Column<T>): Matrix<T>
    abstract addRow(row: Row<T>): Matrix<T>

    calculateAndFill(builder: (rowIndex: number, columnIndex: number) => T) {
        for (let r = 0; r < this.rowSize(); r++) {
            for (let c = 0; r < this.columnSize(); c++) {
                this.set(builder(r, c), r, c)
            }
        }
    }

    checkValidColumnIndex(columnIndex: number): boolean;
    checkValidColumnIndex(columnIndex: number, throwError: boolean): boolean;
    checkValidColumnIndex(columnIndex: number, throwError?: boolean): boolean {
        if(throwError == undefined) {
            throwError = false
        }
        if (columnIndex < 0 || columnIndex >= this.columnSize()) {
            if (throwError) {
                throw new IllegalColumnIndexException(columnIndex, this.columnSize() - 1)
            }
            return true
        }
    }

    checkValidIndexes(rowIndex: number, columnIndex: number): boolean;
    checkValidIndexes(rowIndex: number, columnIndex: number, throwError: boolean): boolean;
    checkValidIndexes(rowIndex: number, columnIndex: number, throwError?: boolean): boolean {
        if(throwError == undefined) {
            throwError = false
        }
        if (this.checkValidRowIndex(rowIndex, throwError))
            return this.checkValidColumnIndex(columnIndex, throwError)
        return false
    }

    checkValidRowIndex(rowIndex: number): boolean;
    checkValidRowIndex(rowIndex: number, throwError: boolean): boolean;
    checkValidRowIndex(rowIndex: number, throwError?: boolean): boolean {
        if(throwError == undefined) {
            throwError = false
        }
        if (rowIndex < 0 || rowIndex >= this.rowSize()) {
            if (throwError) {
                throw new IllegalRowIndexException(rowIndex, this.rowSize() - 1)
            }
            return true
        }
    }

    clone(): Matrix<T>;
    clone(rowIndexesToRemove: Array<Number>, columnIndexesToRemove: Array<Number>): Matrix<T>;
    clone(rowIndexesToRemove?: Array<Number>, columnIndexesToRemove?: Array<Number>): Matrix<T> {
        if(rowIndexesToRemove == undefined) { rowIndexesToRemove = [] }
        if(columnIndexesToRemove == undefined) { columnIndexesToRemove = [] }

        let res: Matrix<T>

        if(rowIndexesToRemove.length == 0 && columnIndexesToRemove.length == 0) {
            /* Normal Clone *************************************************** */
            res = this.getFactory().createMatrix(this.rowSize(), this.columnSize())
            for(let r = 0; r < this.rowSize(); r++) {
                for(let c = 0; c < this.columnSize(); c++) {
                    res.set(this.get(r, c), r, c)
                }
            }
        } else {
            /* Clone with cuts ************************************************ */
            res = this.getFactory().createMatrix(
                this.rowSize() - rowIndexesToRemove.length,
                this.columnSize() - columnIndexesToRemove.length)
            let rR: number = 0
            let cR: number = 0
            for(let r = 0; r < this.rowSize(); r++) {
                if(!rowIndexesToRemove.includes(r)) {
                    cR = 0
                    for(let c = 0; r < this.columnSize(); c++) {
                        if(!columnIndexesToRemove.includes(c)) {
                            res.set(this.get(r, c), rR, cR)
                            cR++
                        }
                    }
                    rR++
                }
            }
        }

        return res
    }

    abstract columnSize(): number

    abstract determinant(): number

    divide(scalar: number): NumMatrix;
    divide(other: NumMatrix): NumMatrix;
    divide(scalar: number | NumMatrix): NumMatrix {
        return undefined;
    }

    elementSize(): number {
        return 0;
    }

    equals(other: any): boolean {
        return false;
    }

    fill(value: T) {
    }

    flatten(): Array<T>;
    flatten(flatType: FlatType);
    flatten(flatType?: FlatType): any {
    }

    forEachColumn(block: (column: Column<T>, columnIndex: number) => void) {
    }

    forEachElement(block: (element: T, rowIndex: number, columnIndex: number) => void) {
    }

    forEachRow(block: (row: Row<T>, rowIndex: number) => void) {
    }

    get(rowIndex: number, columnIndex: number): T {
        return undefined;
    }

    getCofactor(rowIndex: number, columnIndex: number): number {
        return 0;
    }

    getCofactorMatrix(): NumMatrix {
        return undefined;
    }

    getColumn(columnIndex: number): Column<T> {
        return undefined;
    }

    getFactory(): MatrixFactory {
        return undefined;
    }

    getMinor(rowIndex: number, columnIndex: number): Matrix<T> {
        return undefined;
    }

    getRow(rowIndex: number): Row<T> {
        return undefined;
    }

    invert(): NumMatrix {
        return undefined;
    }

    isDiagonal(): boolean {
        return false;
    }

    isInvertible(): boolean {
        return false;
    }

    isLowerTriangular(): boolean {
        return false;
    }

    isSquared(): boolean {
        return false;
    }

    isTriangular(): boolean {
        return false;
    }

    isUpperTriangular(): boolean {
        return false;
    }

    mapColumnByColumn<R>(mapper: (column: Column<T>, columnIndex: number) => Column<R>): Matrix<R> {
        return undefined;
    }

    mapElementByElement<R>(mapper: (element: T, rowIndex: number, columnIndex: number) => R): Matrix<R> {
        return undefined;
    }

    mapRowByRow<R>(mapper: (row: Row<T>, rowIndex: number) => Row<R>): Matrix<R> {
        return undefined;
    }

    multiply(scalar: number): NumMatrix;
    multiply(other: NumMatrix): NumMatrix;
    multiply(scalar: number | NumMatrix): NumMatrix {
        return undefined;
    }

    removeColumn(): Matrix<T> {
        return undefined;
    }

    removeRow(): Matrix<T> {
        return undefined;
    }

    rowSize(): number {
        return 0;
    }

    sameStructureOf(other: Matrix<T>): boolean {
        return false;
    }

    set(value: T, rowIndex: number, columnIndex: number) {
    }

    setColumn(column: Column<T>, columnIndex: number) {
    }

    setRow(row: Row<T>, rowIndex: number): Matrix<T> {
        return undefined;
    }

    size(): Couple<number> {
        return undefined;
    }

    subMatrix(topRow: number, leftColumn: number): Matrix<T>;
    subMatrix(topRow: number, leftColumn: number, bottomRow: number, rightColumn: number): Matrix<T>;
    subMatrix(topRow: number, leftColumn: number, bottomRow?: number, rightColumn?: number): Matrix<T> {
        return undefined;
    }

    subtract(scalar: number): NumMatrix;
    subtract(other: NumMatrix): NumMatrix;
    subtract(scalar: number | NumMatrix): NumMatrix {
        return undefined;
    }

    toArrayOfColumns(): Array<Column<T>> {
        return undefined;
    }

    toArrayOfRows(): Array<Row<T>> {
        return undefined;
    }

    trace(): number {
        return 0;
    }

    transpose(): Matrix<T> {
        return undefined;
    }

}