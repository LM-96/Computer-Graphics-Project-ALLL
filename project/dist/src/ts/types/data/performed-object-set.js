"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformedObjectSetBuilder = exports.PerformedObjectSet = void 0;
class PerformedObjectSet {
    constructor(oldValue, newValue) {
        this.oldValue = oldValue;
        this.newValue = newValue;
    }
}
exports.PerformedObjectSet = PerformedObjectSet;
class PerformedObjectSetBuilder {
    constructor(oldValue = null, newValue = null) {
        this.oldValue = oldValue;
        this.newValue = newValue;
    }
    /**
     * Builds a new PerformedObjectSet instance throwing an error if the oldValue or newValue is null
     * @returns {PerformedObjectSet<T>} the new PerformedObjectSet instance
     * @throws {Error} if the oldValue or newValue is null
     */
    build() {
        if (this.oldValue == null) {
            throw new Error("oldValue is null");
        }
        if (this.newValue == null) {
            throw new Error("newValue is null");
        }
        return new PerformedObjectSet(this.oldValue, this.newValue);
    }
    /**
     * Clears this builder by setting the oldValue and newValue to `null`
     */
    clear() {
        this.oldValue = null;
        this.newValue = null;
    }
}
exports.PerformedObjectSetBuilder = PerformedObjectSetBuilder;
//# sourceMappingURL=performed-object-set.js.map