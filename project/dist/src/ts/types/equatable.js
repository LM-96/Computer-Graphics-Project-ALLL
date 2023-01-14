"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEquatable = void 0;
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
//# sourceMappingURL=equatable.js.map