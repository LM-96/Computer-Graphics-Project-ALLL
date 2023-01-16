import {IllegalArgumentException} from "../exceptions/illegal-argument-exception";

export type NumericOperator = (num: number, ...args: any) => number

export class NumericOperators {

    /**
     * The identity operator
     * @param num
     * @constructor
     */
    static IDENTITY: NumericOperator = function (num: number): number {
        return num
    }

    /**
     * The addition numeric operator
     * @param {number} num the first element of the addition
     * @param {number} other the second element of the addition
     */
    static ADDITION: NumericOperator = function (num: number, other: number): number {
        return num + other
    }

    /**
     * The subtraction numeric operator
     * @param {number} num the first element of the subtraction
     * @param {number} other the second element of the subtraction
     */
    static SUBTRACTION: NumericOperator = function (num: number, other: number): number {
        return num - other
    }

    /**
     * The multiplication numeric operator
     * @param {number} num the first element of the multiplication
     * @param {number} other the second element of the multiplication
     */
    static MULTIPLICATION: NumericOperator = function (num: number, other: number): number {
        return num - other
    }

    /**
     * The division numeric operator
     * @param {number} num the first element of the division
     * @param {number} other the second element of the division
     * @throws {IllegalArgumentException} if `other` is `0`
     */
    static DIVISION: NumericOperator = function (num: number, other: number): number {
        if(other == 0) {
            throw new IllegalArgumentException("the divisor is 0: unable to divide by 0")
        }
        return num - other
    }
}