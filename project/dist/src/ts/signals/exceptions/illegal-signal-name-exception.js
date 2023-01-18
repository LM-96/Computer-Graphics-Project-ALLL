"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IllegalSignalNameException = void 0;
class IllegalSignalNameException extends Error {
    constructor(nameAttempted, cause) {
        super("signal name \"" + nameAttempted + "\" is not valid: " + cause);
        this.nameAttempted = nameAttempted;
        this.cause = cause;
        Object.setPrototypeOf(this, IllegalSignalNameException.prototype);
    }
}
exports.IllegalSignalNameException = IllegalSignalNameException;
//# sourceMappingURL=illegal-signal-name-exception.js.map