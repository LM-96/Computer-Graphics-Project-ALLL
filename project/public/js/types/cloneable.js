"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryClone = exports.isCloneable = void 0;
/**
 * Checks if an object implements `Cloneable`
 * (exposes a method to make a deep clone of the object)
 * @param {any} obj the object to be checked
 */
// @ts-ignore
function isCloneable(obj) {
    if (typeof obj == "object") {
        return 'clone' in obj;
    }
    return false;
}
exports.isCloneable = isCloneable;
/**
 * Checks if the given object is cloneable and, if yes, returns the clone, otherwise
 * returns the same object
 * @param {T} obj the object
 * @return a clone of the object if possible, otherwise it returns the same object
 */
function tryClone(obj) {
    if (isCloneable(obj)) {
        return obj.clone();
    }
    return obj;
}
exports.tryClone = tryClone;
//# sourceMappingURL=cloneable.js.map