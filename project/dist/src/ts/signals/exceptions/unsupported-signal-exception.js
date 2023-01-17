"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnsupportedSignalException = void 0;
const types_1 = require("../../types/types");
class UnsupportedSignalException extends Error {
    constructor(signalName, obj = undefined) {
        super(signalName.name + " is not supported for " + (0, types_1.getTypeName)(obj));
        this.unsupportedSignalName = signalName;
        Object.setPrototypeOf(this, UnsupportedSignalException.prototype);
    }
}
exports.UnsupportedSignalException = UnsupportedSignalException;
//# sourceMappingURL=unsupported-signal-exception.js.map