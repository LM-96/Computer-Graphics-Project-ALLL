"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryClone = exports.isCopiable = void 0;
/**
 * Checks if an object implements `Copiable`
 * (exposes a method to have a shallow copy of the object)
 * @param {any} obj the object to be checked
 */
// @ts-ignore
function isCopiable(obj) {
    if (typeof obj == "object") {
        return 'copy' in obj;
    }
    return false;
}
exports.isCopiable = isCopiable;
/**
 * Checks if the given object is copiable and, if yes, returns the shallow copy, otherwise
 * returns the same object
 * @param {T} obj the object
 * @return a shallow copy of the object if possible, otherwise it returns the same object
 */
function tryClone(obj) {
    if (isCopiable(obj)) {
        return obj.copy();
    }
    return obj;
}
exports.tryClone = tryClone;
//# sourceMappingURL=copiable.js.map