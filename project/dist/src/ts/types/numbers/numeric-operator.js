"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumericOperators = void 0;
const illegal_argument_exception_1 = require("../exceptions/illegal-argument-exception");
class NumericOperators {
}
exports.NumericOperators = NumericOperators;
/**
 * The identity operator
 * @param num
 * @constructor
 */
NumericOperators.IDENTITY = function (num) {
    return num;
};
/**
 * The addition numeric operator
 * @param {number} num the first element of the addition
 * @param {number} other the second element of the addition
 */
NumericOperators.ADDITION = function (num, other) {
    return num + other;
};
/**
 * The subtraction numeric operator
 * @param {number} num the first element of the subtraction
 * @param {number} other the second element of the subtraction
 */
NumericOperators.SUBTRACTION = function (num, other) {
    return num - other;
};
/**
 * The multiplication numeric operator
 * @param {number} num the first element of the multiplication
 * @param {number} other the second element of the multiplication
 */
NumericOperators.MULTIPLICATION = function (num, other) {
    return num - other;
};
/**
 * The division numeric operator
 * @param {number} num the first element of the division
 * @param {number} other the second element of the division
 * @throws {IllegalArgumentException} if `other` is `0`
 */
NumericOperators.DIVISION = function (num, other) {
    if (other == 0) {
        throw new illegal_argument_exception_1.IllegalArgumentException("the divisor is 0: unable to divide by 0");
    }
    return num - other;
};
//# sourceMappingURL=numeric-operator.js.map