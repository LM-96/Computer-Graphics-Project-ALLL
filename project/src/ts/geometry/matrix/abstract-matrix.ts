import {FlatType, Matrix, matrixData, MatrixFactory} from "./matrix";
import {Column, MatrixData, NumMatrix, Row} from "./matrix-types";
import {IllegalColumnIndexException} from "./exceptions/illegal-column-index-exception";
import {IllegalRowIndexException} from "./exceptions/illegal-row-index-exception";
import {IllegalArgumentException} from "../../types/exceptions/illegal-argument-exception";
import {Equatable} from "../../types/equatable";
import {Cloneable} from "../../types/cloneable";
import {Couple, coupleOf} from "../../types/pair";

export abstract class AbstractMatrix<T> implements Matrix<T>, Cloneable<Matrix<T>>, Equatable {

    abstract add(scalar: number): NumMatrix;
    abstract add(other: NumMatrix): NumMatrix;

    abstract addColumn(column: Column<T>): Matrix<T>;

    abstract addRow(row: Row<T>): Matrix<T>;

    abstract calculateAndFill(builder: (rowIndex: number, columnIndex: number) => T): Matrix<T>;

    checkValidColumnIndex(columnIndex: number): boolean
    checkValidColumnIndex(columnIndex: number, throwError: boolean): boolean
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

    abstract columnSize(): number;

    abstract determinant(): number;

    abstract divide(scalar: number): NumMatrix;
    abstract divide(other: NumMatrix): NumMatrix;

    elementSize(): number {
        return this.rowSize() * this.columnSize()
    }

    equals(other: any): boolean {
        if (other != null) {
            if (other instanceof AbstractMatrix) {
                if (this.sameStructureOf(other)) {
                    for (let row = 0; row < this.rowSize(); row++) {
                        for (let col = 0; col < this.columnSize(); col++) {
                            if (this.get(row, col) !== other.get(row, col)) {
                                return false
                            }
                        }
                    }
                    return true
                }
            }
        }

        return false
    }

    abstract fill(value: T): Matrix<T>;

    flatten(): Array<T>;
    flatten(flatType: FlatType): Array<T>
    flatten(flatType?: FlatType){
        if(flatType == undefined) {
            flatType = FlatType.BY_ROWS
        }
        let res: Array<T> = Array(this.elementSize())
        switch (flatType) {
            case FlatType.BY_ROWS: {
                for (let r = 0; r < this.rowSize(); r++) {
                    for (let c = 0; c < this.columnSize(); c++) {
                        res[r * this.columnSize() + c] = this.get(r, c)
                    }
                }
                break;
            }
            case FlatType.BY_COLUMNS: {
                for (let r = 0; r < this.rowSize(); r++) {
                    for (let c = 0; c < this.columnSize(); c++) {
                        res[c * this.rowSize() + r] = this.get(r, c)
                    }
                }
                break;
            }
        }
        return res

    }


    forEachColumn(block: (column: Column<T>, columnIndex: number) => void) {
        for (let c = 0; c < this.columnSize(); c++) {
            block(this.getColumn(c), c)
        }
    }

    forEachElement(block: (element: T, rowIndex: number, columnIndex: number) => void) {
        for (let r = 0; r < this.rowSize(); r++) {
            for (let c = 0; c < this.columnSize(); c++) {
                block(this.get(r, c), r, c)
            }
        }
    }

    forEachRow(block: (row: Row<T>, rowIndex: number) => void) {
        for (let r = 0; r < this.rowSize(); r++) {
            block(this.getRow(r), r)
        }
    }

    abstract frozen(): Matrix<T>

    abstract get(rowIndex: number, columnIndex: number): T;

    abstract getCharacteristicPolynomial(): (lambda: number) => number;

    getCofactor(rowIndex: number, columnIndex: number): number {
        this.checkValidIndexes(rowIndex, columnIndex, true)
        return Math.pow(-1, rowIndex + columnIndex) * (this.getMinor(rowIndex, columnIndex).determinant())
    }

    getCofactorMatrix(): NumMatrix {
        let res: NumMatrix = this.getFactory().createNumberMatrix(this.rowSize(), this.columnSize())
        for(let r = 0; r < this.rowSize(); r++) {
            for(let c = 0; c < this.columnSize(); c++) {
                res.set(this.getCofactor(r, c), r, c)
            }
        }
        return res
    }

    abstract getColumn(columnIndex: number): Column<T>;

    abstract getFactory(): MatrixFactory;

    getMinor(rowIndex: number, columnIndex: number): Matrix<T> {
        this.checkValidIndexes(rowIndex, columnIndex, true)

        let data: MatrixData<T> = matrixData<T>(this.rowSize() - 1, this.columnSize() - 1)
        let rR: number = 0
        let cR: number = 0
        for (let r = 0; r < this.rowSize(); r++) {
            if (r != rowIndex) {
                cR = 0
                for (let c = 0; c < this.columnSize(); c++) {
                    if (c != columnIndex) {
                        data[rR][cR] = this.get(r, c)
                        cR++
                    }
                }
                rR++
            }
        }
        return this.getFactory().createMatrix(data)
    }

    abstract getRow(rowIndex: number): Row<T>;

    abstract invert(): NumMatrix;

    isDiagonal(): boolean {
        let element: T
        for (let r = 0; r < this.rowSize(); r++) {
            for (let c = 0; c < this.columnSize(); c++) {
                if (r != c) {
                    element = this.get(r, c)
                    if (element != null && element != 0)
                        return false
                }
            }
        }

        return true
    }

    abstract isFrozen(): boolean;

    isInvertible(): boolean {
        return this.isSquared() && this.determinant() != 0
    }

    isLowerTriangular(): boolean {
        let element: T
        for (let r = 0; r < this.rowSize(); r++) {
            for (let c = 0; c < this.columnSize(); c++) {
                if (r < c) {
                    element = this.get(r, c)
                    if (element != null && element != 0)
                        return false
                }
            }
        }

        return true
    }

    isSquared(): boolean {
        return this.rowSize() === this.columnSize()
    }

    isTriangular(): boolean {
        return this.isUpperTriangular() || this.isLowerTriangular()
    }

    abstract isUnfrozen(): boolean

    isUpperTriangular(): boolean {
        let element: T
        for (let r = 0; r < this.rowSize(); r++) {
            for (let c = 0; c < this.columnSize(); c++) {
                if (r > c) {
                    element = this.get(r, c)
                    if (element != null && element != 0)
                        return false
                }
            }
        }

        return true
    }

    mapColumnByColumn<R>(mapper: (column: Column<T>, columnIndex: number) => Column<R>): Matrix<R> {
        let res: Matrix<R> = this.getFactory().createMatrix(this.rowSize(), this.columnSize())
        for(let c = 0; c < res.columnSize(); c++) {
            res.setColumn(mapper(this.getColumn(c), c), c)
        }

        return res
    }

    mapElementByElement<R>(mapper: (element: T, rowIndex: number, columnIndex: number) => R): Matrix<R> {
        let res: Matrix<R> = this.getFactory().createMatrix(this.rowSize(), this.columnSize())
        for(let r = 0; r < res.rowSize(); r++) {
            for(let c = 0; c < res.columnSize(); c++) {
                res.set(mapper(this.get(r, c), r, c), r, c)
            }
        }

        return res
    }

    mapRowByRow<R>(mapper: (row: Row<T>, rowIndex: number) => Row<R>): Matrix<R> {
        let res: Matrix<R> = this.getFactory().createMatrix(this.rowSize(), this.columnSize())
        for(let r = 0; r < res.rowSize(); r++) {
            res.setRow(mapper(this.getRow(r), r), r)
        }

        return res
    }

    abstract multiply(scalar: number): NumMatrix;
    abstract multiply(other: NumMatrix): NumMatrix;

    abstract removeColumn(): Matrix<T>;

    abstract removeRow(): Matrix<T>;

    abstract rowSize(): number;

    sameStructureOf(other: Matrix<T>): boolean {
        return this.rowSize() == other.rowSize() && this.columnSize() == other.columnSize()
    }

    abstract set(value: T, rowIndex: number, columnIndex: number): Matrix<T>;

    abstract setColumn(column: Column<T>, columnIndex: number): Matrix<T>;

    abstract setRow(row: Row<T>, rowIndex: number): Matrix<T>;

    size(): Couple<number> {
        return coupleOf<number>(this.rowSize(), this.columnSize())
    }

    subMatrix(topRow: number, leftColumn: number): Matrix<T>;
    subMatrix(topRow: number, leftColumn: number, bottomRow: number, rightColumn: number): Matrix<T>
    subMatrix(topRow: number, leftColumn: number, bottomRow?: number, rightColumn?: number): Matrix<T> {
        if(bottomRow == undefined) { bottomRow = this.rowSize() - 1 }
        if(rightColumn == undefined) { rightColumn = this.columnSize() - 1 }
        // Check all >= 0
        if (topRow < 0) throw new IllegalArgumentException("top row [" + topRow + "] MUST be greater than 0")
        if (bottomRow < 0) throw new IllegalArgumentException("bottom row [" + bottomRow + "] MUST be greater than 0")
        if (rightColumn < 0) throw new IllegalArgumentException("right column [" + rightColumn + "] MUST be greater than 0")
        if (leftColumn < 0) throw new IllegalArgumentException("left column [" + leftColumn + "] MUST be greater than 0")

        // Check coherence
        if (bottomRow < topRow) throw new IllegalArgumentException(
            "bottom row [" + bottomRow + "] must be greater than top row [" + topRow + "]")
        if (rightColumn < leftColumn) throw new IllegalArgumentException(
            "right column [" + rightColumn + "] must be greater than left column [" + leftColumn + "]")

        //Check inside matrix
        if (topRow >= this.rowSize()) throw new IllegalArgumentException(
            "top row [" + topRow + "] MUST NOT go outside the matrix")
        if (bottomRow >= this.rowSize()) throw new IllegalArgumentException(
            "bottom row [" + bottomRow + "] MUST NOT go outside the matrix")
        if (leftColumn >= this.columnSize()) throw new IllegalArgumentException(
            "left column [" + leftColumn + "] MUST NOT go outside the matrix")
        if (rightColumn >= this.columnSize()) throw new IllegalArgumentException(
            "left column [" + rightColumn + "] MUST NOT go outside the matrix")

        let res: Matrix<T> = this.getFactory().createMatrix(bottomRow - topRow + 1, rightColumn - leftColumn + 1)
        for (let r = topRow; r <= bottomRow; r++) {
            for (let c = leftColumn; c <= rightColumn; c++) {
                this.set(this.get(r, c), r - topRow, c - leftColumn)
            }
        }
        return res

    }

    abstract subtract(scalar: number): NumMatrix;
    abstract subtract(other: NumMatrix): NumMatrix;

    toArrayOfColumns(): Array<Column<T>> {
        let res: Array<Column<T>> = new Array<Column<T>>()
        for (let c = 0; c < this.columnSize(); c++) {
            res.push(this.getColumn(c))
        }

        return res
    }

    toArrayOfRows(): Array<Row<T>> {
        let res: Array<Row<T>> = new Array<Row<T>>()
        for (let r = 0; r < this.rowSize(); r++) {
            res.push(this.getRow(r))
        }

        return res
    }

    trace(): number {
        if (!this.isSquared()) {
            throw new IllegalArgumentException("this matrix is not squared [size: " + this.size().toArray() + "]")
        }

        let res: number = 0
        for (let i = 0; i < this.rowSize(); i++)
            res += (<number>this.get(i, i))

        return res
    }

    abstract transpose(): Matrix<T>;

    abstract unfrozen(): Matrix<T>

    toString(): string {
        return this.toArrayOfRows().toString()
    }

}