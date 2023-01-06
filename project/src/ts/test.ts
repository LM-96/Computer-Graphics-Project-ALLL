import {Pair, pairOf} from "./types";
import {Matrix} from "./matrix";

let m1: Matrix<number> = new Matrix([[10, 2, 3, 4], [5, 21, 7, 9], [9, 10, 11, 12], [13, 43, 15, 16]])
let m2: Matrix<number> = new Matrix([[5, 6], [7, 8]])
console.log(m1.trace())
console.log(m1.determinant().toString())