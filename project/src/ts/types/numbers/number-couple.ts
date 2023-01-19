import {Pair, PairPosition} from "../pair";
import {IllegalArgumentException} from "../exceptions/illegal-argument-exception";
import {NumericOperator} from "./numeric-operator";
import {Cloneable} from "../cloneable";

export class NumberCouple extends Pair<number, number> implements Cloneable<NumberCouple>{

    constructor(number1: number, number2: number) {
        super(number1, number2);
    }

    /**
     * Apply an addition to this couple of numbers.
     * This method will update the internal elements of this pair by adding
     * the given argument to them, then returns `this`
     * @param {number} operand the number to be added to each number of this pair
     * @returns {NumberCouple} this couple
     */
    applyAdd(operand: number): NumberCouple
    /**
     * Apply an addition to this couple of numbers.
     * This method will update the internal elements of this pair by adding
     * `operand1` to the first number and `operand2` to the second one, then
     * returns `this`
     * @param {number} operand1 the number to add to the **first** element of this pair
     * @param {number} operand2 the number to add to the **second** element of this pair
     * @returns {NumberCouple} this couple
     */
    applyAdd(operand1: number, operand2: number): NumberCouple
    applyAdd(operand1: number, operand2?: number): NumberCouple{
        if(operand2 == undefined) {
            operand2 = operand1
        }
        this.setFirst(this.getSecond() + operand1)
        this.setSecond(this.getSecond() + operand2)
        return this
    }

    /**
     * Apply an addition to the **first** element of this couple.
     * This method will update the internal elements of this pair by adding
     * the given argument to the first one, then returns `this`
     * @param {number} operand the number to be added to the **first** element of this pair
     * @returns {NumberCouple} this couple
     */
    applyAddToFirst(operand: number): NumberCouple {
        this.setFirst(this.getFirst() + operand)
        return this
    }

    /**
     * Apply an addition to the **second** element of this couple.
     * This method will update the internal elements of this pair by adding
     * the given argument to the second one, then returns `this`
     * @param {number} operand the number to be added to the **second** element of this pair
     * @returns {NumberCouple} this couple
     */
    applyAddToSecond(operand: number): NumberCouple {
        this.setSecond(this.getSecond() + operand)
        return this
    }

    /**
     * Apply an addition to the element of this couple specified by the `position` parameter.
     * This method will update the internal elements of this pair by adding
     * the given argument to the desired one, then returns `this`
     * @param {number} operand the number to be added to the desired element of this pair
     * @param {PairPosition} position the position
     * @returns {NumberCouple} this couple
     */
    applyAddTo(operand: number, position: PairPosition): NumberCouple {
        this.set(this.get(position) + operand, position)
        return this
    }

    /**
     * Apply a subtraction to this couple of numbers.
     * This method will update the internal elements of this pair by subtracting
     * the given argument from them, then returns `this`
     * @param {number} operand the number to be subtracted from each number of this pair
     * @returns {NumberCouple} this couple
     */
    applySub(operand: number): NumberCouple
    /**
     * Apply a subtraction to this couple of numbers.
     * This method will update the internal elements of this pair by subtracting
     * `operand1` from the first number and `operand2` from the second one, then
     * returns `this`
     * @param {number} operand1 the number to subtracted from the **first** element of this pair
     * @param {number} operand2 the number to be subtracted from the **second** element of this pair
     * @returns {NumberCouple} this couple
     */
    applySub(operand1: number, operand2: number): NumberCouple
    applySub(operand1: number, operand2?: number): NumberCouple{
        if(operand2 == undefined) {
            operand2 = operand1
        }
        this.setFirst(this.getFirst() - operand1)
        this.setSecond(this.getSecond() - operand2)
        return this
    }

    /**
     * Apply a subtraction to the **first** element of this couple.
     * This method will update the internal elements of this pair by subtracting
     * the given argument from the first one, then returns `this`
     * @param {number} operand the number to be subtracted from the **first** element of this pair
     * @returns {NumberCouple} this couple
     */
    applySubFromFirst(operand: number): NumberCouple {
        this.setFirst(this.getFirst() - operand)
        return this
    }

    /**
     * Apply a subtraction to the **second** element of this couple.
     * This method will update the internal elements of this pair by subtracting
     * the given argument from the second one, then returns `this`
     * @param {number} operand the number to be subtracted from the **second** element of this pair
     * @returns {NumberCouple} this couple
     */
    applySubFromSecond(operand: number): NumberCouple {
        this.setSecond(this.getSecond() - operand)
        return this
    }

    /**
     * Apply a subtraction to the element of this couple specified by `position`.
     * This method will update the internal elements of this pair by subtracting
     * the given argument from the desired one, then returns `this`
     * @param {number} operand the number to be subtracted
     * @param {PairPosition} position the position
     * @returns {NumberCouple} this couple
     */
    applySubFrom(operand: number, position: PairPosition): NumberCouple {
        this.set(this.get(position) - operand, position)
        return this
    }

    /**
     * Apply a multiplication to this couple of numbers.
     * This method will update the internal elements of this pair by multiplying
     * the given argument to them, then returns `this`
     * @param {number} operand the number to be multiplied each number of this pair
     * @returns {NumberCouple} this couple
     */
    applyMul(operand: number): NumberCouple
    /**
     * Apply a multiplication to this couple of numbers.
     * This method will update the internal elements of this pair by multiplying
     * `operand1` to the first number and `operand2` to the second one, then
     * returns `this`
     * @param {number} operand1 the number to be multiplied to the **first** element of this pair
     * @param {number} operand2 the number to be multiplied to the **second** element of this pair
     * @returns {NumberCouple} this couple
     */
    applyMul(operand1: number, operand2: number): NumberCouple
    applyMul(operand1: number, operand2?: number): NumberCouple{
        if(operand2 == undefined) {
            operand2 = operand1
        }
        this.setFirst(this.getFirst() * operand1)
        this.setSecond(this.getSecond() * operand2)
        return this
    }

    /**
     * Apply a multiplication to the **first** element of this couple.
     * This method will update the internal elements of this pair by multiplying
     * the given argument to the first one, then returns `this`
     * @param {number} operand the number to be multiplied to the **first** element of this pair
     * @returns {NumberCouple} this couple
     */
    applyMulToFirst(operand: number): NumberCouple {
        this.setFirst(this.getFirst() + operand)
        return this
    }

    /**
     * Apply a multiplication to the **second** element of this couple.
     * This method will update the internal elements of this pair by multiplying
     * the given argument to the second one, then returns `this`
     * @param {number} operand the number to be multiplied to the **second** element of this pair
     * @returns {NumberCouple} this couple
     */
    applyMulToSecond(operand: number): NumberCouple {
        this.setSecond(this.getSecond() + operand)
        return this
    }

    /**
     * Apply a multiplication to the element of this couple specified by `position`.
     * This method will update the internal elements of this pair by multiplying
     * the given argument to the one at the desired position, then returns `this`
     * @param {number} operand the number to be multiplied to the **second** element of this pair
     * @param {PairPosition} position the position
     * @returns {NumberCouple} this couple
     */
    applyMulTo(operand: number, position: PairPosition): NumberCouple {
        this.set(this.get(position) + operand, position)
        return this
    }

    /**
     * Apply a multiplication to this couple of numbers.
     * This method will update the internal elements of this pair by multiplying
     * the given argument to them, then returns `this`
     * @param {number} operand the number to be multiplied each number of this pair
     * @returns {NumberCouple} this couple
     */
    applyDiv(operand: number): NumberCouple
    /**
     * Apply a division to this couple of numbers.
     * This method will update the internal elements of this pair by dividing them by
     * `operand1` for the first number and `operand2` for the second one, then
     * returns `this`
     * @param {number} operand1 the divisor of the **first** element of this pair
     * @param {number} operand2 the divisor of the **second** element of this pair
     * @returns {NumberCouple} this couple
     * @throws {IllegalArgumentException} if one divisor is `0`
     */
    applyDiv(operand1: number, operand2: number): NumberCouple
    applyDiv(operand1: number, operand2?: number): NumberCouple{
        if(operand1 === 0) {
            throw new IllegalArgumentException('the first operand is 0: impossible to divide by 0')
        }
        if(operand2 === 0) {
            throw new IllegalArgumentException('the second operand is 0: impossible to divide by 0')
        }

        if(operand2 == undefined) {
            operand2 = operand1
        }
        this.setFirst(this.getFirst() / operand1)
        this.setSecond(this.getSecond() / operand2)
        return this
    }

    /**
     * Apply a division to the **first** element of this couple.
     * This method will update the internal elements of this pair by dividing
     * the first one by the argument of this method, then returns `this`
     * @param {number} operand the divisor for the **first** element of this pair
     * @returns {NumberCouple} this couple
     * @throws {IllegalArgumentException} if the operand is `0`
     */
    applyDivToFirst(operand: number): NumberCouple {
        if(operand === 0) {
            throw new IllegalArgumentException('the divisor is 0: impossible to divide by 0')
        }
        this.setFirst(this.getFirst() / operand)
        return this
    }

    /**
     * Apply a division to the **second** element of this couple.
     * This method will update the internal elements of this pair by dividing
     * the second one by the argument of this method, then returns `this`
     * @param {number} operand the divisor for the **second** element of this pair
     * @returns {NumberCouple} this couple
     * @throws {IllegalArgumentException} if the operand is `0`
     */
    applyDivToSecond(operand: number): NumberCouple {
        if(operand === 0) {
            throw new IllegalArgumentException('the divisor is 0: impossible to divide by 0')
        }
        this.setSecond(this.getSecond() / operand)
        return this
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
    applyDivTo(operand: number, position: PairPosition): NumberCouple {
        if(operand === 0) {
            throw new IllegalArgumentException('the divisor is 0: impossible to divide by 0')
        }
        this.set(this.get(position) / operand, position)
        return this
    }

    /**
     * Applies a simple operand to each element of this pair.
     * This method will update the internal elements of this pair by applying `operand`
     * to each element of this pair.
     * Notice that the operand is simple because it only takes a number and returns the result
     * @param {NumericOperator} operator the simple operator function
     * @returns this couple
     */
    applySimpleOperator(operator: NumericOperator): NumberCouple
    /**
     * Applies `operator1` to the first element of this pair and `operator2` to the second one.
     * This method will update the internal elements of this pair by applying the two operators on the
     * element of this pair.
     * Notice that the operand is simple because it only takes a number and returns the result
     * @param {NumericOperator} operator1 the simple operator function for the first element
     * @param {NumericOperator} operator2 the simple operator function for the second element
     */
    applySimpleOperator(operator1: NumericOperator, operator2: NumericOperator): NumberCouple
    applySimpleOperator(operator1: NumericOperator, operator2?: NumericOperator): NumberCouple {
        if(operator2 == undefined) {
            operator2 = operator1
        }
        this.setFirst(operator1(this.getFirst()))
        this.setSecond(operator2(this.getSecond()))
        return this
    }

    /**
     * Applies a simple operator to each element of this pair.
     * This method will update the internal elements of this pair by applying `operator`
     * to each element of this pair.
     * @param {NumericOperator} operator the simple operator function
     * @param {...any} args the arguments to be passed to the operator
     * @returns this couple
     */
    applyOperator(operator: NumericOperator, ...args: any): NumberCouple
    /**
     * Applies `operator1` to the first element of this pair and `operator2` to the second one.
     * This method will update the internal elements of this pair by applying the two operators on the
     * element of this pair.
     * Notice that the operand is simple because it only takes a number and returns the result
     * @param {NumericOperator} operator1 the simple operator function for the first element
     * @param {NumericOperator} operator2 the simple operator function for the second element
     * @param {...any} args the arguments to be passed to the operator
     */
    applyOperator(operator1: NumericOperator, operator2: NumericOperator, ...args: any): NumberCouple
    applyOperator(operator1: NumericOperator, operator2?: NumericOperator, ...args: any): NumberCouple {
        if(operator2 == undefined) {
            operator2 = operator1
        }
        this.setFirst(operator1(this.getFirst(), ...args))
        this.setSecond(operator2(this.getSecond(), ...args))
        return this
    }

    /**
     * Applies a simple operator to the **first** element of this pair.
     * This method will update the internal element of this pair by applying `operand`
     * to the first element of this pair.
     * Notice that the operand is simple because it only takes a number and returns the result
     * @param {NumericOperator} operator the simple operator function
     * @returns this couple
     */
    applySimpleOperatorToFirst(operator: NumericOperator): NumberCouple {
        this.setFirst(operator(this.getFirst()))
        return this
    }

    /**
     * Applies a simple operator to the **second** element of this pair.
     * This method will update the internal element of this pair by applying `operand`
     * to the second element of this pair.
     * Notice that the operand is simple because it only takes a number and returns the result
     * @param {NumericOperator} operator the simple operator function
     * @returns this couple
     */
    applySimpleOperatorToSecond(operator: NumericOperator): NumberCouple {
        this.setSecond(operator(this.getSecond()))
        return this
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
    applySimpleOperatorTo(operator: NumericOperator, position: PairPosition): NumberCouple {
        this.set(operator(this.get(position)), position)
        return this
    }

    /**
     * Applies a simple operator to the **first** element of this pair.
     * This method will update the internal element of this pair by applying `operand`
     * to the first element of this pair
     * @param {NumericOperator} operator the simple operator function
     * @param {...any} args the arguments to be passed to the operator
     * @returns this couple
     */
    applyOperatorToFirst(operator: NumericOperator, ...args: any): NumberCouple {
        this.setFirst(operator(this.getFirst(), ...args))
        return this
    }

    /**
     * Applies a simple operator to the **second** element of this pair.
     * This method will update the internal element of this pair by applying `operand`
     * to the second element of this pair
     * @param {NumericOperator} operator the simple operator function
     * @param {...any} args the arguments to be passed to the operator
     * @returns this couple
     */
    applyOperatorToSecond(operator: NumericOperator, ...args: any): NumberCouple {
        this.setSecond(operator(this.getSecond(), ...args))
        return this
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
    applyOperatorTo(operator: NumericOperator, position: PairPosition, ...args: any): NumberCouple {
        this.set(operator(this.get(position), ...args), position)
        return this
    }

    /**
     * Adds the given `operand` to each element of this couple returning the result.
     * **This method is different from `applyAdd()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {number} operand the number to be added to each number of this pair
     * @returns {NumberCouple} the couple that contains the result
     */
    add(operand: number): NumberCouple
    /**
     * Adds the given `operand1` to the first element of this couple and `operand2` to the
     * second one returning the result.
     * **This method is different from `applyAdd()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {number} operand1 the number to add to the **first** element of this pair
     * @param {number} operand2 the number to add to the **second** element of this pair
     * @returns {NumberCouple} the couple that contains the result
     */
    add(operand1: number, operand2: number): NumberCouple
    add(operand1: number, operand2?: number): NumberCouple{
        if(operand2 == undefined) {
            operand2 = operand1
        }
        return new NumberCouple(this.getFirst() + operand1, this.getSecond() + operand2)
    }

    /**
     * Adds the given `operand` to the **first** element of this couple returning the result.
     * **This method is different from `applyAddToFirst()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {number} operand the number to be added to the first element of this pair
     * @returns {NumberCouple} the couple that contains the result
     */
    addToFirst(operand: number): NumberCouple {
        return new NumberCouple(this.getFirst() + operand, this.getSecond())
    }

    /**
     * Adds the given `operand` to the **second** element of this couple returning the result.
     * **This method is different from `applyAddToSecond()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {number} operand the number to be added to the second element of this pair
     * @returns {NumberCouple} the couple that contains the result
     */
    addToSecond(operand: number): NumberCouple {
        return new NumberCouple(this.getFirst(), this.getSecond() + operand)
    }

    /**
     * Adds the given `operand` to the element of this couple at the specified position, returning the result.
     * **This method is different from `applyAddToSecond()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {number} operand the number to be added to the second element of this pair
     * @param {PairPosition} position the position
     * @returns {NumberCouple} the couple that contains the result
     */
    addTo(operand: number, position: PairPosition): NumberCouple {
        switch (position) {
            case PairPosition.FIRST: return new NumberCouple(this.getFirst() + operand, this.getSecond())
            case PairPosition.SECOND: return new NumberCouple(this.getFirst(), this.getSecond() + operand)
        }
    }

    /**
     * Subtracts the given `operand` from each element of this couple returning the result.
     * **This method is different from `applySub()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {number} operand the number to be subtracted from each number of this pair
     * @returns {NumberCouple} the couple that contains the result
     */
    sub(operand: number): NumberCouple
    /**
     * Subtracts the given `operand1` from the first element of this couple and `operand2` from the
     * second one returning the result.
     * **This method is different from `applySub()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {number} operand1 the number to add to the **first** element of this pair
     * @param {number} operand2 the number to add to the **second** element of this pair
     * @returns {NumberCouple} the couple that contains the result
     */
    sub(operand1: number, operand2: number): NumberCouple
    sub(operand1: number, operand2?: number): NumberCouple{
        if(operand2 == undefined) {
            operand2 = operand1
        }
        return new NumberCouple(this.getFirst() - operand1, this.getSecond() - operand2)
    }

    /**
     * Subtracts the given `operand` from the **first** element of this couple returning the result.
     * **This method is different from `applySubtractFromFirst()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {number} operand the number to be subtracted from the first element of this pair
     * @returns {NumberCouple} the couple that contains the result
     */
    subFromFirst(operand: number): NumberCouple {
        return new NumberCouple(this.getFirst() - operand, this.getSecond())
    }

    /**
     * Subtracts the given `operand` from the **second** element of this couple returning the result.
     * **This method is different from `applySubtractSecond()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {number} operand the number to be subtracted from the second element of this pair
     * @returns {NumberCouple} the couple that contains the result
     */
    subFromSecond(operand: number): NumberCouple {
        return new NumberCouple(this.getFirst(), this.getSecond() - operand)
    }

    /**
     * Subtracts the given `operand` from the element of this couple at the specified position, returning the result.
     * **This method is different from `applySubtractSecond()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {number} operand the number to be subtracted from the desired element of this pair
     * @param {PairPosition} position the position
     * @returns {NumberCouple} the couple that contains the result
     */
    subFrom(operand: number, position: PairPosition): NumberCouple {
        switch (position) {
            case PairPosition.FIRST: return new NumberCouple(this.getFirst() - operand, this.getSecond())
            case PairPosition.SECOND: return new NumberCouple(this.getFirst(), this.getSecond() - operand)
        }
    }

    /**
     * Multiplies the given `operand` to each element of this couple returning the result.
     * **This method is different from `applyMul()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {number} operand the number to be multiplied to each number of this pair
     * @returns {NumberCouple} the couple that contains the result
     */
    mul(operand: number): NumberCouple
    /**
     * Multiplies the given `operand1` to the first element of this couple and `operand2` to the
     * second one returning the result.
     * **This method is different from `applyMul()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {number} operand1 the number to multiply to the **first** element of this pair
     * @param {number} operand2 the number to multiply to the **second** element of this pair
     * @returns {NumberCouple} the couple that contains the result
     */
    mul(operand1: number, operand2: number): NumberCouple
    mul(operand1: number, operand2?: number): NumberCouple{
        if(operand2 == undefined) {
            operand2 = operand1
        }
        return new NumberCouple(this.getFirst() * operand1, this.getSecond() * operand2)
    }

    /**
     * Multiply the given `operand` to the **first** element of this couple returning the result.
     * **This method is different from `applyMulToFirst()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {number} operand the number to be multiplied to the first element of this pair
     * @returns {NumberCouple} the couple that contains the result
     */
    mulToFirst(operand: number): NumberCouple {
        return new NumberCouple(this.getFirst() * operand, this.getSecond())
    }

    /**
     * Multiply the given `operand` to the **second** element of this couple returning the result.
     * **This method is different from `applyMulToSecond()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {number} operand the number to be multiplied to the second element of this pair
     * @returns {NumberCouple} the couple that contains the result
     */
    mulToSecond(operand: number): NumberCouple {
        return new NumberCouple(this.getFirst(), this.getSecond() * operand)
    }

    /**
     * Multiply the given `operand` to the element of this couple returning the result.
     * **This method is different from `applyMulToFirst()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {number} operand the number to be multiplied to the first element of this pair
     * @param {position} position the position
     * @returns {NumberCouple} the couple that contains the result
     */
    mulTo(operand: number, position: PairPosition): NumberCouple {
        switch (position) {
            case PairPosition.FIRST: return new NumberCouple(this.getFirst() * operand, this.getSecond())
            case PairPosition.SECOND: return new NumberCouple(this.getFirst(), this.getSecond() * operand)
        }
    }

    /**
     * Divides each element of this couple by the given `operand`, returning the result.
     * **This method is different from `applyDiv()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {number} operand the divisor for each number of this pair
     * @returns {NumberCouple} the couple that contains the result
     */
    div(operand: number): NumberCouple
    /**
     * Divides the first element of this couple by the given `operand1` and the
     * second one by `operand2`, returning the result.
     * **This method is different from `applyDiv()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {number} operand1 the divisor for the **first** element of this pair
     * @param {number} operand2 the divisor for **second** element of this pair
     * @returns {NumberCouple} the couple that contains the result
     */
    div(operand1: number, operand2: number): NumberCouple
    div(operand1: number, operand2?: number): NumberCouple{
        if(operand1 === 0) {
            throw new IllegalArgumentException('the first operand is 0: impossible to divide by 0')
        }
        if(operand2 === 0) {
            throw new IllegalArgumentException('the second operand is 0: impossible to divide by 0')
        }

        if(operand2 == undefined) {
            operand2 = operand1
        }
        return new NumberCouple(this.getFirst() / operand1, this.getSecond() / operand2)
    }

    /**
     * Divide the **first** element of this couple by the given `operand`, returning the result.
     * **This method is different from `applyDivToFirst()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {number} operand the divisor for the first element of this pair
     * @returns {NumberCouple} the couple that contains the result
     * @throws {IllegalArgumentException} if the operand is `0`
     */
    divFromFirst(operand: number): NumberCouple {
        if(operand === 0) {
            throw new IllegalArgumentException('the divisor is 0: impossible to divide by 0')
        }
        return new NumberCouple(this.getFirst() / operand, this.getSecond())
    }

    /**
     * Divide the **second** element of this couple by the given `operand`, returning the result.
     * **This method is different from `applyDivToSecond()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {number} operand the divisor for the second element of this pair
     * @returns {NumberCouple} the couple that contains the result
     * @throws {IllegalArgumentException} if the operand is `0`
     */
    divFromSecond(operand: number): NumberCouple {
        if(operand === 0) {
            throw new IllegalArgumentException('the divisor is 0: impossible to divide by 0')
        }
        return new NumberCouple(this.getFirst(), this.getSecond() / operand)
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
    divFrom(operand: number, position: PairPosition): NumberCouple {
        if(operand === 0) {
            throw new IllegalArgumentException('the divisor is 0: impossible to divide by 0')
        }
        switch (position) {
            case PairPosition.FIRST: return new NumberCouple(this.getFirst() / operand, this.getSecond())
            case PairPosition.SECOND: return new NumberCouple(this.getFirst(), this.getSecond() / operand)
        }
    }

    /**
     * Executes a simple operator to each element of this pair, then returns the result.
     * **This method is different from `applySimpleOperator()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * Notice that the operand is simple because it only takes a number and returns the result
     * @param {NumericOperator} operator the simple operator function
     * @returns {NumberCouple} the couple that contains the result
     */
    simpleOperator(operator: NumericOperator): NumberCouple
    /**
     * Executes `operator1` with the first element of this pair and `operator2` with the second one.
     * **This method is different from `applySimpleOperator()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * Notice that the operand is simple because it only takes a number and returns the result
     * @param {NumericOperator} operator1 the simple operator function for the first element
     * @param {NumericOperator} operator2 the simple operator function for the second element
     * @returns {NumberCouple} the couple that contains the result
     */
    simpleOperator(operator1: NumericOperator, operator2: NumericOperator): NumberCouple
    simpleOperator(operator1: NumericOperator, operator2?: NumericOperator): NumberCouple {
        if(operator2 == undefined) {
            operator2 = operator1
        }
        return new NumberCouple(operator1(this.getFirst()), operator2(this.getSecond()))
    }

    /**
     * Executes a simple operator to each element of this pair, then returns the result.
     * **This method is different from `applyOperator()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {NumericOperator} operator the simple operator function
     * @param {...any} args the arguments to be passed to the operator
     * @returns {NumberCouple} the couple that contains the result
     */
    operator(operator: NumericOperator, ...args: any): NumberCouple
    /**
     * Executes `operator1` with the first element of this pair and `operator2` with the second one.
     * **This method is different from `applyOperator()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {NumericOperator} operator1 the simple operator function for the first element
     * @param {NumericOperator} operator2 the simple operator function for the second element
     * @param {...any} args the arguments to be passed to the operator
     * @returns {NumberCouple} the couple that contains the result
     */
    operator(operator1: NumericOperator, operator2: NumericOperator, ...args: any): NumberCouple
    operator(operator1: NumericOperator, operator2?: NumericOperator, ...args: any): NumberCouple {
        if(operator2 == undefined) {
            operator2 = operator1
        }
        return new NumberCouple(operator1(this.getFirst(), ...args), operator2(this.getSecond(), ...args))
    }

    /**
     * Executes a simple operator with the **first** element of this pair.
     * **This method is different from `applySimpleOperatorToFirst()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {NumericOperator} operator the simple operator function
     * @returns {NumberCouple} the couple that contains the result
     */
    simpleOperatorToFirst(operator: NumericOperator): NumberCouple {
        return new NumberCouple(operator(this.getFirst()), this.getSecond())
    }

    /**
     * Executes a simple operator with the **second** element of this pair.
     * **This method is different from `applySimpleOperatorToSecond()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {NumericOperator} operator the simple operator function
     * @returns {NumberCouple} the couple that contains the result
     */
    simpleOperatorToSecond(operator: NumericOperator): NumberCouple {
        return new NumberCouple(this.getFirst(), operator(this.getSecond()))
    }

    /**
     * Executes a simple operator with the element of this pair at the specified position.
     * **This method is different from `applySimpleOperatorTo()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {NumericOperator} operator the simple operator function
     * @param {PairPosition} position the position
     * @returns {NumberCouple} the couple that contains the result
     */
    simpleOperatorTo(operator: NumericOperator, position: PairPosition): NumberCouple {
        switch (position) {
            case PairPosition.FIRST: return new NumberCouple(operator(this.getFirst()), this.getSecond())
            case PairPosition.SECOND: return new NumberCouple(this.getFirst(), operator(this.getSecond()))
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
    operatorToFirst(operator: NumericOperator, ...args: any): NumberCouple {
        return new NumberCouple(operator(this.getFirst(), ...args), this.getSecond())
    }

    /**
     * Executes an operator with the **second** element of this pair.
     * **This method is different from `applySimpleOperatorToFirst()` because it does not touch the
     * internal elements of this couple** but only returns the couple that contains the result
     * @param {NumericOperator} operator the simple operator function
     * @param {...any} args the arguments to be passed to the operator
     * @returns {NumberCouple} the couple that contains the result
     */
    operatorToSecond(operator: NumericOperator, ...args: any): NumberCouple {
        return new NumberCouple(this.getFirst(), operator(this.getSecond(), ...args))
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
    operatorTo(operator: NumericOperator, position: PairPosition, ...args: any): NumberCouple {
        switch (position) {
            case PairPosition.FIRST: return new NumberCouple(operator(this.getFirst(), ...args), this.getSecond())
            case PairPosition.SECOND: return new NumberCouple(this.getFirst(), operator(this.getSecond(), ...args))
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
    isBetween(number: number, leftEq: boolean = true, rightEq: boolean = true): boolean {
        let min: number
        let max: number
        if(this.getFirst() < this.getSecond()) {
            min = this.getFirst()
            max = this.getSecond()
        } else {
            min = this.getSecond()
            max = this.getFirst()
        }

        return (number > min || (number == min && leftEq))
            && (number < this.getSecond() || (number == this.getSecond() && rightEq)
        )
    }

    clone(): NumberCouple {
        return new NumberCouple(this.getFirst(), this.getSecond())
    }
}

/**
 * Creates and return a new couple of numbers
 * @param {number} number1 the first number
 * @param {number} number2 the second number
 * @return the new `NumberCouple`
 */
export function numberCouple(number1: number, number2: number): NumberCouple {
    return new NumberCouple(number1, number2)
}