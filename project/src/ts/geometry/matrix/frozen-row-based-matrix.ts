import {AbstractMatrix} from "./abstract-matrix";
import {Matrix, checkValidMatrixData, matrixData, MatrixFactory} from "./matrix";
import {NumMatrix, Column, Row, MatrixData} from "./matrix-types";
import {MatrixAlgebra} from "./matrix-algebra";
import {InvalidRowException} from "./exceptions/invalid-row-exception";
import {Arrays} from "../../types/arrays";
import {MutableRowBasedMatrix} from "./mutable-row-based-matrix";

/**
 * A **frozen** implementation of matrix based on a bi-dimensional array.
 * Every instance of this class **can NOT be modified** and each method that has to modify the
 * internal data *returns a copy* of this matrix with the required modification.
 * This means that the original matrix will never been modified
 */
export class FrozenRowBasedMatrix<T> extends AbstractMatrix<T> implements Matrix<T>{

    static factory: MatrixFactory = new class extends MatrixFactory {

        createMatrix<T>(matrixData: MatrixData<T>|Array<Row<T>>|Array<Array<T>>): Matrix<T>
        createMatrix<T>(rows: number, columns: number): Matrix<T>;
        createMatrix<T>(rows: number, columns: number, fill: T): Matrix<T>;
        createMatrix<T>(rows: MatrixData<T>|Array<Row<T>>|Array<Array<T>>|number,
                        columns?: number, fill?: T): Matrix<T>  {
            if(typeof rows == "number") {
                return new FrozenRowBasedMatrix(matrixData(rows, columns, fill))
            } else {
                return new FrozenRowBasedMatrix(rows)
            }
        }
    }

    readonly #data: MatrixData<T>
    readonly #totRows: number
    readonly #totColumns: number

    constructor(data: MatrixData<T>) {
        super();

        if (data.length > 0) {
            checkValidMatrixData(data, true)
            this.#data = data
            this.#totRows = data.length
            this.#totColumns = data[0].length
        }
    }

    add(scalar: number): NumMatrix;
    add(other: NumMatrix): NumMatrix;
    add(other: number|NumMatrix): NumMatrix{
        if(typeof other == "number") {
            return MatrixAlgebra.add(this as NumMatrix, other)
        }
        return MatrixAlgebra.add(this as NumMatrix, other)
    }
    addColumn(column: Column<T>): Matrix<T> {
        return new FrozenRowBasedMatrix(
            Arrays.clone2<T>(this.#data, this.#totRows, this.#totColumns + 1))
    }

    addRow(row: Row<T>): Matrix<T> {
        if(row.length != this.#totColumns) {
            throw new InvalidRowException(row, "the row to add has size " + row.length + " but " +
                "the matrix has " + this.#totColumns + " columns")
        }

        let data = Arrays.clone2(this.#data, this.#totRows + 1, this.#totColumns)
        for(let c = 0; c < this.#totColumns; c++) {
            data[this.#totRows][c] = row[c]
        }

        return new FrozenRowBasedMatrix(data)
    }

    calculateAndFill(builder: (rowIndex: number, columnIndex: number) => T): Matrix<T> {
        let data: MatrixData<T> = new Array<Row<T>>(this.#totRows)
        for(let r = 0; r < this.#totRows; r++) {
            data[r] = new Array<T>(this.#totColumns)
            for(let c = 0; c < this.#totColumns; c++) {
                data[r][c] = builder(r, c)
            }
        }

        return new FrozenRowBasedMatrix(data)
    }

    columnSize(): number {
        return this.#totColumns
    }

    determinant(): number {
        return MatrixAlgebra.determinant(this as NumMatrix)
    }

    divide(scalar: number): NumMatrix;
    divide(other: NumMatrix): NumMatrix;
    divide(other: number|NumMatrix): NumMatrix {
        if(typeof other == "number")
            return MatrixAlgebra.divide(this as NumMatrix, other)

        return MatrixAlgebra.divide(this as NumMatrix, other)
    }

    fill(value: T): Matrix<T> {
        let data: MatrixData<T> = new Array<Row<T>>(this.#totRows)
        for(let r = 0; r < this.#totRows; r++) {
            data[r] = new Array<T>(this.#totColumns)
            for(let c = 0; c < this.#totColumns; c++) {
                data[r][c] = value
            }
        }

        return new FrozenRowBasedMatrix(data)
    }

    frozen(): Matrix<T> {
        return this
    }

    get(rowIndex: number, columnIndex: number): T {
        return this.#data[rowIndex][columnIndex]
    }

    getCharacteristicPolynomial(): (lambda: number) => number {
        return MatrixAlgebra.characteristicPolynomial(this as NumMatrix)
    }

    getColumn(columnIndex: number): Column<T> {
        let res: Column<T> = new Array<T>(this.#totRows)
        for(let r = 0; r < this.#totRows; r++) {
            res[r] = this.#data[r][columnIndex]
        }
        return res
    }

    getFactory(): MatrixFactory {
        return FrozenRowBasedMatrix.factory
    }

    getRow(rowIndex: number): Row<T> {
        let res: Row<T> = new Array<T>(this.#totColumns)
        for(let c = 0; c < this.#totColumns; c++) {
            res[c] = this.#data[rowIndex][c]
        }
        return res
    }

    invert(): NumMatrix {
        return MatrixAlgebra.invert(this as NumMatrix)
    }

    isFrozen(): boolean {
        return true
    }

    isUnfrozen(): boolean {
        return false
    }

    multiply(scalar: number): NumMatrix;
    multiply(other: NumMatrix): NumMatrix;
    multiply(other: number|NumMatrix): NumMatrix {
        if(typeof other == "number") {
            return MatrixAlgebra.multiply(this as NumMatrix, other)
        }
        return MatrixAlgebra.multiply(this as NumMatrix, other)
    }

    removeColumn(): Matrix<T> {
        return new FrozenRowBasedMatrix(
            Arrays.clone2(this.#data, this.#totRows, this.#totColumns - 1)
        )
    }

    removeRow(): Matrix<T> {
        return new FrozenRowBasedMatrix(
            Arrays.clone2(this.#data, this.#totRows - 1, this.#totColumns)
        )
    }

    rowSize(): number {
        return this.#totRows
    }

    set(value: T, rowIndex: number, columnIndex: number): Matrix<T> {
        this.checkValidIndexes(rowIndex, columnIndex)

        let data: MatrixData<T> = Arrays.clone2(this.#data)
        data[rowIndex][columnIndex] = value

        return new FrozenRowBasedMatrix(data)
    }

    setColumn(column: Column<T>, columnIndex: number): Matrix<T> {
        this.checkValidColumnIndex(columnIndex)

        let data: MatrixData<T> = Arrays.clone2(this.#data)
        for(let r = 0; r < this.#totRows; r++) {
            data[r][columnIndex] = column[r]
        }

        return new FrozenRowBasedMatrix(data)
    }

    setRow(row: Row<T>, rowIndex: number): Matrix<T> {
        this.checkValidRowIndex(rowIndex)

        let data: MatrixData<T> = Arrays.clone2(this.#data)
        for(let c = 0; c < this.#totColumns; c++) {
            data[rowIndex][c] = row[c]
        }

        return new FrozenRowBasedMatrix(data)
    }

    subtract(scalar: number): NumMatrix;
    subtract(other: NumMatrix): NumMatrix;
    subtract(other: number|NumMatrix): NumMatrix {
        if(typeof other == "number") {
            return MatrixAlgebra.subtract(this as NumMatrix, other)
        }

        return MatrixAlgebra.subtract(this as NumMatrix, other)
    }

    transpose(): Matrix<T> {
        return MatrixAlgebra.transpose(this)
    }

    unfrozen(): Matrix<T> {
        return new MutableRowBasedMatrix(this.#data)
    }

}