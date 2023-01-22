"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformedNumberTrioChangeBuilder = exports.PerformedNumberTrioChange = void 0;
class PerformedNumberTrioChange {
    constructor(oldValue, newValue) {
        this.oldValue = oldValue;
        this.newValue = newValue;
        this.difference = oldValue.sub(newValue.getFirst(), newValue.getSecond(), newValue.getThird());
    }
}
exports.PerformedNumberTrioChange = PerformedNumberTrioChange;
class PerformedNumberTrioChangeBuilder {
    constructor(oldValue = null, newValue = null) {
        this.oldValue = oldValue;
        this.newValue = newValue;
    }
    /**
     * Builds a PerformedNumberTrioChange object throwing an error if one of the required fields is missing
     * @returns {PerformedNumberTrioChange} the built PerformedNumberTrioChange object
     * @throws {Error} if one of the required fields is missing
     */
    build() {
        if (this.oldValue == null) {
            throw new Error("Old value not set");
        }
        if (this.newValue == null) {
            throw new Error("New value not set");
        }
        return new PerformedNumberTrioChange(this.oldValue, this.newValue);
    }
    /**
     * Clears the builder by setting all fields to null
     */
    clear() {
        this.oldValue = null;
        this.newValue = null;
    }
}
exports.PerformedNumberTrioChangeBuilder = PerformedNumberTrioChangeBuilder;
//# sourceMappingURL=performed-number-trio-change.js.map