"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractFunctionalObject = void 0;
/**
 * The abstract implementation of a `FunctionalObject`
 */
class AbstractFunctionalObject {
    map(mapper) {
        return mapper(this);
    }
    apply(block) {
        return block(this);
    }
}
exports.AbstractFunctionalObject = AbstractFunctionalObject;
//# sourceMappingURL=functional.js.map