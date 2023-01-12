import {Matrix} from "./matrix";

/**
 * An array of elements that represents a **row**
 */
export type Row<T> = Array<T>

/**
 * An array of elements that represents a **column**
 */
export type Column<T> = Array<T>

/**
 * A matrix of numbers
 */
export type NumMatrix = Matrix<number>

/**
 * The type for the internal data of a matrix
 */
export type MatrixData<T> = Array<Row<T>>