"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberCouple = exports.NumberCouple = void 0;
const pair_1 = require("../pair");
const illegal_argument_exception_1 = require("../exceptions/illegal-argument-exception");
class NumberCouple extends pair_1.Pair {
    constructor(number1, number2) {
        super(number1, number2);
    }
    applyAdd(operand1, operand2) {
        if (operand2 == undefined) {
            operand2 = operand1;
        }
        this.setFirst(this.getSecond() + operand1);
        this.setSecond(this.getSecond() + operand2);
        return this;
    }
    /**
     * Apply an addition to the **first** element of this couple.
     * This method will update the internal elements of this pair by adding
     * the given argument to the first one, then returns `this`
     * @param {number} operand the number to be added to the **first** element of this pair
     * @returns {NumberCouple} this couple
     */
    applyAddToFirst(operand) {
        this.setFirst(this.getFirst() + operand);
        return this;
    }
    /**
     * Apply an addition to the **second** element of this couple.
     * This method will update the internal elements of this pair by adding
     * the given argument to the second one, then returns `this`
     * @param {number} operand the number to be added to the **second** element of this pair
     * @returns {NumberCouple} this couple
     */
    applyAddToSecond(operand) {
        this.setSecond(this.getSecond() + operand);
        return this;
    }
    /**
     * Apply an addition to the element of this couple specified by the `position` parameter.
     * This method will update the internal elements of this pair by adding
     * the given argument to the desired one, then returns `this`
     * @param {number} operand the number to be added to the desired element of this pair
     * @param {PairPosition} position the position
     * @returns {NumberCouple} this couple
     */
    applyAddTo(operand, position) {
        this.set(this.get(position) + operand, position);
        return this;
    }
    applySub(operand1, operand2) {
        if (operand2 == undefined) {
            operand2 = operand1;
        }
        this.setFirst(this.getFirst() - operand1);
        this.setSecond(this.getSecond() - operand2);
        return this;
    }
    /**
     * Apply a subtraction to the **first** element of this couple.
     * This method will update the internal elements of this pair by subtracting
     * the given argument from the first one, then returns `this`
     * @param {number} operand the number to be subtracted from the **first** element of this pair
     * @returns {NumberCouple} this couple
     */
    applySubFromFirst(operand) {
        this.setFirst(this.getFirst() - operand);
        return this;
    }
    /**
     * Apply a subtraction to the **second** element of this couple.
     * This method will update the internal elements of this pair by subtracting
     * the given argument from the second one, then returns `this`
     * @param {number} operand the number to be subtracted from the **second** element of this pair
     * @returns {NumberCouple} this couple
     */
    applySubFromSecond(operand) {
        this.setSecond(this.getSecond() - operand);
        return this;
    }
    /**
     * Apply a subtraction to the element of this couple specified by `position`.
     * This method will update the internal elements of this pair by subtracting
     * the given argument from the desired one, then returns `this`
     * @param {number} operand the number to be subtracted
     * @param {PairPosition} position the position
     * @returns {NumberCouple} this couple
     */
    applySubFrom(operand, position) {
        this.set(this.get(position) - operand, position);
        return this;
    }
    applyMul(operand1, operand2) {
        if (operand2 == undefined) {
            operand2 = operand1;
        }
        this.setFirst(this.getFirst() * operand1);
        this.setSecond(this.getSecond() * operand2);
        return this;
    }
    /**
     * Apply a multiplication to the **first** element of this couple.
     * This method will update the internal elements of this pair by multiplying
     * the given argument to the first one, then returns `this`
     * @param {number} operand the number to be multiplied to the **first** element of this pair
     * @returns {NumberCouple} this couple
     */
    applyMulToFirst(operand) {
        this.setFirst(this.getFirst() + operand);
        return this;
    }
    /**
     * Apply a multiplication to the **second** element of this couple.
     * This method will update the internal elements of this pair by multiplying
     * the given argument to the second one, then returns `this`
     * @param {number} operand the number to be multiplied to the **second** element of this pair
     * @returns {NumberCouple} this couple
     */
    applyMulToSecond(operand) {
        this.setSecond(this.getSecond() + operand);
        return this;
    }
    /**
     * Apply a multiplication to the element of this couple specified by `position`.
     * This method will update the internal elements of this pair by multiplying
     * the given argument to the one at the desired position, then returns `this`
     * @param {number} operand the number to be multiplied to the **second** element of this pair
     * @param {PairPosition} position the position
     * @returns {NumberCouple} this couple
     */
    applyMulTo(operand, position) {
        this.set(this.get(position) + operand, position);
        return this;
    }
    applyDiv(operand1, operand2) {
        if (operand1 === 0) {
            throw new illegal_argument_exception_1.IllegalArgumentException('the first operand is 0: impossible to divide by 0');
        }
        if (operand2 === 0) {
            throw new illegal_argument_exception_1.IllegalArgumentException('the second operand is 0: impossible to divide by 0');
        }
        if (operand2 == undefined) {
            operand2 = operand1;
        }
        this.setFirst(this.getFirst() / operand1);
        this.setSecond(this.getSecond() / operand2);
        return this;
    }
    /**
     * Apply a division to the **first** element of this couple.
     * This method will update the internal elements of this pair by dividing
     * the first one by the argument of this method, then returns `this`
     * @param {number} operand the divisor for the **first** element of this pair
     * @returns {NumberCouple} this couple
     * @throws {IllegalArgumentException} if the operand is `0`
     */
    applyDivToFirst(operand) {
        if (operand === 0) {
            throw new illegal_argument_exception_1.IllegalArgumentException('the divisor is 0: impossible to divide by 0');
        }
        this.setFirst(this.getFirst() / operand);
        return this;
    }
    /**
     * Apply a division to the **second** element of this couple.
     * This method will update the internal elements of this pair by dividing
     * the second one by the argument of this method, then returns `this`
     * @param {number} operand the divisor for the **second** element of this pair
     * @returns {NumberCouple} this couple
     * @throws {IllegalArgumentException} if the operand is `0`
     */
    applyDivToSecond(operand) {
        if (operand === 0) {
            throw new illegal_argument_exception_1.IllegalArgumentException('the divisor is 0: impossible to divide by 0');
        }
        this.setSecond(this.getSecond() / operand);
        return this;
    }
    /**
     * Apply a division to the element of this couple specified by `position`.
     * This method will update the internal elements of this pair by dividing
     * the desired one by the argument of this method, then returns `this`
     * @param {number} operand the divisor for the desired element of this pair
     * @param {PairPosition} position the position
     * @returns {NumberCouple} this couple
     * @throws {IllegalArgumentException} if the operand is `0`
     */
    applyDivTo(operand, position) {
        if (operand === 0) {
            throw new illegal_argument_exception_1.IllegalArgumentException('the divisor is 0: impossible to divide by 0');
        }
        this.set(this.get(position) / operand, position);
        return this;
    }
    applySimpleOperator(operator1, operator2) {
        if (operator2 == undefined) {
            operator2 = operator1;
        }
        this.setFirst(operator1(this.getFirst()));
        this.setSecond(operator2(this.getSecond()));
        return this;
    }
    applyOperator(operator1, operator2, ...args) {
        if (operator2 == undefined) {
            operator2 = operator1;
        }
        this.setFirst(operator1(this.getFirst(), ...args));
        this.setSecond(operator2(this.getSecond(), ...args));
        return this;
    }
    /**
     * Applies a simple operator to the **first** element of this pair.
     * This method will update the internal element of this pair by applying `operand`
     * to the first element of this pair.
     * Notice that the operand is simple because it only takes a number and returns the result
     * @param {NumericOperator} operator the simple operator function
     * @returns this couple
     */
    applySimpleOperatorToFirst(operator) {
        this.setFirst(operator(this.getFirst()));
        return this;
    }
    /**
     * Applies a simple operator to the **second** element of this pair.
     * This method will update the internal element of this pair by applying `operand`
     * to the second element of this pair.
     * Notice that the operand is simple because it only takes a number and returns the result
     * @param {NumericOperator} operator the simple operator function
     * @returns this couple
     */
    applySimpleOperatorToSecond(operator) {
        this.setSecond(operator(this.getSecond()));
        return this;
    }
    /**
     * Applies a simple operator to the element of this pair specified by `position`.
     * This method will update the internal element of this pair by applying `operand`
     * to the desired element of this pair.
     * Notice that the operand is simple because it only takes a number and returns the result
     * @param {NumericOperator} operator the simple operator function
     * @param {PairPosition} position the position
     * @returns this couple
     */
    applySimpleOperatorTo(operator, position) {
        this.set(operator(this.get(position)), position);
        return this;
    }
    /**
     * Applies a simple operator to the **first** element of this pair.
     * This method will update the internal element of this pair by applying `operand`
     * to the first element of this pair
     * @param {NumericOperator} operator the simple operator function
     * @param {...any} args the arguments to be passed to the operator
     * @returns this couple
     */
    applyOperatorToFirst(operator, ...args) {
        this.setFirst(operator(this.getFirst(), ...args));
        return this;
    }
    /**
     * Applies a simple operator to the **second** element of this pair.
     * This method will update the internal element of this pair by applying `operand`
     * to the second element of this pair
     * @param {NumericOperator} operator the simple operator function
     * @param {...any} args the arguments to be passed to the operator
     * @returns this couple
     */
    applyOperatorToSecond(operator, ...args) {
        this.setSecond(operator(this.getSecond(), ...args));
        return this;
    }
    /**
     * Applies a simple operator to the element of this pair specified by `position`.
     * This method will update the internal element of this pair by applying `operand`
     * to the desired element of this pair
     * @param {NumericOperator} operator the simple operator function
     * @param {PairPosition} position the position
     * @param {...any} args the arguments to be passed to the operator
     * @returns this couple
     */
    applyOperatorTo(operator, position, ...args) {
        this.set(operator(this.get(position), ...args), position);
        return this;
    }
    add(operand1, operand2) {
        if (operand2 == undefined) {
            operand2 = operand1;
        }
        return new NumberCouple(this.getFirst() + operand1, this.getSecond() + operand2);
    }
    /**
     * Adds the given `operand` to the **first** element of this couple returning the result.
     * **This method is different from `applyAddToFirst()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {number} operand the number to be added to the first element of this pair
     * @returns {NumberCouple} the couple that contains the result
     */
    addToFirst(operand) {
        return new NumberCouple(this.getFirst() + operand, this.getSecond());
    }
    /**
     * Adds the given `operand` to the **second** element of this couple returning the result.
     * **This method is different from `applyAddToSecond()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {number} operand the number to be added to the second element of this pair
     * @returns {NumberCouple} the couple that contains the result
     */
    addToSecond(operand) {
        return new NumberCouple(this.getFirst(), this.getSecond() + operand);
    }
    /**
     * Adds the given `operand` to the element of this couple at the specified position, returning the result.
     * **This method is different from `applyAddToSecond()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {number} operand the number to be added to the second element of this pair
     * @param {PairPosition} position the position
     * @returns {NumberCouple} the couple that contains the result
     */
    addTo(operand, position) {
        switch (position) {
            case pair_1.PairPosition.FIRST: return new NumberCouple(this.getFirst() + operand, this.getSecond());
            case pair_1.PairPosition.SECOND: return new NumberCouple(this.getFirst(), this.getSecond() + operand);
        }
    }
    sub(operand1, operand2) {
        if (operand2 == undefined) {
            operand2 = operand1;
        }
        return new NumberCouple(this.getFirst() - operand1, this.getSecond() - operand2);
    }
    /**
     * Subtracts the given `operand` from the **first** element of this couple returning the result.
     * **This method is different from `applySubtractFromFirst()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {number} operand the number to be subtracted from the first element of this pair
     * @returns {NumberCouple} the couple that contains the result
     */
    subFromFirst(operand) {
        return new NumberCouple(this.getFirst() - operand, this.getSecond());
    }
    /**
     * Subtracts the given `operand` from the **second** element of this couple returning the result.
     * **This method is different from `applySubtractSecond()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {number} operand the number to be subtracted from the second element of this pair
     * @returns {NumberCouple} the couple that contains the result
     */
    subFromSecond(operand) {
        return new NumberCouple(this.getFirst(), this.getSecond() - operand);
    }
    /**
     * Subtracts the given `operand` from the element of this couple at the specified position, returning the result.
     * **This method is different from `applySubtractSecond()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {number} operand the number to be subtracted from the desired element of this pair
     * @param {PairPosition} position the position
     * @returns {NumberCouple} the couple that contains the result
     */
    subFrom(operand, position) {
        switch (position) {
            case pair_1.PairPosition.FIRST: return new NumberCouple(this.getFirst() - operand, this.getSecond());
            case pair_1.PairPosition.SECOND: return new NumberCouple(this.getFirst(), this.getSecond() - operand);
        }
    }
    mul(operand1, operand2) {
        if (operand2 == undefined) {
            operand2 = operand1;
        }
        return new NumberCouple(this.getFirst() * operand1, this.getSecond() * operand2);
    }
    /**
     * Multiply the given `operand` to the **first** element of this couple returning the result.
     * **This method is different from `applyMulToFirst()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {number} operand the number to be multiplied to the first element of this pair
     * @returns {NumberCouple} the couple that contains the result
     */
    mulToFirst(operand) {
        return new NumberCouple(this.getFirst() * operand, this.getSecond());
    }
    /**
     * Multiply the given `operand` to the **second** element of this couple returning the result.
     * **This method is different from `applyMulToSecond()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {number} operand the number to be multiplied to the second element of this pair
     * @returns {NumberCouple} the couple that contains the result
     */
    mulToSecond(operand) {
        return new NumberCouple(this.getFirst(), this.getSecond() * operand);
    }
    /**
     * Multiply the given `operand` to the element of this couple returning the result.
     * **This method is different from `applyMulToFirst()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {number} operand the number to be multiplied to the first element of this pair
     * @param {position} position the position
     * @returns {NumberCouple} the couple that contains the result
     */
    mulTo(operand, position) {
        switch (position) {
            case pair_1.PairPosition.FIRST: return new NumberCouple(this.getFirst() * operand, this.getSecond());
            case pair_1.PairPosition.SECOND: return new NumberCouple(this.getFirst(), this.getSecond() * operand);
        }
    }
    div(operand1, operand2) {
        if (operand1 === 0) {
            throw new illegal_argument_exception_1.IllegalArgumentException('the first operand is 0: impossible to divide by 0');
        }
        if (operand2 === 0) {
            throw new illegal_argument_exception_1.IllegalArgumentException('the second operand is 0: impossible to divide by 0');
        }
        if (operand2 == undefined) {
            operand2 = operand1;
        }
        return new NumberCouple(this.getFirst() / operand1, this.getSecond() / operand2);
    }
    /**
     * Divide the **first** element of this couple by the given `operand`, returning the result.
     * **This method is different from `applyDivToFirst()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {number} operand the divisor for the first element of this pair
     * @returns {NumberCouple} the couple that contains the result
     * @throws {IllegalArgumentException} if the operand is `0`
     */
    divFromFirst(operand) {
        if (operand === 0) {
            throw new illegal_argument_exception_1.IllegalArgumentException('the divisor is 0: impossible to divide by 0');
        }
        return new NumberCouple(this.getFirst() / operand, this.getSecond());
    }
    /**
     * Divide the **second** element of this couple by the given `operand`, returning the result.
     * **This method is different from `applyDivToSecond()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {number} operand the divisor for the second element of this pair
     * @returns {NumberCouple} the couple that contains the result
     * @throws {IllegalArgumentException} if the operand is `0`
     */
    divFromSecond(operand) {
        if (operand === 0) {
            throw new illegal_argument_exception_1.IllegalArgumentException('the divisor is 0: impossible to divide by 0');
        }
        return new NumberCouple(this.getFirst(), this.getSecond() / operand);
    }
    /**
     * Divide the element of this couple at the specified position by the given `operand`, returning the result.
     * **This method is different from `applyDivToSecond()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {number} operand the divisor for the desired element of this pair
     * @param {PairPosition} position the position
     * @returns {NumberCouple} the couple that contains the result
     * @throws {IllegalArgumentException} if the operand is `0`
     */
    divFrom(operand, position) {
        if (operand === 0) {
            throw new illegal_argument_exception_1.IllegalArgumentException('the divisor is 0: impossible to divide by 0');
        }
        switch (position) {
            case pair_1.PairPosition.FIRST: return new NumberCouple(this.getFirst() / operand, this.getSecond());
            case pair_1.PairPosition.SECOND: return new NumberCouple(this.getFirst(), this.getSecond() / operand);
        }
    }
    simpleOperator(operator1, operator2) {
        if (operator2 == undefined) {
            operator2 = operator1;
        }
        return new NumberCouple(operator1(this.getFirst()), operator2(this.getSecond()));
    }
    operator(operator1, operator2, ...args) {
        if (operator2 == undefined) {
            operator2 = operator1;
        }
        return new NumberCouple(operator1(this.getFirst(), ...args), operator2(this.getSecond(), ...args));
    }
    /**
     * Executes a simple operator with the **first** element of this pair.
     * **This method is different from `applySimpleOperatorToFirst()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {NumericOperator} operator the simple operator function
     * @returns {NumberCouple} the couple that contains the result
     */
    simpleOperatorToFirst(operator) {
        return new NumberCouple(operator(this.getFirst()), this.getSecond());
    }
    /**
     * Executes a simple operator with the **second** element of this pair.
     * **This method is different from `applySimpleOperatorToSecond()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {NumericOperator} operator the simple operator function
     * @returns {NumberCouple} the couple that contains the result
     */
    simpleOperatorToSecond(operator) {
        return new NumberCouple(this.getFirst(), operator(this.getSecond()));
    }
    /**
     * Executes a simple operator with the element of this pair at the specified position.
     * **This method is different from `applySimpleOperatorTo()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {NumericOperator} operator the simple operator function
     * @param {PairPosition} position the position
     * @returns {NumberCouple} the couple that contains the result
     */
    simpleOperatorTo(operator, position) {
        switch (position) {
            case pair_1.PairPosition.FIRST: return new NumberCouple(operator(this.getFirst()), this.getSecond());
            case pair_1.PairPosition.SECOND: return new NumberCouple(this.getFirst(), operator(this.getSecond()));
        }
    }
    /**
     * Executes an operator with the **first** element of this pair.
     * **This method is different from `applySimpleOperatorToFirst()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {NumericOperator} operator the simple operator function
     * @param {...any} args the arguments to be passed to the operator
     * @returns {NumberCouple} the couple that contains the result
     */
    operatorToFirst(operator, ...args) {
        return new NumberCouple(operator(this.getFirst(), ...args), this.getSecond());
    }
    /**
     * Executes an operator with the **second** element of this pair.
     * **This method is different from `applySimpleOperatorToFirst()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {NumericOperator} operator the simple operator function
     * @param {...any} args the arguments to be passed to the operator
     * @returns {NumberCouple} the couple that contains the result
     */
    operatorToSecond(operator, ...args) {
        return new NumberCouple(this.getFirst(), operator(this.getSecond(), ...args));
    }
    /**
     * Executes an operator with the element of this pair at the specified position.
     * **This method is different from `applySimpleOperatorTo()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {NumericOperator} operator the simple operator function
     * @param {PairPosition} position the position
     * @param {...any} args the arguments to be passed to the operator
     * @returns {NumberCouple} the couple that contains the result
     */
    operatorTo(operator, position, ...args) {
        switch (position) {
            case pair_1.PairPosition.FIRST: return new NumberCouple(operator(this.getFirst(), ...args), this.getSecond());
            case pair_1.PairPosition.SECOND: return new NumberCouple(this.getFirst(), operator(this.getSecond(), ...args));
        }
    }
    /**
     * Returns `true` if the given `number` is *between* the ones in this couple.
     * This method basically chef if the number is `>` or `>=` then the minimum in this
     * couple and `<` or `<=` then the maximum. The two parameters `leftEq` and `rightEq`
     * allow to specify:
     *
     * - if `leftEq` is `true`, then the *left* check will be `MIN <= number`
     * - if `rightEq` is `true`, then the *right* check will be `number <= MAX`
     * @param {number} number the number to be checked
     * @param {boolean} leftEq if `true`, the check will include the case in which `number` is equal to the minimum
     * (`true` by default)
     * @param {boolean} rightEq if `true`, the check will include the case in which `number` is equal to the maximum
     * (`true` by default)
     * @return `true` if the given `number` is *between* the ones in this couple, `false` otherwise
     */
    isBetween(number, leftEq = true, rightEq = true) {
        let min;
        let max;
        if (this.getFirst() < this.getSecond()) {
            min = this.getFirst();
            max = this.getSecond();
        }
        else {
            min = this.getSecond();
            max = this.getFirst();
        }
        return (number > min || (number == min && leftEq))
            && (number < this.getSecond() || (number == this.getSecond() && rightEq));
    }
    clone() {
        return new NumberCouple(this.getFirst(), this.getSecond());
    }
}
exports.NumberCouple = NumberCouple;
/**
 * Creates and return a new couple of numbers
 * @param {number} number1 the first number
 * @param {number} number2 the second number
 * @return the new `NumberCouple`
 */
function numberCouple(number1, number2) {
    return new NumberCouple(number1, number2);
}
exports.numberCouple = numberCouple;
//# sourceMappingURL=number-couple.js.map