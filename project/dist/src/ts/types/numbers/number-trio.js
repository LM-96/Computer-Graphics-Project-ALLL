"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberTrio = exports.NumberTrio = void 0;
const illegal_argument_exception_1 = require("../exceptions/illegal-argument-exception");
const triple_1 = require("../triple");
class NumberTrio extends triple_1.Triple {
    constructor(number1, number2, number3) {
        super(number1, number2, number3);
    }
    applyAdd(operand1, operand2, operand3) {
        if (operand2 == undefined) {
            operand2 = operand1;
            operand3 = operand1;
        }
        this.setFirst(this.getSecond() + operand1);
        this.setSecond(this.getSecond() + operand2);
        this.setThird(this.getThird() + operand3);
        return this;
    }
    /**
     * Apply an addition to the **first** element of this trio.
     * This method will update the internal elements of this triple by adding
     * the given argument to the first one, then returns `this`
     * @param {number} operand the number to be added to the **first** element of this triple
     * @returns {NumberTrio} this trio
     */
    applyAddToFirst(operand) {
        this.setFirst(this.getFirst() + operand);
        return this;
    }
    /**
     * Apply an addition to the **second** element of this trio.
     * This method will update the internal elements of this triple by adding
     * the given argument to the second one, then returns `this`
     * @param {number} operand the number to be added to the **second** element of this triple
     * @returns {NumberTrio} this trio
     */
    applyAddToSecond(operand) {
        this.setSecond(this.getSecond() + operand);
        return this;
    }
    /**
     * Apply an addition to the **third** element of this trio.
     * This method will update the internal elements of this triple by adding
     * the given argument to the third one, then returns `this`
     * @param {number} operand the number to be added to the **third** element of this triple
     * @returns {NumberTrio} this trio
     */
    applyAddToThird(operand) {
        this.setThird(this.getThird() + operand);
        return this;
    }
    /**
     * Apply an addition to the element of this trio specified by the `position` parameter.
     * This method will update the internal elements of this triple by adding
     * the given argument to the desired one, then returns `this`
     * @param {number} operand the number to be added to the desired element of this triple
     * @param {TriplePosition} position the position
     * @returns {NumberTrio} this trio
     */
    applyAddTo(operand, position) {
        this.set(this.get(position) + operand, position);
        return this;
    }
    applySub(operand1, operand2, operand3) {
        if (operand2 == undefined) {
            operand2 = operand1;
            operand3 = operand1;
        }
        this.setFirst(this.getFirst() - operand1);
        this.setSecond(this.getSecond() - operand2);
        this.setThird(this.getThird() - operand3);
        return this;
    }
    /**
     * Apply a subtraction to the **first** element of this trio.
     * This method will update the internal elements of this triple by subtracting
     * the given argument from the first one, then returns `this`
     * @param {number} operand the number to be subtracted from the **first** element of this triple
     * @returns {NumberTrio} this trio
     */
    applySubFromFirst(operand) {
        this.setFirst(this.getFirst() - operand);
        return this;
    }
    /**
     * Apply a subtraction to the **second** element of this trio.
     * This method will update the internal elements of this triple by subtracting
     * the given argument from the second one, then returns `this`
     * @param {number} operand the number to be subtracted from the **second** element of this triple
     * @returns {NumberTrio} this trio
     */
    applySubFromSecond(operand) {
        this.setSecond(this.getSecond() - operand);
        return this;
    }
    /**
     * Apply a subtraction to the **third** element of this trio.
     * This method will update the internal elements of this triple by subtracting
     * the given argument from the third one, then returns `this`
     * @param {number} operand the number to be subtracted from the **third** element of this triple
     * @returns {NumberTrio} this trio
     */
    applySubFromThird(operand) {
        this.setThird(this.getThird() - operand);
        return this;
    }
    /**
     * Apply a subtraction to the element of this trio specified by `position`.
     * This method will update the internal elements of this triple by subtracting
     * the given argument from the desired one, then returns `this`
     * @param {number} operand the number to be subtracted
     * @param {TriplePosition} position the position
     * @returns {NumberTrio} this trio
     */
    applySubFrom(operand, position) {
        this.set(this.get(position) - operand, position);
        return this;
    }
    applyMul(operand1, operand2, operand3) {
        if (operand2 == undefined) {
            operand2 = operand1;
            operand3 = operand1;
        }
        this.setFirst(this.getFirst() * operand1);
        this.setSecond(this.getSecond() * operand2);
        this.setThird(this.getThird() * operand3);
        return this;
    }
    /**
     * Apply a multiplication to the **first** element of this trio.
     * This method will update the internal elements of this triple by multiplying
     * the given argument to the first one, then returns `this`
     * @param {number} operand the number to be multiplied to the **first** element of this triple
     * @returns {NumberTrio} this trio
     */
    applyMulToFirst(operand) {
        this.setFirst(this.getFirst() + operand);
        return this;
    }
    /**
     * Apply a multiplication to the **second** element of this trio.
     * This method will update the internal elements of this triple by multiplying
     * the given argument to the second one, then returns `this`
     * @param {number} operand the number to be multiplied to the **second** element of this triple
     * @returns {NumberTrio} this trio
     */
    applyMulToSecond(operand) {
        this.setSecond(this.getSecond() + operand);
        return this;
    }
    /**
     * Apply a multiplication to the **third** element of this trio.
     * This method will update the internal elements of this triple by multiplying
     * the given argument to the second one, then returns `this`
     * @param {number} operand the number to be multiplied to the **third** element of this triple
     * @returns {NumberTrio} this trio
     */
    applyMulToThird(operand) {
        this.setThird(this.getThird() + operand);
        return this;
    }
    /**
     * Apply a multiplication to the element of this trio specified by `position`.
     * This method will update the internal elements of this triple by multiplying
     * the given argument to the one at the desired position, then returns `this`
     * @param {number} operand the number to be multiplied to the **second** element of this triple
     * @param {TriplePosition} position the position
     * @returns {NumberTrio} this trio
     */
    applyMulTo(operand, position) {
        this.set(this.get(position) + operand, position);
        return this;
    }
    applyDiv(operand1, operand2, operand3) {
        if (operand1 === 0) {
            throw new illegal_argument_exception_1.IllegalArgumentException('the first operand is 0: impossible to divide by 0');
        }
        if (operand2 === 0) {
            throw new illegal_argument_exception_1.IllegalArgumentException('the second operand is 0: impossible to divide by 0');
        }
        if (operand3 === 0) {
            throw new illegal_argument_exception_1.IllegalArgumentException('the third operand is 0: impossible to divide by 0');
        }
        if (operand2 == undefined) {
            operand2 = operand1;
            operand3 = operand1;
        }
        this.setFirst(this.getFirst() / operand1);
        this.setSecond(this.getSecond() / operand2);
        this.setThird(this.getThird() / operand3);
        return this;
    }
    /**
     * Apply a division to the **first** element of this trio.
     * This method will update the internal elements of this triple by dividing
     * the first one by the argument of this method, then returns `this`
     * @param {number} operand the divisor for the **first** element of this triple
     * @returns {NumberTrio} this trio
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
     * Apply a division to the **second** element of this trio.
     * This method will update the internal elements of this triple by dividing
     * the second one by the argument of this method, then returns `this`
     * @param {number} operand the divisor for the **second** element of this triple
     * @returns {NumberTrio} this trio
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
     * Apply a division to the **third** element of this trio.
     * This method will update the internal elements of this triple by dividing
     * the third one by the argument of this method, then returns `this`
     * @param {number} operand the divisor for the **third** element of this triple
     * @returns {NumberTrio} this trio
     * @throws {IllegalArgumentException} if the operand is `0`
     */
    applyDivToThird(operand) {
        if (operand === 0) {
            throw new illegal_argument_exception_1.IllegalArgumentException('the divisor is 0: impossible to divide by 0');
        }
        this.setThird(this.getThird() / operand);
        return this;
    }
    /**
     * Apply a division to the element of this trio specified by `position`.
     * This method will update the internal elements of this triple by dividing
     * the desired one by the argument of this method, then returns `this`
     * @param {number} operand the divisor for the desired element of this triple
     * @param {TriplePosition} position the position
     * @returns {NumberTrio} this trio
     * @throws {IllegalArgumentException} if the operand is `0`
     */
    applyDivTo(operand, position) {
        if (operand === 0) {
            throw new illegal_argument_exception_1.IllegalArgumentException('the divisor is 0: impossible to divide by 0');
        }
        this.set(this.get(position) / operand, position);
        return this;
    }
    applySimpleOperator(operator1, operator2, operator3) {
        if (operator2 == undefined) {
            operator2 = operator1;
            operator3 = operator1;
        }
        this.setFirst(operator1(this.getFirst()));
        this.setSecond(operator2(this.getSecond()));
        this.setThird(operator3(this.getThird()));
        return this;
    }
    applyOperator(operator1, operator2, operator3, ...args) {
        if (operator2 == undefined) {
            operator2 = operator1;
            operator3 = operator1;
        }
        this.setFirst(operator1(this.getFirst(), ...args));
        this.setSecond(operator2(this.getSecond(), ...args));
        this.setThird(operator3(this.getThird(), ...args));
        return this;
    }
    /**
     * Applies a simple operator to the **first** element of this triple.
     * This method will update the internal element of this triple by applying `operand`
     * to the first element of this triple.
     * Notice that the operand is simple because it only takes a number and returns the result
     * @param {NumericOperator} operator the simple operator function
     * @returns this trio
     */
    applySimpleOperatorToFirst(operator) {
        this.setFirst(operator(this.getFirst()));
        return this;
    }
    /**
     * Applies a simple operator to the **second** element of this triple.
     * This method will update the internal element of this triple by applying `operand`
     * to the second element of this triple.
     * Notice that the operand is simple because it only takes a number and returns the result
     * @param {NumericOperator} operator the simple operator function
     * @returns this trio
     */
    applySimpleOperatorToSecond(operator) {
        this.setSecond(operator(this.getSecond()));
        return this;
    }
    /**
     * Applies a simple operator to the **third** element of this triple.
     * This method will update the internal element of this triple by applying `operand`
     * to the third element of this triple.
     * Notice that the operand is simple because it only takes a number and returns the result
     * @param {NumericOperator} operator the simple operator function
     * @returns this trio
     */
    applySimpleOperatorToThird(operator) {
        this.setThird(operator(this.getThird()));
        return this;
    }
    /**
     * Applies a simple operator to the element of this triple specified by `position`.
     * This method will update the internal element of this triple by applying `operand`
     * to the desired element of this triple.
     * Notice that the operand is simple because it only takes a number and returns the result
     * @param {NumericOperator} operator the simple operator function
     * @param {TriplePosition} position the position
     * @returns this trio
     */
    applySimpleOperatorTo(operator, position) {
        this.set(operator(this.get(position)), position);
        return this;
    }
    /**
     * Applies a simple operator to the **first** element of this triple.
     * This method will update the internal element of this triple by applying `operand`
     * to the first element of this triple
     * @param {NumericOperator} operator the simple operator function
     * @param {...any} args the arguments to be passed to the operator
     * @returns this trio
     */
    applyOperatorToFirst(operator, ...args) {
        this.setFirst(operator(this.getFirst(), ...args));
        return this;
    }
    /**
     * Applies a simple operator to the **second** element of this triple.
     * This method will update the internal element of this triple by applying `operand`
     * to the second element of this triple
     * @param {NumericOperator} operator the simple operator function
     * @param {...any} args the arguments to be passed to the operator
     * @returns this trio
     */
    applyOperatorToSecond(operator, ...args) {
        this.setSecond(operator(this.getSecond(), ...args));
        return this;
    }
    /**
     * Applies a simple operator to the **third** element of this triple.
     * This method will update the internal element of this triple by applying `operand`
     * to the third element of this triple
     * @param {NumericOperator} operator the simple operator function
     * @param {...any} args the arguments to be passed to the operator
     * @returns this trio
     */
    applyOperatorToThird(operator, ...args) {
        this.setThird(operator(this.getThird(), ...args));
        return this;
    }
    /**
     * Applies a simple operator to the element of this triple specified by `position`.
     * This method will update the internal element of this triple by applying `operand`
     * to the desired element of this triple
     * @param {NumericOperator} operator the simple operator function
     * @param {TriplePosition} position the position
     * @param {...any} args the arguments to be passed to the operator
     * @returns this trio
     */
    applyOperatorTo(operator, position, ...args) {
        this.set(operator(this.get(position), ...args), position);
        return this;
    }
    add(operand1, operand2, operand3) {
        if (operand2 == undefined) {
            operand2 = operand1;
            operand3 = operand1;
        }
        return new NumberTrio(this.getFirst() + operand1, this.getSecond() + operand2, this.getThird() + operand3);
    }
    /**
     * Adds the given `operand` to the **first** element of this trio returning the result.
     * **This method is different from `applyAddToFirst()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand the number to be added to the first element of this triple
     * @returns {NumberTrio} the trio that contains the result
     */
    addToFirst(operand) {
        return new NumberTrio(this.getFirst() + operand, this.getSecond(), this.getThird());
    }
    /**
     * Adds the given `operand` to the **second** element of this trio returning the result.
     * **This method is different from `applyAddToSecond()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand the number to be added to the second element of this triple
     * @returns {NumberTrio} the trio that contains the result
     */
    addToSecond(operand) {
        return new NumberTrio(this.getFirst(), this.getSecond() + operand, this.getThird());
    }
    /**
     * Adds the given `operand` to the **third** element of this trio returning the result.
     * **This method is different from `applyAddToThird()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand the number to be added to the third element of this triple
     * @returns {NumberTrio} the trio that contains the result
     */
    addToThird(operand) {
        return new NumberTrio(this.getFirst(), this.getSecond(), this.getThird() + operand);
    }
    /**
     * Adds the given `operand` to the element of this trio at the specified position, returning the result.
     * **This method is different from `applyAddTo()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand the number to be added to the second element of this triple
     * @param {TriplePosition} position the position
     * @returns {NumberTrio} the trio that contains the result
     */
    addTo(operand, position) {
        switch (position) {
            case triple_1.TriplePosition.FIRST: return new NumberTrio(this.getFirst() + operand, this.getSecond(), this.getThird());
            case triple_1.TriplePosition.SECOND: return new NumberTrio(this.getFirst(), this.getSecond() + operand, this.getThird());
            case triple_1.TriplePosition.THIRD: return new NumberTrio(this.getFirst(), this.getSecond(), this.getThird() + operand);
        }
    }
    sub(operand1, operand2, operand3) {
        if (operand2 == undefined) {
            operand2 = operand1;
            operand3 = operand1;
        }
        return new NumberTrio(this.getFirst() - operand1, this.getSecond() - operand2, this.getThird() - operand3);
    }
    /**
     * Subtracts the given `operand` from the **first** element of this trio returning the result.
     * **This method is different from `applySubtractFromFirst()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand the number to be subtracted from the first element of this triple
     * @returns {NumberTrio} the trio that contains the result
     */
    subFromFirst(operand) {
        return new NumberTrio(this.getFirst() - operand, this.getSecond(), this.getThird());
    }
    /**
     * Subtracts the given `operand` from the **second** element of this trio returning the result.
     * **This method is different from `applySubtractSecond()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand the number to be subtracted from the second element of this triple
     * @returns {NumberTrio} the trio that contains the result
     */
    subFromSecond(operand) {
        return new NumberTrio(this.getFirst(), this.getSecond() - operand, this.getThird());
    }
    /**
     * Subtracts the given `operand` from the **third** element of this trio returning the result.
     * **This method is different from `applySubtractThird()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand the number to be subtracted from the third element of this triple
     * @returns {NumberTrio} the trio that contains the result
     */
    subFromThird(operand) {
        return new NumberTrio(this.getFirst(), this.getSecond(), this.getThird() - operand);
    }
    /**
     * Subtracts the given `operand` from the element of this trio at the specified position, returning the result.
     * **This method is different from `applySubFrom()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand the number to be subtracted from the desired element of this triple
     * @param {TriplePosition} position the position
     * @returns {NumberTrio} the trio that contains the result
     */
    subFrom(operand, position) {
        switch (position) {
            case triple_1.TriplePosition.FIRST: return new NumberTrio(this.getFirst() - operand, this.getSecond(), this.getThird());
            case triple_1.TriplePosition.SECOND: return new NumberTrio(this.getFirst(), this.getSecond() - operand, this.getThird());
            case triple_1.TriplePosition.THIRD: return new NumberTrio(this.getFirst(), this.getSecond(), this.getThird() - operand);
        }
    }
    mul(operand1, operand2, operand3) {
        if (operand2 == undefined) {
            operand2 = operand1;
            operand3 = operand1;
        }
        return new NumberTrio(this.getFirst() * operand1, this.getSecond() * operand2, this.getThird() * operand3);
    }
    /**
     * Multiply the given `operand` to the **first** element of this trio returning the result.
     * **This method is different from `applyMulToFirst()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand the number to be multiplied to the first element of this triple
     * @returns {NumberTrio} the trio that contains the result
     */
    mulToFirst(operand) {
        return new NumberTrio(this.getFirst() * operand, this.getSecond(), this.getThird());
    }
    /**
     * Multiply the given `operand` to the **second** element of this trio returning the result.
     * **This method is different from `applyMulToSecond()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand the number to be multiplied to the second element of this triple
     * @returns {NumberTrio} the trio that contains the result
     */
    mulToSecond(operand) {
        return new NumberTrio(this.getFirst(), this.getSecond() * operand, this.getThird());
    }
    /**
     * Multiply the given `operand` to the **third** element of this trio returning the result.
     * **This method is different from `applyMulToThird()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand the number to be multiplied to the third element of this triple
     * @returns {NumberTrio} the trio that contains the result
     */
    mulToThird(operand) {
        return new NumberTrio(this.getFirst(), this.getSecond(), this.getThird() * operand);
    }
    /**
     * Multiply the given `operand` to the element of this trio returning the result.
     * **This method is different from `applyMulToFirst()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand the number to be multiplied to the first element of this triple
     * @param {position} position the position
     * @returns {NumberTrio} the trio that contains the result
     */
    mulTo(operand, position) {
        switch (position) {
            case triple_1.TriplePosition.FIRST: return new NumberTrio(this.getFirst() * operand, this.getSecond(), this.getThird());
            case triple_1.TriplePosition.SECOND: return new NumberTrio(this.getFirst(), this.getSecond() * operand, this.getThird());
            case triple_1.TriplePosition.THIRD: return new NumberTrio(this.getFirst(), this.getSecond(), this.getThird() * operand);
        }
    }
    div(operand1, operand2, operand3) {
        if (operand1 === 0) {
            throw new illegal_argument_exception_1.IllegalArgumentException('the first operand is 0: impossible to divide by 0');
        }
        if (operand2 === 0) {
            throw new illegal_argument_exception_1.IllegalArgumentException('the second operand is 0: impossible to divide by 0');
        }
        if (operand3 === 0) {
            throw new illegal_argument_exception_1.IllegalArgumentException('the third operand is 0: impossible to divide by 0');
        }
        if (operand2 == undefined) {
            operand2 = operand1;
            operand3 = operand1;
        }
        return new NumberTrio(this.getFirst() / operand1, this.getSecond() / operand2, this.getThird() / operand3);
    }
    /**
     * Divide the **first** element of this trio by the given `operand`, returning the result.
     * **This method is different from `applyDivToFirst()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand the divisor for the first element of this triple
     * @returns {NumberTrio} the trio that contains the result
     * @throws {IllegalArgumentException} if the operand is `0`
     */
    divFromFirst(operand) {
        if (operand === 0) {
            throw new illegal_argument_exception_1.IllegalArgumentException('the divisor is 0: impossible to divide by 0');
        }
        return new NumberTrio(this.getFirst() / operand, this.getSecond(), this.getThird());
    }
    /**
     * Divide the **second** element of this trio by the given `operand`, returning the result.
     * **This method is different from `applyDivToSecond()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand the divisor for the second element of this triple
     * @returns {NumberTrio} the trio that contains the result
     * @throws {IllegalArgumentException} if the operand is `0`
     */
    divFromSecond(operand) {
        if (operand === 0) {
            throw new illegal_argument_exception_1.IllegalArgumentException('the divisor is 0: impossible to divide by 0');
        }
        return new NumberTrio(this.getFirst(), this.getSecond() / operand, this.getThird());
    }
    /**
     * Divide the **third** element of this trio by the given `operand`, returning the result.
     * **This method is different from `applyDivToThird()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand the divisor for the third element of this triple
     * @returns {NumberTrio} the trio that contains the result
     * @throws {IllegalArgumentException} if the operand is `0`
     */
    divFromThird(operand) {
        if (operand === 0) {
            throw new illegal_argument_exception_1.IllegalArgumentException('the divisor is 0: impossible to divide by 0');
        }
        return new NumberTrio(this.getFirst(), this.getSecond(), this.getThird() / operand);
    }
    /**
     * Divide the element of this trio at the specified position by the given `operand`, returning the result.
     * **This method is different from `applyDivToSecond()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand the divisor for the desired element of this triple
     * @param {TriplePosition} position the position
     * @returns {NumberTrio} the trio that contains the result
     * @throws {IllegalArgumentException} if the operand is `0`
     */
    divFrom(operand, position) {
        if (operand === 0) {
            throw new illegal_argument_exception_1.IllegalArgumentException('the divisor is 0: impossible to divide by 0');
        }
        switch (position) {
            case triple_1.TriplePosition.FIRST: return new NumberTrio(this.getFirst() / operand, this.getSecond(), this.getThird());
            case triple_1.TriplePosition.SECOND: return new NumberTrio(this.getFirst(), this.getSecond() / operand, this.getThird());
            case triple_1.TriplePosition.THIRD: return new NumberTrio(this.getFirst(), this.getSecond(), this.getThird() / operand);
        }
    }
    simpleOperator(operator1, operator2, operator3) {
        if (operator2 == undefined) {
            operator2 = operator1;
            operator3 = operator1;
        }
        return new NumberTrio(operator1(this.getFirst()), operator2(this.getSecond()), operator3(this.getThird()));
    }
    operator(operator1, operator2, operator3, ...args) {
        if (operator2 == undefined) {
            operator2 = operator1;
            operator3 = operator1;
        }
        return new NumberTrio(operator1(this.getFirst(), ...args), operator2(this.getSecond(), ...args), operator3(this.getThird(), ...args));
    }
    /**
     * Executes a simple operator with the **first** element of this triple.
     * **This method is different from `applySimpleOperatorToFirst()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {NumericOperator} operator the simple operator function
     * @returns {NumberTrio} the trio that contains the result
     */
    simpleOperatorToFirst(operator) {
        return new NumberTrio(operator(this.getFirst()), this.getSecond(), this.getThird());
    }
    /**
     * Executes a simple operator with the **second** element of this triple.
     * **This method is different from `applySimpleOperatorToSecond()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {NumericOperator} operator the simple operator function
     * @returns {NumberTrio} the trio that contains the result
     */
    simpleOperatorToSecond(operator) {
        return new NumberTrio(this.getFirst(), operator(this.getSecond()), this.getThird());
    }
    /**
     * Executes a simple operator with the **third** element of this triple.
     * **This method is different from `applySimpleOperatorToThird()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {NumericOperator} operator the simple operator function
     * @returns {NumberTrio} the trio that contains the result
     */
    simpleOperatorToThird(operator) {
        return new NumberTrio(this.getFirst(), this.getSecond(), operator(this.getThird()));
    }
    /**
     * Executes a simple operator with the element of this triple at the specified position.
     * **This method is different from `applySimpleOperatorTo()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {NumericOperator} operator the simple operator function
     * @param {TriplePosition} position the position
     * @returns {NumberTrio} the trio that contains the result
     */
    simpleOperatorTo(operator, position) {
        switch (position) {
            case triple_1.TriplePosition.FIRST: return new NumberTrio(operator(this.getFirst()), this.getSecond(), this.getThird());
            case triple_1.TriplePosition.SECOND: return new NumberTrio(this.getFirst(), operator(this.getSecond()), this.getThird());
            case triple_1.TriplePosition.THIRD: return new NumberTrio(this.getFirst(), this.getSecond(), operator(this.getThird()));
        }
    }
    /**
     * Executes an operator with the **first** element of this triple.
     * **This method is different from `applySimpleOperatorToFirst()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {NumericOperator} operator the simple operator function
     * @param {...any} args the arguments to be passed to the operator
     * @returns {NumberTrio} the trio that contains the result
     */
    operatorToFirst(operator, ...args) {
        return new NumberTrio(operator(this.getFirst(), ...args), this.getSecond(), this.getThird());
    }
    /**
     * Executes an operator with the **second** element of this triple.
     * **This method is different from `applySimpleOperatorToFirst()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {NumericOperator} operator the simple operator function
     * @param {...any} args the arguments to be passed to the operator
     * @returns {NumberTrio} the trio that contains the result
     */
    operatorToSecond(operator, ...args) {
        return new NumberTrio(this.getFirst(), operator(this.getSecond(), ...args), this.getThird());
    }
    /**
     * Executes an operator with the **third** element of this triple.
     * **This method is different from `applySimpleOperatorToThird()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {NumericOperator} operator the simple operator function
     * @param {...any} args the arguments to be passed to the operator
     * @returns {NumberTrio} the trio that contains the result
     */
    operatorToThird(operator, ...args) {
        return new NumberTrio(this.getFirst(), this.getSecond(), operator(this.getThird(), ...args));
    }
    /**
     * Executes an operator with the element of this triple at the specified position.
     * **This method is different from `applySimpleOperatorTo()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {NumericOperator} operator the simple operator function
     * @param {TriplePosition} position the position
     * @param {...any} args the arguments to be passed to the operator
     * @returns {NumberTrio} the trio that contains the result
     */
    operatorTo(operator, position, ...args) {
        switch (position) {
            case triple_1.TriplePosition.FIRST: return new NumberTrio(operator(this.getFirst(), ...args), this.getSecond(), this.getThird());
            case triple_1.TriplePosition.SECOND: return new NumberTrio(this.getFirst(), operator(this.getSecond(), ...args), this.getThird());
            case triple_1.TriplePosition.THIRD: return new NumberTrio(this.getFirst(), this.getSecond(), operator(this.getThird(), ...args));
        }
    }
    clone() {
        return new NumberTrio(this.getFirst(), this.getSecond(), this.getThird());
    }
}
exports.NumberTrio = NumberTrio;
/**
 * Creates and returns a new trio of numbers
 * @param {number} number1 the first number
 * @param {number} number2 the second number
 * @param {number} number3 the third number
 */
function numberTrio(number1, number2, number3) {
    return new NumberTrio(number1, number2, number3);
}
exports.numberTrio = numberTrio;
//# sourceMappingURL=number-trio.js.map