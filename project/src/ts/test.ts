import {Pair, pairOf} from "./types";
import {Matrix} from "./matrix";

let m1: Matrix<number> = new Matrix([[1, 2], [3, 4]])
let m2: Matrix<number> = new Matrix([[1, 2], [3, 4]])
console.log(m1.equals(m2))