"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeName = void 0;
/**
 * Returns the name of the type of the object looking for the class name if it's an object
 * or returning the primitive name if not
 * @param {any} obj the object
 * @return the name of the type of the object
 */
function getTypeName(obj) {
    if (typeof obj == "object" || typeof obj == "function") {
        return obj.constructor.name;
    }
    return typeof obj;
}
exports.getTypeName = getTypeName;
//# sourceMappingURL=types.js.map