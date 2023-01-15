import {IllegalArgumentException} from "./exceptions/illegal-argument-exception";
import {IllegalStateException} from "./exceptions/illegal-state-exception";

export class Result<T> {

    /**
     * Creates and returns a new **successful** result which contains
     * a value
     * @param {T} value the value of the result
     * @return {Result<T>} the new successful result
     */
    static ofSuccess<T>(value: T): Result<T> {
        return new Result<T>(value, null)
    }

    /**
     * Creates and returns a new **failure**, storing the error which caused it
     * @param {Error} error the error which caused the failure
     * @return {Result<void>} the new failed result
     */
    static ofFailure<T>(error: Error): Result<T> {
        return new Result<T>(null, error)
    }

    readonly #value: T|null
    readonly #error: Error|null

    private constructor(value: T|null, error: Error|null) {
        if(this.#value != null && this.#error != null) {
            throw new IllegalArgumentException("value and error can NOT be non-null at the same time")
        }

        this.#value = value
        this.#error = error
    }

    /**
     * Returns the value of this result or `null` if it's a failure (so no result is owned)
     */
    getValue(): T|null {
        return this.#value
    }

    /**
     * Returns the error of this result of `null` if it's a success (so no error is present)
     */
    getError(): Error|null {
        return this.#error
    }

    /**
     * Returns the value of this result, throwing an error if this result is a failure
     * @return {T} the value of this result
     * @throws {IllegalStateException} if this result is a failure
     */
    getValueOrThrow(): T {
        if(this.#value == null) throw new IllegalStateException("this result is a failure: no value is present")
        return this.#value
    }

    /**
     * Returns the error of this result, throwing an error if this result is a success
     * @return {Error} the error of this result
     * @throws {IllegalStateException} if this result is a success
     */
    getErrorOrThrow(): Error {
        if(this.#error == null) throw new IllegalStateException("this result is successful: no error is present")
        return this.#error
    }

    /**
     * Returns `true` if this result is a **success** (then it has a value)
     */
    isSuccess(): boolean {
        return this.#value != null
    }

    /**
     * Returns `true` if this result is a **failure** (than it has the cause of the failure)
     */
    isFailure(): boolean {
        return this.#error != null
    }

    /**
     * Executes the given function if this result is a **failure** (then contains the error).
     * In that case the function will be invoked passing the error that caused the failure,
     * otherwise nothing is performed
     * @param {error: Error) => void} onError the function to be invoked in case of failure
     */
    withError(onError: (error: Error) => void): void {
        if(this.isFailure()) {
            onError(this.#error)
        }
    }

    /**
     * Executes the given function if this result is a **success** (than contains a value).
     * In that case the function will be invoked passing the value of the result,
     * otherwise nothing is performed
     * @param {error: Error) => void} onValue the function to be invoked in case of success
     */
    withValue(onValue: (value: T) => void): void {
        if(this.isSuccess()) {
            onValue(this.#value)
        }
    }
}

/**
 * Executes the given `operation` catching all the errors.
 * The returning result has:
 *
 * - the value returned from `operation` in case all has gone good
 * - the value of the thrown error in case of failure
 * @param {(...args: any) => T} operation the function that produces the value of the result
 * @param {...any} args the parameters of the `operation` function
 */
export function resultOf<T>(operation: (...args: any) => T, ...args: any): Result<T> {
    try {
        return Result.ofSuccess<T>(operation(...args))
    } catch (e) {
        return Result.ofFailure<T>(e)
    }
}