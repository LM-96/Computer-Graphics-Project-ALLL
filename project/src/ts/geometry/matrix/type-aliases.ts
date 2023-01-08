/**
 * An array of elements that represents a **row**
 */
import {AbstractMatrix} from "./abstract-matrix-old";

export type Row<T> = Array<T>

/**
 * An array of elements that represents a **column**
 */
export type Column<T> = Array<T>

/**
 * A matrix of numbers
 */
export type NumMatrix = AbstractMatrix<number>

/**
 * The type for the internal data of a matrix
 */
export type MatrixData<T> = Array<Row<T>>