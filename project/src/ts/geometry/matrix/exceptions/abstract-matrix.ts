import {Matrix} from "../Matrix";
import {Column, NumMatrix} from "../type-aliases";
import {IllegalArgumentException} from "../../../types/types";

export class AbstractMatrix<T> implements Matrix<T> {

    add(scalar: number): NumMatrix;
    add(other: NumMatrix): NumMatrix;
    add(toAdd: number | NumMatrix): NumMatrix {
        if(toAdd instanceof AbstractMatrix) {
            if (!this.sameStructureOf(this)) {
                throw new IllegalArgumentException("illegal matrix to be added: this matrix has size " +
                    this.rowSize() + " x " + this.rowSize() + " while the argument has " + toAdd.rowSize() +
                    " x " + toAdd.columnSize())
            }
            let res: NumMatrix = this.getFactory().newNumMatrix(this.rowSize(), this.columnSize())
            for (let r = 0; r < this.rowSize(); r++) {
                for (let c = 0; c < this.columnSize(); c++) {
                    res.set((<number>this.get(r, c)) + toAdd.get(r, c), r, c)
                }
            }
            return res
        }
    }

    addColumn(column: Column<T>): Matrix<T> {
        return undefined;
    }

    addRow(row: Row<T>): Matrix<T> {
        return undefined;
    }

    calculateAndFill(builder: (rowIndex: number, columnIndex: number) => T) {
    }

    checkValidColumnIndex(columnIndex: number): boolean;
    checkValidColumnIndex(columnIndex: number, throwError: boolean): boolean;
    checkValidColumnIndex(columnIndex: number, throwError?: boolean): boolean {
        return false;
    }

    checkValidIndexes(rowIndex: number, columnIndex: number): boolean;
    checkValidIndexes(rowIndex: number, columnIndex: number, throwError: boolean): boolean;
    checkValidIndexes(rowIndex: number, columnIndex: number, throwError?: boolean): boolean {
        return false;
    }

    checkValidRowIndex(rowIndex: number): boolean;
    checkValidRowIndex(rowIndex: number, throwError: boolean): boolean;
    checkValidRowIndex(rowIndex: number, throwError?: boolean): boolean {
        return false;
    }

    clone(): Matrix<T>;
    clone(rowIndexesToRemove: Array<Number>, columnIndexesToRemove: Array<Number>): Matrix<T>;
    clone(rowIndexesToRemove?: Array<Number>, columnIndexesToRemove?: Array<Number>): Matrix<T> {
        return undefined;
    }

    columnSize(): number {
        return 0;
    }

    determinant(): number {
        return 0;
    }

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