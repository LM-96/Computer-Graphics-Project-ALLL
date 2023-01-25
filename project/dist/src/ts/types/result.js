"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Result_value, _Result_error;
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultOf = exports.Result = void 0;
const illegal_argument_exception_1 = require("./exceptions/illegal-argument-exception");
const illegal_state_exception_1 = require("./exceptions/illegal-state-exception");
class Result {
    /**
     * Creates and returns a new **successful** result which contains
     * a value
     * @param {T} value the value of the result
     * @return {Result<T>} the new successful result
     */
    static ofSuccess(value) {
        return new Result(value, null);
    }
    /**
     * Creates and returns a new **failure**, storing the error which caused it
     * @param {Error} error the error which caused the failure
     * @return {Result<void>} the new failed result
     */
    static ofFailure(error) {
        return new Result(null, error);
    }
    constructor(value, error) {
        _Result_value.set(this, void 0);
        _Result_error.set(this, void 0);
        if (__classPrivateFieldGet(this, _Result_value, "f") != null && __classPrivateFieldGet(this, _Result_error, "f") != null) {
            throw new illegal_argument_exception_1.IllegalArgumentException("value and error can NOT be non-null at the same time");
        }
        __classPrivateFieldSet(this, _Result_value, value, "f");
        __classPrivateFieldSet(this, _Result_error, error, "f");
    }
    /**
     * Returns the value of this result or `null` if it's a failure (so no result is owned)
     */
    getValue() {
        return __classPrivateFieldGet(this, _Result_value, "f");
    }
    /**
     * Returns the error of this result of `null` if it's a success (so no error is present)
     */
    getError() {
        return __classPrivateFieldGet(this, _Result_error, "f");
    }
    /**
     * Returns the value of this result, throwing an error if this result is a failure
     * @return {T} the value of this result
     * @throws {IllegalStateException} if this result is a failure
     */
    getValueOrThrow() {
        if (__classPrivateFieldGet(this, _Result_value, "f") == null)
            throw new illegal_state_exception_1.IllegalStateException("this result is a failure: no value is present");
        return __classPrivateFieldGet(this, _Result_value, "f");
    }
    /**
     * Returns the error of this result, throwing an error if this result is a success
     * @return {Error} the error of this result
     * @throws {IllegalStateException} if this result is a success
     */
    getErrorOrThrow() {
        if (__classPrivateFieldGet(this, _Result_error, "f") == null)
            throw new illegal_state_exception_1.IllegalStateException("this result is successful: no error is present");
        return __classPrivateFieldGet(this, _Result_error, "f");
    }
    /**
     * Returns `true` if this result is a **success** (then it has a value)
     */
    isSuccess() {
        return __classPrivateFieldGet(this, _Result_value, "f") != null;
    }
    /**
     * Returns `true` if this result is a **failure** (than it has the cause of the failure)
     */
    isFailure() {
        return __classPrivateFieldGet(this, _Result_error, "f") != null;
    }
    /**
     * Executes the given function if this result is a **failure** (then contains the error).
     * In that case the function will be invoked passing the error that caused the failure,
     * otherwise nothing is performed
     * @param {error: Error) => void} onError the function to be invoked in case of failure
     */
    withError(onError) {
        if (this.isFailure()) {
            onError(__classPrivateFieldGet(this, _Result_error, "f"));
        }
    }
    /**
     * Executes the given function if this result is a **success** (than contains a value).
     * In that case the function will be invoked passing the value of the result,
     * otherwise nothing is performed
     * @param {error: Error) => void} onValue the function to be invoked in case of success
     */
    withValue(onValue) {
        if (this.isSuccess()) {
            onValue(__classPrivateFieldGet(this, _Result_value, "f"));
        }
    }
}
exports.Result = Result;
_Result_value = new WeakMap(), _Result_error = new WeakMap();
/**
 * Executes the given `operation` catching all the errors.
 * The returning result has:
 *
 * - the value returned from `operation` in case all has gone good
 * - the value of the thrown error in case of failure
 * @param {(...args: any) => T} operation the function that produces the value of the result
 * @param {...any} args the parameters of the `operation` function
 */
function resultOf(operation, ...args) {
    try {
        return Result.ofSuccess(operation(...args));
    }
    catch (e) {
        return Result.ofFailure(e);
    }
}
exports.resultOf = resultOf;
//# sourceMappingURL=result.js.map