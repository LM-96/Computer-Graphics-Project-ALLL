import {Pair, pairOf} from "./types";
import {Matrix} from "./matrix";

let m1: Matrix<number> = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
let m2: Matrix<number> = new Matrix([[5, 6], [7, 8]])
console.log(m1.trace())
console.log(m1.transpose().toString())