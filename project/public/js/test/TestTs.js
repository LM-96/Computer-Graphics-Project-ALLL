"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNoError = exports.assertNotTrows = exports.assertTrows = exports.assertNotNull = exports.assertNull = exports.assertNotUndefined = exports.assertUndefined = exports.assertFalse = exports.assertTrue = exports.assertArrayEquals = exports.getTypeName = exports.assertSame = exports.assertLooseEquals = exports.assertStrictEquals = exports.assertEquals = exports.TestCase = exports.Test = void 0;
const equatable_1 = require("../types/equatable");
const TestMethod = Symbol('TestMethod');
/**
 * An exception that is thrown when a test is not passed
 */
class TestNotPassedException extends Error {
    constructor(msg) {
        super(msg);
        this.msg = msg;
        Object.setPrototypeOf(this, TestNotPassedException.prototype);
    }
}
/**
 * A method that is a **test** inside a *test case* class.
 * The method annotated with this decorator will be automatically executed as tests
 */
function Test() {
    return function (target, propertyKey, descriptor) {
        target[TestMethod] = target[TestMethod] || new Map();
        target[TestMethod].set(propertyKey, descriptor.value);
    };
}
exports.Test = Test;
/**
 * A class that represents a *test case*.
 * The methods of this class that are annotated with the `@Test()` decorator will be automatically
 * executed
 */
function TestCase(clazz) {
    let instance = new clazz();
    let lines = new Array();
    let passed = new Array();
    let notPassed = new Array();
    for (let method of clazz.prototype[TestMethod]) {
        try {
            instance[method[0]]();
            passed.push(method[0]);
            lines.push("[V] " + method[0] + ": passed");
        }
        catch (testNotPassedException) {
            if (testNotPassedException instanceof TestNotPassedException) {
                notPassed.push(method[0]);
                lines.push("[X] " + method[0] + ": NOT PASSED: [" + testNotPassedException.msg + "]");
                console.log(testNotPassedException);
            }
            else {
                throw testNotPassedException;
            }
        }
    }
    console.log("!-- " + clazz.name + " ---------------------------------!");
    console.log("PASSED: \t" + passed.length + " \t[" + passed.join(", ") +
        "]\nNOT PASSED: \t" + notPassed.length + " \t[" + notPassed.join(", ") + "]");
    console.log("\t" + lines.join("\n\t") + "\n");
}
exports.TestCase = TestCase;
/**
 * Asserts that two object arrays are *equal*.
 * This method first checks for the *reference equality* then, if it's not satisfied,
 * try to use the `equals()` method of the objects if they implement the `Equatable` interface.
 * This means that this method can be used to check:
 * - if two primitive types contains the same value
 * - if two variable refers to the same object
 * - if two objects that implements `Equatable` are equals<br>
 *
 * @param {T} expected the expected object
 * @param {T} obj the object to be checked
 * @throws {TestNotPassedException} if the test is not passed
 */
function assertEquals(expected, obj) {
    if (expected !== obj) {
        if ((0, equatable_1.isEquatable)(expected) && (0, equatable_1.isEquatable)(obj)) {
            if (obj.equals(expected))
                return;
        }
        throw new TestNotPassedException("expected [" + expected.toString() + ":" + getTypeName(expected) +
            "] but obtained [" + obj.toString() + ":" + getTypeName(obj) + "]");
    }
}
exports.assertEquals = assertEquals;
/**
 * Assert that two object are *strictly* equals.
 * The *strictly* equality is the one that make the operator `===` returning `true`
 * @param {any} obj1 the first object
 * @param {any} obj2 the second object
 */
function assertStrictEquals(obj1, obj2) {
    if (obj1 !== obj2) {
        throw new TestNotPassedException("expected strict equality but not obtained");
    }
}
exports.assertStrictEquals = assertStrictEquals;
/**
 * Assert that two object are *loosely* equals.
 * The *loosely* equality is the one that make the operator `==` returning `true`
 * @param {any} obj1 the first object
 * @param {any} obj2 the second object
 */
function assertLooseEquals(obj1, obj2) {
    if (obj1 != obj2) {
        throw new TestNotPassedException("expected strict equality but not obtained");
    }
}
exports.assertLooseEquals = assertLooseEquals;
/**
 * Assert that two object are the *same* value.
 * If the assertion is `true`, that the two objects make `Object.is()` return `true`
 * @param {any} obj1 the first object
 * @param {any} obj2 the second object
 */
function assertSame(obj1, obj2) {
    if (!Object.is(obj1, obj2)) {
        throw new TestNotPassedException("expected the same value but not obtained");
    }
}
exports.assertSame = assertSame;
function getTypeName(obj) {
    if (typeof obj == "object" || typeof obj == "function") {
        return obj.constructor.name;
    }
    return typeof obj;
}
exports.getTypeName = getTypeName;
/**
 * Assert that two arrays are *equals* using the same mechanism of `assertEquals()` on each correspondent
 * elements of the two arrays
 * @param {Array<T>} expected the expected array
 * @param {Array<T>} obj the object to be checked
 */
function assertArrayEquals(expected, obj) {
    if (!Array.isArray(expected)) {
        throw new TestNotPassedException("expected is instance of [" + getTypeName(expected) + "] but must be an array");
    }
    if (!Array.isArray(obj)) {
        throw new TestNotPassedException("obj is instance of [" + getTypeName(obj) + "] but must be an array");
    }
    if (expected.length != obj.length) {
        throw new TestNotPassedException("expected array length [" + expected.length
            + "] but obtained [" + obj.length + "]");
    }
    for (let i = 0; i < obj.length; i++) {
        try {
            assertEquals(expected[i], obj[i]);
        }
        catch (testNotPassedException) {
            if (testNotPassedException instanceof TestNotPassedException) {
                throw new TestNotPassedException("different elements at index [" +
                    i + "]: " + testNotPassedException.msg);
            }
            else {
                throw testNotPassedException;
            }
        }
    }
}
exports.assertArrayEquals = assertArrayEquals;
/**
 * Asserts that a condition is `true`
 * @param {boolean} condition the condition to be checked
 */
function assertTrue(condition) {
    if (!condition) {
        throw new TestNotPassedException("expected [true] but obtained [false]");
    }
}
exports.assertTrue = assertTrue;
/**
 * Asserts that a condition is `false`
 * @param {boolean} condition the condition to be checked
 */
function assertFalse(condition) {
    if (condition) {
        {
            throw new TestNotPassedException("expected [false] but obtained [true]");
        }
    }
}
exports.assertFalse = assertFalse;
/**
 * Assert the given object is `undefined`
 * @param {T} obj the object to be checked
 */
function assertUndefined(obj) {
    if (obj != undefined) {
        throw new TestNotPassedException("expected [undefined] but obtained [" + obj.toString() + "]");
    }
}
exports.assertUndefined = assertUndefined;
/**
 * Assert the given object is **not** `undefined`
 * @param {T} obj the object to be checked
 */
function assertNotUndefined(obj) {
    if (obj == undefined) {
        throw new TestNotPassedException("expected not undefined but obtained [" + obj + "]");
    }
}
exports.assertNotUndefined = assertNotUndefined;
/**
 * Assert the given object is `null`
 * @param {T} obj the object to be checked
 */
function assertNull(obj) {
    if (obj != null) {
        throw new TestNotPassedException("expected [null] but obtained [" + obj.toString() + "]");
    }
}
exports.assertNull = assertNull;
/**
 * Assert the given object is **not** `null`
 * @param {T} obj the object to be checked
 */
function assertNotNull(obj) {
    if (obj == undefined) {
        throw new TestNotPassedException("expected not undefined but obtained [" + obj + "]");
    }
}
exports.assertNotNull = assertNotNull;
/**
 * Assert the given function will throw a specific type of error
 * @param {Function} errorClass the type of the error that has to be thrown
 * @param {Function} fun the function that has to throw the error
 * @param {any} args the arguments to be passed to `fun`
 */
function assertTrows(errorClass, fun, ...args) {
    try {
        fun(...args);
    }
    catch (e) {
        if (e instanceof errorClass) {
            return;
        }
        else {
            throw new TestNotPassedException("expected error of type [" +
                errorClass.name + "] but obtained [" + getTypeName(e) + "]");
        }
    }
    throw new TestNotPassedException("expected error of type" + getTypeName(errorClass) +
        " but no error was thrown");
}
exports.assertTrows = assertTrows;
/**
 * Assert the given function will **not** throw a specific type of error
 * @param {Function} errorClass the type of the error that has to be thrown
 * @param {Function} fun the function that has to throw the error
 * @param {any} args the arguments to be passed to `fun`
 */
function assertNotTrows(errorClass, fun, ...args) {
    try {
        fun(...args);
    }
    catch (e) {
        if (e instanceof errorClass) {
            throw new TestNotPassedException("expected no error of type [" +
                errorClass.name + "] but obtained [" + getTypeName(e) + "]");
        }
    }
}
exports.assertNotTrows = assertNotTrows;
/**
 * Assert the given function will **not** throw any exceptions
 * @param {Function} fun the function that has not to throw the error
 * @param {any} args the arguments to be passed to `fun`
 */
function assertNoError(fun, ...args) {
    try {
        fun(...args);
    }
    catch (e) {
        throw new TestNotPassedException("expected no error but thrown [" + getTypeName(e) + "]");
    }
}
exports.assertNoError = assertNoError;
//# sourceMappingURL=TestTs.js.map