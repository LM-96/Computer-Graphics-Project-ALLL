import {IllegalArgumentException} from "../exceptions/illegal-argument-exception";
import {NumericOperator} from "./numeric-operator";
import {Triple, TriplePosition} from "../triple";
import {Cloneable} from "../cloneable";
import {NumberCouple} from "./number-couple";

export class NumberTrio extends Triple<number, number, number> implements Cloneable<NumberTrio>{

    constructor(number1: number, number2: number, number3: number) {
        super(number1, number2, number3);
    }

    /**
     * Apply an addition to this trio of numbers.
     * This method will update the internal elements of this triple by adding
     * the given argument to them, then returns `this`
     * @param {number} operand the number to be added to each number of this triple
     * @returns {NumberTrio} this trio
     */
    applyAdd(operand: number): NumberTrio
    /**
     * Apply an addition to this trio of numbers.
     * This method will update the internal elements of this triple by adding
     * `operand1` to the first number, `operand2` to the second one and `operand3 to
     * the third one, then returns `this`
     * @param {number} operand1 the number to add to the **first** element of this triple
     * @param {number} operand2 the number to add to the **second** element of this triple
     * @param {number} operand3 the number to add to the **third** element of this triple
     * @returns {NumberTrio} this trio
     */
    applyAdd(operand1: number, operand2: number, operand3: number): NumberTrio
    applyAdd(operand1: number, operand2?: number, operand3?: number): NumberTrio{
        if(operand2 == undefined) {
            operand2 = operand1
            operand3 = operand1
        }
        this.setFirst(this.getSecond() + operand1)
        this.setSecond(this.getSecond() + operand2)
        this.setThird(this.getThird() + operand3)
        return this
    }

    /**
     * Apply an addition to the **first** element of this trio.
     * This method will update the internal elements of this triple by adding
     * the given argument to the first one, then returns `this`
     * @param {number} operand the number to be added to the **first** element of this triple
     * @returns {NumberTrio} this trio
     */
    applyAddToFirst(operand: number): NumberTrio {
        this.setFirst(this.getFirst() + operand)
        return this
    }

    /**
     * Apply an addition to the **second** element of this trio.
     * This method will update the internal elements of this triple by adding
     * the given argument to the second one, then returns `this`
     * @param {number} operand the number to be added to the **second** element of this triple
     * @returns {NumberTrio} this trio
     */
    applyAddToSecond(operand: number): NumberTrio {
        this.setSecond(this.getSecond() + operand)
        return this
    }

    /**
     * Apply an addition to the **third** element of this trio.
     * This method will update the internal elements of this triple by adding
     * the given argument to the third one, then returns `this`
     * @param {number} operand the number to be added to the **third** element of this triple
     * @returns {NumberTrio} this trio
     */
    applyAddToThird(operand: number): NumberTrio {
        this.setThird(this.getThird() + operand)
        return this
    }

    /**
     * Apply an addition to the element of this trio specified by the `position` parameter.
     * This method will update the internal elements of this triple by adding
     * the given argument to the desired one, then returns `this`
     * @param {number} operand the number to be added to the desired element of this triple
     * @param {TriplePosition} position the position
     * @returns {NumberTrio} this trio
     */
    applyAddTo(operand: number, position: TriplePosition): NumberTrio {
        this.set(this.get(position) + operand, position)
        return this
    }

    /**
     * Apply a subtraction to this trio of numbers.
     * This method will update the internal elements of this triple by subtracting
     * the given argument from them, then returns `this`
     * @param {number} operand the number to be subtracted from each number of this triple
     * @returns {NumberTrio} this trio
     */
    applySub(operand: number): NumberTrio
    /**
     * Apply a subtraction to this trio of numbers.
     * This method will update the internal elements of this triple by subtracting
     * `operand1` from the first number, `operand2` from the second one and `operand3` from the third
     * one, then returns `this`
     * @param {number} operand1 the number to subtracted from the **first** element of this triple
     * @param {number} operand2 the number to be subtracted from the **second** element of this triple
     * @param {number} operand3 the number to be subtracted from the **third** element of this triple
     * @returns {NumberTrio} this trio
     */
    applySub(operand1: number, operand2: number, operand3: number): NumberTrio
    applySub(operand1: number, operand2?: number, operand3?: number): NumberTrio{
        if(operand2 == undefined) {
            operand2 = operand1
            operand3 = operand1
        }
        this.setFirst(this.getFirst() - operand1)
        this.setSecond(this.getSecond() - operand2)
        this.setThird(this.getThird() - operand3)
        return this
    }

    /**
     * Apply a subtraction to the **first** element of this trio.
     * This method will update the internal elements of this triple by subtracting
     * the given argument from the first one, then returns `this`
     * @param {number} operand the number to be subtracted from the **first** element of this triple
     * @returns {NumberTrio} this trio
     */
    applySubFromFirst(operand: number): NumberTrio {
        this.setFirst(this.getFirst() - operand)
        return this
    }

    /**
     * Apply a subtraction to the **second** element of this trio.
     * This method will update the internal elements of this triple by subtracting
     * the given argument from the second one, then returns `this`
     * @param {number} operand the number to be subtracted from the **second** element of this triple
     * @returns {NumberTrio} this trio
     */
    applySubFromSecond(operand: number): NumberTrio {
        this.setSecond(this.getSecond() - operand)
        return this
    }

    /**
     * Apply a subtraction to the **third** element of this trio.
     * This method will update the internal elements of this triple by subtracting
     * the given argument from the third one, then returns `this`
     * @param {number} operand the number to be subtracted from the **third** element of this triple
     * @returns {NumberTrio} this trio
     */
    applySubFromThird(operand: number): NumberTrio {
        this.setThird(this.getThird() - operand)
        return this
    }

    /**
     * Apply a subtraction to the element of this trio specified by `position`.
     * This method will update the internal elements of this triple by subtracting
     * the given argument from the desired one, then returns `this`
     * @param {number} operand the number to be subtracted
     * @param {TriplePosition} position the position
     * @returns {NumberTrio} this trio
     */
    applySubFrom(operand: number, position: TriplePosition): NumberTrio {
        this.set(this.get(position) - operand, position)
        return this
    }

    /**
     * Apply a multiplication to this trio of numbers.
     * This method will update the internal elements of this triple by multiplying
     * the given argument to them, then returns `this`
     * @param {number} operand the number to be multiplied each number of this triple
     * @returns {NumberTrio} this trio
     */
    applyMul(operand: number): NumberTrio
    /**
     * Apply a multiplication to this trio of numbers.
     * This method will update the internal elements of this triple by multiplying
     * `operand1` to the first number, `operand2` to the second one and `operand` to the third one, then
     * returns `this`
     * @param {number} operand1 the number to be multiplied to the **first** element of this triple
     * @param {number} operand2 the number to be multiplied to the **second** element of this triple
     * @param {number} operand3 the number to be multiplied to the **third** element of this triple
     * @returns {NumberTrio} this trio
     */
    applyMul(operand1: number, operand2: number, operand3: number): NumberTrio
    applyMul(operand1: number, operand2?: number, operand3?: number): NumberTrio{
        if(operand2 == undefined) {
            operand2 = operand1
            operand3 = operand1
        }
        this.setFirst(this.getFirst() * operand1)
        this.setSecond(this.getSecond() * operand2)
        this.setThird(this.getThird() * operand3)
        return this
    }

    /**
     * Apply a multiplication to the **first** element of this trio.
     * This method will update the internal elements of this triple by multiplying
     * the given argument to the first one, then returns `this`
     * @param {number} operand the number to be multiplied to the **first** element of this triple
     * @returns {NumberTrio} this trio
     */
    applyMulToFirst(operand: number): NumberTrio {
        this.setFirst(this.getFirst() + operand)
        return this
    }

    /**
     * Apply a multiplication to the **second** element of this trio.
     * This method will update the internal elements of this triple by multiplying
     * the given argument to the second one, then returns `this`
     * @param {number} operand the number to be multiplied to the **second** element of this triple
     * @returns {NumberTrio} this trio
     */
    applyMulToSecond(operand: number): NumberTrio {
        this.setSecond(this.getSecond() + operand)
        return this
    }

    /**
     * Apply a multiplication to the **third** element of this trio.
     * This method will update the internal elements of this triple by multiplying
     * the given argument to the second one, then returns `this`
     * @param {number} operand the number to be multiplied to the **third** element of this triple
     * @returns {NumberTrio} this trio
     */
    applyMulToThird(operand: number): NumberTrio {
        this.setThird(this.getThird() + operand)
        return this
    }

    /**
     * Apply a multiplication to the element of this trio specified by `position`.
     * This method will update the internal elements of this triple by multiplying
     * the given argument to the one at the desired position, then returns `this`
     * @param {number} operand the number to be multiplied to the **second** element of this triple
     * @param {TriplePosition} position the position
     * @returns {NumberTrio} this trio
     */
    applyMulTo(operand: number, position: TriplePosition): NumberTrio {
        this.set(this.get(position) + operand, position)
        return this
    }

    /**
     * Apply a multiplication to this trio of numbers.
     * This method will update the internal elements of this triple by multiplying
     * the given argument to them, then returns `this`
     * @param {number} operand the number to be multiplied each number of this triple
     * @returns {NumberTrio} this trio
     */
    applyDiv(operand: number): NumberTrio
    /**
     * Apply a division to this trio of numbers.
     * This method will update the internal elements of this triple by dividing them by
     * `operand1` for the first number, `operand2` for the second one and `operand3` for the third one, then
     * returns `this`
     * @param {number} operand1 the divisor of the **first** element of this triple
     * @param {number} operand2 the divisor of the **second** element of this triple
     * @param {number} operand3 the divisor of the **third** element of this triple
     * @returns {NumberTrio} this trio
     * @throws {IllegalArgumentException} if one divisor is `0`
     */
    applyDiv(operand1: number, operand2: number, operand3: number): NumberTrio
    applyDiv(operand1: number, operand2?: number, operand3?: number): NumberTrio{
        if(operand1 === 0) {
            throw new IllegalArgumentException('the first operand is 0: impossible to divide by 0')
        }
        if(operand2 === 0) {
            throw new IllegalArgumentException('the second operand is 0: impossible to divide by 0')
        }
        if(operand3 === 0) {
            throw new IllegalArgumentException('the third operand is 0: impossible to divide by 0')
        }

        if(operand2 == undefined) {
            operand2 = operand1
            operand3 = operand1
        }
        this.setFirst(this.getFirst() / operand1)
        this.setSecond(this.getSecond() / operand2)
        this.setThird(this.getThird() / operand3)
        return this
    }

    /**
     * Apply a division to the **first** element of this trio.
     * This method will update the internal elements of this triple by dividing
     * the first one by the argument of this method, then returns `this`
     * @param {number} operand the divisor for the **first** element of this triple
     * @returns {NumberTrio} this trio
     * @throws {IllegalArgumentException} if the operand is `0`
     */
    applyDivToFirst(operand: number): NumberTrio {
        if(operand === 0) {
            throw new IllegalArgumentException('the divisor is 0: impossible to divide by 0')
        }
        this.setFirst(this.getFirst() / operand)
        return this
    }

    /**
     * Apply a division to the **second** element of this trio.
     * This method will update the internal elements of this triple by dividing
     * the second one by the argument of this method, then returns `this`
     * @param {number} operand the divisor for the **second** element of this triple
     * @returns {NumberTrio} this trio
     * @throws {IllegalArgumentException} if the operand is `0`
     */
    applyDivToSecond(operand: number): NumberTrio {
        if(operand === 0) {
            throw new IllegalArgumentException('the divisor is 0: impossible to divide by 0')
        }
        this.setSecond(this.getSecond() / operand)
        return this
    }

    /**
     * Apply a division to the **third** element of this trio.
     * This method will update the internal elements of this triple by dividing
     * the third one by the argument of this method, then returns `this`
     * @param {number} operand the divisor for the **third** element of this triple
     * @returns {NumberTrio} this trio
     * @throws {IllegalArgumentException} if the operand is `0`
     */
    applyDivToThird(operand: number): NumberTrio {
        if(operand === 0) {
            throw new IllegalArgumentException('the divisor is 0: impossible to divide by 0')
        }
        this.setThird(this.getThird() / operand)
        return this
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
    applyDivTo(operand: number, position: TriplePosition): NumberTrio {
        if(operand === 0) {
            throw new IllegalArgumentException('the divisor is 0: impossible to divide by 0')
        }
        this.set(this.get(position) / operand, position)
        return this
    }

    /**
     * Applies a simple operand to each element of this triple.
     * This method will update the internal elements of this triple by applying `operand`
     * to each element of this triple.
     * Notice that the operand is simple because it only takes a number and returns the result
     * @param {NumericOperator} operator the simple operator function
     * @returns this trio
     */
    applySimpleOperator(operator: NumericOperator): NumberTrio
    /**
     * Applies `operator1` to the first element of this triple, `operator2` to the second one
     * and `operator3` to the third.
     * This method will update the internal elements of this triple by applying the two operators on the
     * element of this triple.
     * Notice that the operand is simple because it only takes a number and returns the result
     * @param {NumericOperator} operator1 the simple operator function for the first element
     * @param {NumericOperator} operator2 the simple operator function for the second element
     * @param {NumericOperator} operator3 the simple operator function for the third element
     * @returns this trio
     */
    applySimpleOperator(operator1: NumericOperator, operator2: NumericOperator, operator3: NumericOperator): NumberTrio
    applySimpleOperator(operator1: NumericOperator, operator2?: NumericOperator, operator3?: NumericOperator): NumberTrio {
        if(operator2 == undefined) {
            operator2 = operator1
            operator3 = operator1
        }
        this.setFirst(operator1(this.getFirst()))
        this.setSecond(operator2(this.getSecond()))
        this.setThird(operator3(this.getThird()))
        return this
    }

    /**
     * Applies a simple operator to each element of this triple.
     * This method will update the internal elements of this triple by applying `operator`
     * to each element of this triple.
     * @param {NumericOperator} operator the simple operator function
     * @param {...any} args the arguments to be passed to the operator
     * @returns this trio
     */
    applyOperator(operator: NumericOperator, ...args: any): NumberTrio
    /**
     * Applies `operator1` to the first element of this triple, `operator2` to the second one
     * and `operator3` to the third.
     * This method will update the internal elements of this triple by applying the two operators on the
     * element of this triple.
     * Notice that the operand is simple because it only takes a number and returns the result
     * @param {NumericOperator} operator1 the simple operator function for the first element
     * @param {NumericOperator} operator2 the simple operator function for the second element
     * @param {NumericOperator} operator3 the simple operator function for the third element
     * @param {...any} args the arguments to be passed to the operator
     */
    applyOperator(operator1: NumericOperator, operator2: NumericOperator,
                  operator3: NumericOperator, ...args: any): NumberTrio
    applyOperator(operator1: NumericOperator, operator2?: NumericOperator,
                  operator3?: NumericOperator, ...args: any): NumberTrio {
        if(operator2 == undefined) {
            operator2 = operator1
            operator3 = operator1
        }
        this.setFirst(operator1(this.getFirst(), ...args))
        this.setSecond(operator2(this.getSecond(), ...args))
        this.setThird(operator3(this.getThird(), ...args))
        return this
    }

    /**
     * Applies a simple operator to the **first** element of this triple.
     * This method will update the internal element of this triple by applying `operand`
     * to the first element of this triple.
     * Notice that the operand is simple because it only takes a number and returns the result
     * @param {NumericOperator} operator the simple operator function
     * @returns this trio
     */
    applySimpleOperatorToFirst(operator: NumericOperator): NumberTrio {
        this.setFirst(operator(this.getFirst()))
        return this
    }

    /**
     * Applies a simple operator to the **second** element of this triple.
     * This method will update the internal element of this triple by applying `operand`
     * to the second element of this triple.
     * Notice that the operand is simple because it only takes a number and returns the result
     * @param {NumericOperator} operator the simple operator function
     * @returns this trio
     */
    applySimpleOperatorToSecond(operator: NumericOperator): NumberTrio {
        this.setSecond(operator(this.getSecond()))
        return this
    }

    /**
     * Applies a simple operator to the **third** element of this triple.
     * This method will update the internal element of this triple by applying `operand`
     * to the third element of this triple.
     * Notice that the operand is simple because it only takes a number and returns the result
     * @param {NumericOperator} operator the simple operator function
     * @returns this trio
     */
    applySimpleOperatorToThird(operator: NumericOperator): NumberTrio {
        this.setThird(operator(this.getThird()))
        return this
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
    applySimpleOperatorTo(operator: NumericOperator, position: TriplePosition): NumberTrio {
        this.set(operator(this.get(position)), position)
        return this
    }

    /**
     * Applies a simple operator to the **first** element of this triple.
     * This method will update the internal element of this triple by applying `operand`
     * to the first element of this triple
     * @param {NumericOperator} operator the simple operator function
     * @param {...any} args the arguments to be passed to the operator
     * @returns this trio
     */
    applyOperatorToFirst(operator: NumericOperator, ...args: any): NumberTrio {
        this.setFirst(operator(this.getFirst(), ...args))
        return this
    }

    /**
     * Applies a simple operator to the **second** element of this triple.
     * This method will update the internal element of this triple by applying `operand`
     * to the second element of this triple
     * @param {NumericOperator} operator the simple operator function
     * @param {...any} args the arguments to be passed to the operator
     * @returns this trio
     */
    applyOperatorToSecond(operator: NumericOperator, ...args: any): NumberTrio {
        this.setSecond(operator(this.getSecond(), ...args))
        return this
    }

    /**
     * Applies a simple operator to the **third** element of this triple.
     * This method will update the internal element of this triple by applying `operand`
     * to the third element of this triple
     * @param {NumericOperator} operator the simple operator function
     * @param {...any} args the arguments to be passed to the operator
     * @returns this trio
     */
    applyOperatorToThird(operator: NumericOperator, ...args: any): NumberTrio {
        this.setThird(operator(this.getThird(), ...args))
        return this
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
    applyOperatorTo(operator: NumericOperator, position: TriplePosition, ...args: any): NumberTrio {
        this.set(operator(this.get(position), ...args), position)
        return this
    }

    /**
     * Adds the given `operand` to each element of this trio returning the result.
     * **This method is different from `applyAdd()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand the number to be added to each number of this triple
     * @returns {NumberTrio} the trio that contains the result
     */
    add(operand: number): NumberTrio
    /**
     * Adds the given `operand1` to the first element of this trio, `operand2` to the
     * second one and `operand3` to the third, returning the result.
     * **This method is different from `applyAdd()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand1 the number to add to the **first** element of this triple
     * @param {number} operand2 the number to add to the **second** element of this triple
     * @param {number} operand3 the number to add to the **third** element of this triple
     * @returns {NumberTrio} the trio that contains the result
     */
    add(operand1: number, operand2: number, operand3: number): NumberTrio
    add(operand1: number, operand2?: number, operand3?: number): NumberTrio{
        if(operand2 == undefined) {
            operand2 = operand1
            operand3 = operand1
        }
        return new NumberTrio(this.getFirst() + operand1, this.getSecond() + operand2,
            this.getThird() + operand3)
    }

    /**
     * Adds the given `operand` to the **first** element of this trio returning the result.
     * **This method is different from `applyAddToFirst()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand the number to be added to the first element of this triple
     * @returns {NumberTrio} the trio that contains the result
     */
    addToFirst(operand: number): NumberTrio {
        return new NumberTrio(this.getFirst() + operand, this.getSecond(), this.getThird())
    }

    /**
     * Adds the given `operand` to the **second** element of this trio returning the result.
     * **This method is different from `applyAddToSecond()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand the number to be added to the second element of this triple
     * @returns {NumberTrio} the trio that contains the result
     */
    addToSecond(operand: number): NumberTrio {
        return new NumberTrio(this.getFirst(), this.getSecond() + operand, this.getThird())
    }

    /**
     * Adds the given `operand` to the **third** element of this trio returning the result.
     * **This method is different from `applyAddToThird()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand the number to be added to the third element of this triple
     * @returns {NumberTrio} the trio that contains the result
     */
    addToThird(operand: number): NumberTrio {
        return new NumberTrio(this.getFirst(), this.getSecond(), this.getThird() + operand)
    }

    /**
     * Adds the given `operand` to the element of this trio at the specified position, returning the result.
     * **This method is different from `applyAddTo()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand the number to be added to the second element of this triple
     * @param {TriplePosition} position the position
     * @returns {NumberTrio} the trio that contains the result
     */
    addTo(operand: number, position: TriplePosition): NumberTrio {
        switch (position) {
            case TriplePosition.FIRST: return new NumberTrio(this.getFirst() + operand,
                this.getSecond(), this.getThird())
            case TriplePosition.SECOND: return new NumberTrio(this.getFirst(),
                this.getSecond() + operand, this.getThird())
            case TriplePosition.THIRD: return new NumberTrio(this.getFirst(), this.getSecond(),
                this.getThird() + operand)
        }
    }

    /**
     * Subtracts the given `operand` from each element of this trio returning the result.
     * **This method is different from `applySub()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand the number to be subtracted from each number of this triple
     * @returns {NumberTrio} the trio that contains the result
     */
    sub(operand: number): NumberTrio
    /**
     * Subtracts the given `operand1` from the first element of this trio, `operand2` from the
     * second one and `operan3` from the third, returning the result.
     * **This method is different from `applySub()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand1 the number to add to the **first** element of this triple
     * @param {number} operand2 the number to add to the **second** element of this triple
     * @param {number} operand3 the number to add to the **third** element of this triple
     * @returns {NumberTrio} the trio that contains the result
     */
    sub(operand1: number, operand2: number, operand3: number): NumberTrio
    sub(operand1: number, operand2?: number, operand3?: number): NumberTrio{
        if(operand2 == undefined) {
            operand2 = operand1
            operand3 = operand1
        }
        return new NumberTrio(this.getFirst() - operand1, this.getSecond() - operand2,
            this.getThird() - operand3)
    }

    /**
     * Subtracts the given `operand` from the **first** element of this trio returning the result.
     * **This method is different from `applySubtractFromFirst()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand the number to be subtracted from the first element of this triple
     * @returns {NumberTrio} the trio that contains the result
     */
    subFromFirst(operand: number): NumberTrio {
        return new NumberTrio(this.getFirst() - operand, this.getSecond(), this.getThird())
    }

    /**
     * Subtracts the given `operand` from the **second** element of this trio returning the result.
     * **This method is different from `applySubtractSecond()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand the number to be subtracted from the second element of this triple
     * @returns {NumberTrio} the trio that contains the result
     */
    subFromSecond(operand: number): NumberTrio {
        return new NumberTrio(this.getFirst(), this.getSecond() - operand, this.getThird())
    }

    /**
     * Subtracts the given `operand` from the **third** element of this trio returning the result.
     * **This method is different from `applySubtractThird()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand the number to be subtracted from the third element of this triple
     * @returns {NumberTrio} the trio that contains the result
     */
    subFromThird(operand: number): NumberTrio {
        return new NumberTrio(this.getFirst(), this.getSecond(), this.getThird() - operand)
    }

    /**
     * Subtracts the given `operand` from the element of this trio at the specified position, returning the result.
     * **This method is different from `applySubFrom()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand the number to be subtracted from the desired element of this triple
     * @param {TriplePosition} position the position
     * @returns {NumberTrio} the trio that contains the result
     */
    subFrom(operand: number, position: TriplePosition): NumberTrio {
        switch (position) {
            case TriplePosition.FIRST: return new NumberTrio(this.getFirst() - operand,
                this.getSecond(), this.getThird())
            case TriplePosition.SECOND: return new NumberTrio(this.getFirst(),
                this.getSecond() - operand, this.getThird())
            case TriplePosition.THIRD: return new NumberTrio(this.getFirst(), this.getSecond(),
                this.getThird() - operand)
        }
    }

    /**
     * Multiplies the given `operand` to each element of this trio returning the result.
     * **This method is different from `applyMul()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand the number to be multiplied to each number of this triple
     * @returns {NumberTrio} the trio that contains the result
     */
    mul(operand: number): NumberTrio
    /**
     * Multiplies the given `operand1` to the first element of this trio, `operand2` to the
     * second one and `operand3` to the third returning the result.
     * **This method is different from `applyMul()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand1 the number to multiply to the **first** element of this triple
     * @param {number} operand2 the number to multiply to the **second** element of this triple
     * @param {number} operand3 the number to multiply to the **third** element of this triple
     * @returns {NumberTrio} the trio that contains the result
     */
    mul(operand1: number, operand2: number, operand3: number): NumberTrio
    mul(operand1: number, operand2?: number, operand3?: number): NumberTrio{
        if(operand2 == undefined) {
            operand2 = operand1
            operand3 = operand1
        }
        return new NumberTrio(this.getFirst() * operand1, this.getSecond() * operand2,
            this.getThird() * operand3)
    }

    /**
     * Multiply the given `operand` to the **first** element of this trio returning the result.
     * **This method is different from `applyMulToFirst()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand the number to be multiplied to the first element of this triple
     * @returns {NumberTrio} the trio that contains the result
     */
    mulToFirst(operand: number): NumberTrio {
        return new NumberTrio(this.getFirst() * operand, this.getSecond(), this.getThird())
    }

    /**
     * Multiply the given `operand` to the **second** element of this trio returning the result.
     * **This method is different from `applyMulToSecond()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand the number to be multiplied to the second element of this triple
     * @returns {NumberTrio} the trio that contains the result
     */
    mulToSecond(operand: number): NumberTrio {
        return new NumberTrio(this.getFirst(), this.getSecond() * operand, this.getThird())
    }

    /**
     * Multiply the given `operand` to the **third** element of this trio returning the result.
     * **This method is different from `applyMulToThird()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand the number to be multiplied to the third element of this triple
     * @returns {NumberTrio} the trio that contains the result
     */
    mulToThird(operand: number): NumberTrio {
        return new NumberTrio(this.getFirst(), this.getSecond(), this.getThird() * operand)
    }

    /**
     * Multiply the given `operand` to the element of this trio returning the result.
     * **This method is different from `applyMulToFirst()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand the number to be multiplied to the first element of this triple
     * @param {position} position the position
     * @returns {NumberTrio} the trio that contains the result
     */
    mulTo(operand: number, position: TriplePosition): NumberTrio {
        switch (position) {
            case TriplePosition.FIRST: return new NumberTrio(this.getFirst() * operand,
                this.getSecond(), this.getThird())
            case TriplePosition.SECOND: return new NumberTrio(this.getFirst(),
                this.getSecond() * operand, this.getThird())
            case TriplePosition.THIRD: return new NumberTrio(this.getFirst(), this.getSecond(),
                this.getThird() * operand)
        }
    }

    /**
     * Divides each element of this trio by the given `operand`, returning the result.
     * **This method is different from `applyDiv()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand the divisor for each number of this triple
     * @returns {NumberTrio} the trio that contains the result
     */
    div(operand: number): NumberTrio
    /**
     * Divides the first element of this trio by the given `operand1`, the
     * second one by `operand2` the third by `operand3`, returning the result.
     * **This method is different from `applyDiv()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand1 the divisor for the **first** element of this triple
     * @param {number} operand2 the divisor for **second** element of this triple
     * @param {number} operand3 the divisor for **third** element of this triple
     * @returns {NumberTrio} the trio that contains the result
     */
    div(operand1: number, operand2: number, operand3: number): NumberTrio
    div(operand1: number, operand2?: number, operand3?: number): NumberTrio{
        if(operand1 === 0) {
            throw new IllegalArgumentException('the first operand is 0: impossible to divide by 0')
        }
        if(operand2 === 0) {
            throw new IllegalArgumentException('the second operand is 0: impossible to divide by 0')
        }
        if(operand3 === 0) {
            throw new IllegalArgumentException('the third operand is 0: impossible to divide by 0')
        }

        if(operand2 == undefined) {
            operand2 = operand1
            operand3 = operand1
        }
        return new NumberTrio(this.getFirst() / operand1, this.getSecond() / operand2,
            this.getThird() / operand3)
    }

    /**
     * Divide the **first** element of this trio by the given `operand`, returning the result.
     * **This method is different from `applyDivToFirst()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand the divisor for the first element of this triple
     * @returns {NumberTrio} the trio that contains the result
     * @throws {IllegalArgumentException} if the operand is `0`
     */
    divFromFirst(operand: number): NumberTrio {
        if(operand === 0) {
            throw new IllegalArgumentException('the divisor is 0: impossible to divide by 0')
        }
        return new NumberTrio(this.getFirst() / operand, this.getSecond(), this.getThird())
    }

    /**
     * Divide the **second** element of this trio by the given `operand`, returning the result.
     * **This method is different from `applyDivToSecond()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand the divisor for the second element of this triple
     * @returns {NumberTrio} the trio that contains the result
     * @throws {IllegalArgumentException} if the operand is `0`
     */
    divFromSecond(operand: number): NumberTrio {
        if(operand === 0) {
            throw new IllegalArgumentException('the divisor is 0: impossible to divide by 0')
        }
        return new NumberTrio(this.getFirst(), this.getSecond() / operand, this.getThird())
    }

    /**
     * Divide the **third** element of this trio by the given `operand`, returning the result.
     * **This method is different from `applyDivToThird()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {number} operand the divisor for the third element of this triple
     * @returns {NumberTrio} the trio that contains the result
     * @throws {IllegalArgumentException} if the operand is `0`
     */
    divFromThird(operand: number): NumberTrio {
        if(operand === 0) {
            throw new IllegalArgumentException('the divisor is 0: impossible to divide by 0')
        }
        return new NumberTrio(this.getFirst(), this.getSecond(), this.getThird() / operand)
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
    divFrom(operand: number, position: TriplePosition): NumberTrio {
        if(operand === 0) {
            throw new IllegalArgumentException('the divisor is 0: impossible to divide by 0')
        }
        switch (position) {
            case TriplePosition.FIRST: return new NumberTrio(this.getFirst() / operand,
                this.getSecond(), this.getThird())
            case TriplePosition.SECOND: return new NumberTrio(this.getFirst(),
                this.getSecond() / operand, this.getThird())
            case TriplePosition.THIRD: return new NumberTrio(this.getFirst(), this.getSecond(),
                this.getThird() / operand)
        }
    }

    /**
     * Executes a simple operator to each element of this triple, then returns the result.
     * **This method is different from `applySimpleOperator()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * Notice that the operand is simple because it only takes a number and returns the result
     * @param {NumericOperator} operator the simple operator function
     * @returns {NumberTrio} the trio that contains the result
     */
    simpleOperator(operator: NumericOperator): NumberTrio
    /**
     * Executes `operator1` with the first element of this triple, `operator2` with the second one and
     * `operator3` with the third.
     * **This method is different from `applySimpleOperator()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * Notice that the operand is simple because it only takes a number and returns the result
     * @param {NumericOperator} operator1 the simple operator function for the first element
     * @param {NumericOperator} operator2 the simple operator function for the second element
     * @param {NumericOperator} operator3 the simple operator function for the third element
     * @returns {NumberTrio} the trio that contains the result
     */
    simpleOperator(operator1: NumericOperator, operator2: NumericOperator, operator3: NumericOperator): NumberTrio
    simpleOperator(operator1: NumericOperator, operator2?: NumericOperator, operator3?: NumericOperator): NumberTrio {
        if(operator2 == undefined) {
            operator2 = operator1
            operator3 = operator1
        }
        return new NumberTrio(operator1(this.getFirst()), operator2(this.getSecond()), operator3(this.getThird()))
    }

    /**
     * Executes a simple operator to each element of this triple, then returns the result.
     * **This method is different from `applyOperator()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {NumericOperator} operator the simple operator function
     * @param {...any} args the arguments to be passed to the operator
     * @returns {NumberTrio} the trio that contains the result
     */
    operator(operator: NumericOperator, ...args: any): NumberTrio
    /**
     * Executes `operator1` with the first element of this triple, `operator2` with the second one
     * and `operator3` with the third.
     * **This method is different from `applyOperator()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {NumericOperator} operator1 the simple operator function for the first element
     * @param {NumericOperator} operator2 the simple operator function for the second element
     * @param {NumericOperator} operator3 the simple operator function for the third element
     * @param {...any} args the arguments to be passed to the operator
     * @returns {NumberTrio} the trio that contains the result
     */
    operator(operator1: NumericOperator, operator2: NumericOperator,
             operator3: NumericOperator, ...args: any): NumberTrio
    operator(operator1: NumericOperator, operator2?: NumericOperator,
             operator3?: NumericOperator, ...args: any): NumberTrio {
        if(operator2 == undefined) {
            operator2 = operator1
            operator3 = operator1
        }
        return new NumberTrio(operator1(this.getFirst(), ...args), operator2(this.getSecond(), ...args),
            operator3(this.getThird(), ...args))
    }

    /**
     * Executes a simple operator with the **first** element of this triple.
     * **This method is different from `applySimpleOperatorToFirst()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {NumericOperator} operator the simple operator function
     * @returns {NumberTrio} the trio that contains the result
     */
    simpleOperatorToFirst(operator: NumericOperator): NumberTrio {
        return new NumberTrio(operator(this.getFirst()), this.getSecond(), this.getThird())
    }

    /**
     * Executes a simple operator with the **second** element of this triple.
     * **This method is different from `applySimpleOperatorToSecond()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {NumericOperator} operator the simple operator function
     * @returns {NumberTrio} the trio that contains the result
     */
    simpleOperatorToSecond(operator: NumericOperator): NumberTrio {
        return new NumberTrio(this.getFirst(), operator(this.getSecond()), this.getThird())
    }

    /**
     * Executes a simple operator with the **third** element of this triple.
     * **This method is different from `applySimpleOperatorToThird()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {NumericOperator} operator the simple operator function
     * @returns {NumberTrio} the trio that contains the result
     */
    simpleOperatorToThird(operator: NumericOperator): NumberTrio {
        return new NumberTrio(this.getFirst(), this.getSecond(), operator(this.getThird()))
    }

    /**
     * Executes a simple operator with the element of this triple at the specified position.
     * **This method is different from `applySimpleOperatorTo()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {NumericOperator} operator the simple operator function
     * @param {TriplePosition} position the position
     * @returns {NumberTrio} the trio that contains the result
     */
    simpleOperatorTo(operator: NumericOperator, position: TriplePosition): NumberTrio {
        switch (position) {
            case TriplePosition.FIRST: return new NumberTrio(operator(this.getFirst()),
                this.getSecond(), this.getThird())
            case TriplePosition.SECOND: return new NumberTrio(this.getFirst(),
                operator(this.getSecond()), this.getThird())
            case TriplePosition.THIRD: return new NumberTrio(this.getFirst(), this.getSecond(),
                operator(this.getThird()))
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
    operatorToFirst(operator: NumericOperator, ...args: any): NumberTrio {
        return new NumberTrio(operator(this.getFirst(), ...args), this.getSecond(), this.getThird())
    }

    /**
     * Executes an operator with the **second** element of this triple.
     * **This method is different from `applySimpleOperatorToFirst()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {NumericOperator} operator the simple operator function
     * @param {...any} args the arguments to be passed to the operator
     * @returns {NumberTrio} the trio that contains the result
     */
    operatorToSecond(operator: NumericOperator, ...args: any): NumberTrio {
        return new NumberTrio(this.getFirst(), operator(this.getSecond(), ...args), this.getThird())
    }

    /**
     * Executes an operator with the **third** element of this triple.
     * **This method is different from `applySimpleOperatorToThird()` because it does not touch the
     * internal elements of this trio** but only returns the trio that contains the result
     * @param {NumericOperator} operator the simple operator function
     * @param {...any} args the arguments to be passed to the operator
     * @returns {NumberTrio} the trio that contains the result
     */
    operatorToThird(operator: NumericOperator, ...args: any): NumberTrio {
        return new NumberTrio(this.getFirst(), this.getSecond(), operator(this.getThird(), ...args))
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
    operatorTo(operator: NumericOperator, position: TriplePosition, ...args: any): NumberTrio {
        switch (position) {
            case TriplePosition.FIRST: return new NumberTrio(operator(this.getFirst(), ...args),
                this.getSecond(), this.getThird())
            case TriplePosition.SECOND: return new NumberTrio(this.getFirst(),
                operator(this.getSecond(), ...args), this.getThird())
            case TriplePosition.THIRD: return new NumberTrio(this.getFirst(),
                this.getSecond(), operator(this.getThird(), ...args))
        }
    }

    clone(): NumberTrio {
        return new NumberTrio(this.getFirst(), this.getSecond(), this.getThird())
    }

}

/**
 * Creates and returns a new trio of numbers
 * @param {number} number1 the first number
 * @param {number} number2 the second number
 * @param {number} number3 the third number
 */
export function numberTrio(number1: number, number2: number, number3: number): NumberTrio {
    return new NumberTrio(number1, number2, number3)
}