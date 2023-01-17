"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionNotAcceptedException = void 0;
class SubscriptionNotAcceptedException extends Error {
    constructor(requestedOptions, cause) {
        super("subscription can not be accepted: " + cause);
        this.requestedOptions = requestedOptions;
        this.cause = cause;
        Object.setPrototypeOf(this, SubscriptionNotAcceptedException.prototype);
    }
}
exports.SubscriptionNotAcceptedException = SubscriptionNotAcceptedException;
//# sourceMappingURL=subscription-not-accepted-exception.js.map