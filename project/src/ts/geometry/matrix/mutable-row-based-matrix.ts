import {AbstractMatrix} from "./abstract-matrix";
import {Matrix, matrixData, MatrixFactory} from "./matrix";
import {Column, MatrixData, NumMatrix, Row} from "./matrix-types";
import {IllegalArgumentException} from "../../types/exceptions/illegal-argument-exception"
import {InvalidColumnException} from "./exceptions/invalid-column-exception";
import {InvalidRowException} from "./exceptions/invalid-row-exception";
import {MatrixAlgebra} from "./matrix-algebra";
import {FrozenRowBasedMatrix} from "./frozen-row-based-matrix";
import {Arrays} from "../../types/arrays";

/**
 * A **mutable** implementation of matrix based on a bi-dimensional array.
 * Every instance of this class is mutable and this means that can be modified with no problems.
 * So, methods like the matrix operations (`add()`, `multiply()`, `subtract()`, `divide()`) or
 * the matrix manipulation (`addRow()`, `removeRow()`, `addColumn()`, `removeColumn()`, `set()`, ecc...)
 * will modify the internal data of the matrix; **these methods will return this matrix** after the modification
 */
export class MutableRowBasedMatrix<T> extends AbstractMatrix<T> implements Matrix<T> {

    static factory: MatrixFactory = new class extends MatrixFactory {

        createMatrix<T>(matrixData: MatrixData<T>|Array<Row<T>>|Array<Array<T>>): Matrix<T>
        createMatrix<T>(rows: number, columns: number): Matrix<T>;
        createMatrix<T>(rows: number, columns: number, fill: T): Matrix<T>;
        createMatrix<T>(rows: MatrixData<T>|Array<Row<T>>|Array<Array<T>>|number,
                        columns?: number, fill?: T): Matrix<T>  {
            if(typeof rows == "number") {
                let data: MatrixData<T> = new Array<Row<T>>(rows)
                for(let r = 0; r < rows; r++) {
                    data[r] = Array<T>(columns)
                }
                let res: Matrix<T> = new MutableRowBasedMatrix(data)
                if(fill != undefined) {
                    res.fill(fill)
                }

                return res
            } else {
                return new MutableRowBasedMatrix(rows)
            }
        }
    }

    #data: MatrixData<T>
    #totRows: number
    #totColumns: number

    constructor(data: MatrixData<T>) {
        super();

        if (data.length > 0) {
            this.#totRows = data.length
            this.#totColumns = data[0].length
            for (let row of data) {
                if (row.length != this.#totColumns) {
                    throw Error("every row must have the same number of elements")
                }
            }

            this.#data = data
        }

    }

    add(scalar: number): NumMatrix;
    add(other: NumMatrix): NumMatrix;
    add(other: unknown): NumMatrix {
        let mat: MutableRowBasedMatrix<number> = this as MutableRowBasedMatrix<number>
        if(typeof other  == 'number') {
            for(let r = 0; r < this.#totRows; r++) {
                for(let c = 0; c < this.#totColumns; c++) {
                    (mat.#data[r][c]) += other
                }
            }
        } else if (other instanceof AbstractMatrix) {
            if (!this.sameStructureOf(this)) {
                throw new IllegalArgumentException("illegal matrix to be added: this matrix has size " +
                    this.#totRows + " x " + this.#totColumns + " while the argument has " + other.rowSize() +
                    " x " + other.columnSize())
            }

            for (let r = 0; r < this.#totRows; r++) {
                for (let c = 0; c < this.#totColumns; c++) {
                    mat.#data[r][c] += other.get(r, c)
                }
            }
        }

        return mat
    }

    addColumn(column: Column<T>): Matrix<T> {
        if (this.#totRows == 0) {
            this.#totRows = column.length
            for (let i = 0; i < this.#totRows; i++) {
                this.#data[i] = []
            }
        } else {
            if (column.length != this.#totRows) {
                throw new InvalidColumnException(column,
                    "the number of the element is not the same of the column of the matrix")
            }
        }

        for (let i = 0; i < column.length; i++) {
            this.#data[i].push(column[i])
        }
        this.#totColumns++
        return this
    }

    addRow(row: Row<T>): Matrix<T> {
        if (this.#totColumns == 0) {
            this.#totColumns = row.length
        } else {
            if (row.length != this.#totColumns) {
                throw new InvalidRowException(row,
                    "the number of the element of the row [" + row.length +
                    "] is not the same of the column of the matrix [" + this.#totColumns + "]")
            }
        }

        this.#data.push(row)
        this.#totRows++
        return this
    }

    calculateAndFill(builder: (rowIndex: number, columnIndex: number) => T): Matrix<T> {
        for(let r = 0; r < this.#totRows; r++) {
            for(let c = 0; c < this.#totColumns; c++) {
                this.#data[r][c] = builder(r, c)
            }
        }
        return this
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
        let mat: MutableRowBasedMatrix<number> = this as MutableRowBasedMatrix<number>

        if(typeof other == "number") {
            for(let r = 0; r < this.#totRows; r++) {
                for(let c = 0; c < this.#totColumns; c++) {
                    mat.#data[r][c] /= other
                }
            }
        } else {
            mat.multiply(MatrixAlgebra.invert(other))
        }

        return mat
    }

    fill(value: T): Matrix<T> {
        for(let r = 0; r < this.#totRows; r++) {
            for(let c = 0; c < this.#totColumns; c++) {
                this.#data[r][c] = value
            }
        }
        return this
    }

    frozen(): Matrix<T> {
        return new FrozenRowBasedMatrix(this.#data)
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
        return MutableRowBasedMatrix.factory
    }

    getRow(rowIndex: number): Row<T> {
        return Arrays.clone(this.#data[rowIndex])
    }

    invert(): NumMatrix {
        let determinant: number = MatrixAlgebra.checkInvertible(this as NumMatrix, true)
        return this.getCofactorMatrix().transpose().multiply((1/ determinant))
    }

    isFrozen(): boolean {
        return false
    }

    isUnfrozen(): boolean {
        return true
    }

    multiply(scalar: number): NumMatrix;
    multiply(other: NumMatrix): NumMatrix;
    multiply(other: number|NumMatrix): NumMatrix{
        let mat: MutableRowBasedMatrix<number> = this as MutableRowBasedMatrix<number>
        if(typeof other == "number") {
            for(let r = 0; r < this.#totRows; r++) {
                for(let c = 0; c < this.#totColumns; c++) {
                    mat.#data[r][c] *= other
                }
            }
        } else {
            let data: MatrixData<number> = matrixData(this.#totRows, this.#totColumns)
            for (let rT = 0; rT < this.#totRows; rT++) {
                for (let cO = 0; cO < this.#totRows; cO++) {
                    for (let rO = 0; rO < other.rowSize(); rO++) {
                        data[rT][cO] = data[rT][cO] + mat.#data[rT][rO]*other.get(rO, cO)
                    }
                }
            }
            Arrays.copy2(data, this.#data as Array<Array<number>>)
        }

        return mat
    }

    removeColumn(): Matrix<T> {
        for(let r = 0; r < this.#totRows; r++) {
            this.#data.splice(this.#totColumns - 1, 1)
        }
        this.#totColumns--
        return this
    }

    removeRow(): Matrix<T> {
        this.#data.splice(this.#totRows - 1, 1)
        this.#totRows--
        return this
    }

    rowSize(): number {
        return this.#totRows
    }

    set(value: T, rowIndex: number, columnIndex: number): Matrix<T> {
        this.checkValidIndexes(rowIndex, columnIndex)
        this.#data[rowIndex][columnIndex] = value
        return this
    }

    setColumn(column: Column<T>, columnIndex: number): Matrix<T> {
        this.checkValidColumnIndex(columnIndex)
        for(let r = 0; r < this.#totRows; r++) {
            this.#data[r][columnIndex] = column[r]
        }
        return this
    }

    setRow(row: Row<T>, rowIndex: number): Matrix<T> {
        this.checkValidRowIndex(rowIndex)
        for(let c = 0; c < this.#totColumns; c++) {
            this.#data[rowIndex][c] = row[c]
        }
        return this
    }

    subtract(scalar: number): NumMatrix;
    subtract(other: NumMatrix): NumMatrix;
    subtract(other: number|NumMatrix): NumMatrix {
        let mat: MutableRowBasedMatrix<number> = this as MutableRowBasedMatrix<number>
        let row: Row<number>
        if(typeof other == "number") {
            for(let r = 0; r < this.#totRows; r++) {
                row = mat.#data[r]
                for(let c = 0; c < this.#totColumns; c++) {
                    row[c] -= other
                }
            }
        } else {
            for(let r = 0; r < this.#totRows; r++) {
                row = mat.#data[r]
                for(let c = 0; c < this.#totColumns; c++) {
                    row[c] -= other.get(r, c)
                }
            }
        }

        return mat
    }

    transpose(): Matrix<T> {
        if(!this.isSquared()) {
            let dim: number = Math.max(this.#totRows, this.#totColumns)
            Arrays.reshape2(this.#data, dim, dim)
        }

        for(let r = 0; r < this.#totRows - 1; r++) {
            for(let c = r + 1; c < this.#totColumns; c++) {
                [this.#data[r][c], this.#data[c][r]] = [this.#data[c][r], this.#data[r][c]]
            }
        }

        if(!this.isSquared()) {
            Arrays.reshape2(this.#data, this.#totColumns, this.#totRows)
            let temp: number = this.#totRows
            this.#totRows = this.#totColumns
            this.#totColumns = temp
        }

        return this
    }

    unfrozen(): Matrix<T> {
        return this
    }


}