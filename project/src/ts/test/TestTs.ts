import {isEquatable} from "../types/equatable";

const TestMethod = Symbol('TestMethod')

/**
 * An exception that is thrown when a test is not passed
 */
class TestNotPassedException extends Error{

    readonly msg: string

    constructor(msg: string) {
        super(msg)
        this.msg = msg
        Object.setPrototypeOf(this, TestNotPassedException.prototype)
    }
}

/**
 * A method that is a **test** inside a *test case* class.
 * The method annotated with this decorator will be automatically executed as tests
 */
export function Test() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        target[TestMethod] = target[TestMethod] || new Map()
        target[TestMethod].set(propertyKey, descriptor.value)
    }
}

/**
 * A class that represents a *test case*.
 * The methods of this class that are annotated with the `@Test()` decorator will be automatically
 * executed
 */
export function TestCase<T extends { new(...args: any[]): {} }>(clazz: T) {
    let instance: any = new clazz()

    let lines: Array<string> = new Array<string>()
    let passed: Array<string> = new Array<string>()
    let notPassed: Array<string> = new Array<string>()
    for(let method of clazz.prototype[TestMethod]) {
        try {
            instance[method[0]]()
            passed.push(method[0])
            lines.push("[V] " + method[0] + ": passed")
        } catch (testNotPassedException: any) {
            if(testNotPassedException instanceof TestNotPassedException) {
                notPassed.push(method[0])
                lines.push("[X] " + method[0] + ": NOT PASSED: [" + testNotPassedException.msg + "]")
                console.log(testNotPassedException)
            } else {
                throw testNotPassedException
            }
        }
    }
    console.log("!-- " + clazz.name + " ---------------------------------!")
    console.log(
        "PASSED: \t" + passed.length + " \t[" + passed.join(", ") +
        "]\nNOT PASSED: \t" + notPassed.length + " \t[" + notPassed.join(", ") + "]")
    console.log("\t" + lines.join("\n\t") + "\n")
}

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
export function assertEquals<T>(expected: T, obj: T) {
    if(expected !== obj) {
        if(isEquatable(expected) && isEquatable(obj)) {
            if(obj.equals(expected))
                return
        }

        throw new TestNotPassedException(
            "expected [" + expected.toString() + ":" + getTypeName(expected) +
            "] but obtained [" +  obj.toString() + ":" + getTypeName(obj) + "]")
    }
}

/**
 * Assert that two object are *strictly* equals.
 * The *strictly* equality is the one that make the operator `===` returning `true`
 * @param {any} obj1 the first object
 * @param {any} obj2 the second object
 */
export function assertStrictEquals(obj1: any, obj2: any) {
    if(obj1 !== obj2) {
        throw new TestNotPassedException("expected strict equality but not obtained")
    }
}

/**
 * Assert that two object are *loosely* equals.
 * The *loosely* equality is the one that make the operator `==` returning `true`
 * @param {any} obj1 the first object
 * @param {any} obj2 the second object
 */
export function assertLooseEquals(obj1: any, obj2: any) {
    if(obj1 != obj2) {
        throw new TestNotPassedException("expected strict equality but not obtained")
    }
}

/**
 * Assert that two object are the *same* value.
 * If the assertion is `true`, that the two objects make `Object.is()` return `true`
 * @param {any} obj1 the first object
 * @param {any} obj2 the second object
 */
export function assertSame(obj1: any, obj2: any) {
    if(!Object.is(obj1, obj2)) {
        throw new TestNotPassedException("expected the same value but not obtained")
    }
}


export function getTypeName(obj: any): string {
    if(typeof obj == "object" || typeof obj == "function") {
        return obj.constructor.name
    }

    return typeof obj
}

/**
 * Assert that two arrays are *equals* using the same mechanism of `assertEquals()` on each correspondent
 * elements of the two arrays
 * @param {Array<T>} expected the expected array
 * @param {Array<T>} obj the object to be checked
 */
export function assertArrayEquals<T>(expected: Array<T>, obj: Array<T>) {
    if(!Array.isArray(expected)) {
        throw new TestNotPassedException("expected is instance of [" + getTypeName(expected) + "] but must be an array")
    }
    if(!Array.isArray(obj)) {
        throw new TestNotPassedException("obj is instance of [" + getTypeName(obj) + "] but must be an array")
    }
    if(expected.length != obj.length) {
        throw new TestNotPassedException("expected array length [" + expected.length
            + "] but obtained [" + obj.length + "]")
    }
    for(let i = 0; i < obj.length; i++) {
        try {
            assertEquals(expected[i], obj[i])
        } catch (testNotPassedException: any) {
            if(testNotPassedException instanceof TestNotPassedException) {
                throw new TestNotPassedException("different elements at index [" +
                    i + "]: " + testNotPassedException.msg)
            } else {
                throw testNotPassedException
            }
        }
    }
}

/**
 * Asserts that a condition is `true`
 * @param {boolean} condition the condition to be checked
 */
export function assertTrue(condition: boolean) {
    if(!condition) {
        throw new TestNotPassedException("expected [true] but obtained [false]")
    }
}

/**
 * Asserts that a condition is `false`
 * @param {boolean} condition the condition to be checked
 */
export function assertFalse(condition: boolean) {
    if(condition) {
        {
            throw new TestNotPassedException("expected [false] but obtained [true]")
        }
    }
}

/**
 * Assert the given object is `undefined`
 * @param {T} obj the object to be checked
 */
export function assertUndefined<T>(obj?: T) {
    if(obj != undefined) {
        throw new TestNotPassedException("expected [undefined] but obtained [" + obj.toString() + "]")
    }
}

/**
 * Assert the given object is **not** `undefined`
 * @param {T} obj the object to be checked
 */
export function assertNotUndefined<T>(obj: T) {
    if(obj == undefined) {
        throw new TestNotPassedException("expected not undefined but obtained [" + obj + "]")
    }
}

/**
 * Assert the given object is `null`
 * @param {T} obj the object to be checked
 */
export function assertNull<T>(obj?: T) {
    if(obj != null) {
        throw new TestNotPassedException("expected [null] but obtained [" + obj.toString() + "]")
    }
}

/**
 * Assert the given object is **not** `null`
 * @param {T} obj the object to be checked
 */
export function assertNotNull<T>(obj: T) {
    if(obj == undefined) {
        throw new TestNotPassedException("expected not undefined but obtained [" + obj + "]")
    }
}

/**
 * Assert the given function will throw a specific type of error
 * @param {Function} errorClass the type of the error that has to be thrown
 * @param {Function} fun the function that has to throw the error
 * @param {any} args the arguments to be passed to `fun`
 */
export function assertTrows(errorClass: Function, fun: Function, ...args: any) {
    try {
        fun(...args)
    } catch (e: any) {
        if(e instanceof errorClass) {
            return
        } else {
            throw new TestNotPassedException("expected error of type [" +
                errorClass.name + "] but obtained [" + getTypeName(e) + "]")
        }
    }
    throw new TestNotPassedException("expected error of type" + getTypeName(errorClass) +
        " but no error was thrown")
}

/**
 * Assert the given function will **not** throw a specific type of error
 * @param {Function} errorClass the type of the error that has to be thrown
 * @param {Function} fun the function that has to throw the error
 * @param {any} args the arguments to be passed to `fun`
 */
export function assertNotTrows(errorClass: Function, fun: Function, ...args: any) {
    try {
        fun(...args)
    } catch (e: any) {
        if(e instanceof errorClass) {
            throw new TestNotPassedException("expected no error of type [" +
                errorClass.name + "] but obtained [" + getTypeName(e) + "]")
        }
    }
}

/**
 * Assert the given function will **not** throw any exceptions
 * @param {Function} fun the function that has not to throw the error
 * @param {any} args the arguments to be passed to `fun`
 */
export function assertNoError(fun: Function, ...args: any) {
    try {
        fun(...args)
    } catch (e: any) {
        throw new TestNotPassedException("expected no error but thrown [" + getTypeName(e) + "]")
    }
}