"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.equals = exports.isEquatable = void 0;
/**
 * Checks if an object implements `Equatable`
 * @param {any} obj the object to be checked
 */
function isEquatable(obj) {
    if (typeof obj == "object") {
        return 'equals' in obj;
    }
    return false;
}
exports.isEquatable = isEquatable;
/**
 * Checks if the two objects implement `Equatable` and, in that case, uses the `equals` of
 * `Equatable` to check if the two objects are equals; otherwise it will use the normal `===` operator
 * @param {any} obj1 the first object
 * @param {any} obj2 the second object
 * @return {boolean} `true` if two object are equals following the explained criteria, `false` otherwise
 */
function equals(obj1, obj2) {
    if (isEquatable(obj1) && isEquatable(obj2)) {
        return obj1.equals(obj2);
    }
    return obj1 === obj2;
}
exports.equals = equals;
//# sourceMappingURL=equatable.js.map