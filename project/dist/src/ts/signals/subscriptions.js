"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = exports.withSubscriptionStatusChanged = exports.SubscriptionReceipt = exports.SubscriptionStatus = void 0;
/**
 * The status of a subscription
 */
var SubscriptionStatus;
(function (SubscriptionStatus) {
    SubscriptionStatus["ACCEPTED"] = "ACCEPTED";
    SubscriptionStatus["DENIED"] = "DENIED";
    SubscriptionStatus["UNSUBSCRIBED"] = "UNSUBSCRIBED";
})(SubscriptionStatus = exports.SubscriptionStatus || (exports.SubscriptionStatus = {}));
/**
 * The receipt of a subscription
 */
class SubscriptionReceipt {
    constructor(subscriptionId, signalName, currentStatus) {
        this.subscriptionId = subscriptionId;
        this.signalName = signalName;
        this.status = currentStatus;
    }
}
exports.SubscriptionReceipt = SubscriptionReceipt;
/**
 * Returns a new `SubscriptionReceipt` with a new status
 * @param {SubscriptionReceipt<S, D, R>} oldReceipt the old receipt
 * @param {SubscriptionStatus} newStatus the new status of the subscription
 * @return {SubscriptionReceipt<S, D, R>} the new receipt with the changed status
 */
function withSubscriptionStatusChanged(oldReceipt, newStatus) {
    return new SubscriptionReceipt(oldReceipt.subscriptionId, oldReceipt.signalName, newStatus);
}
exports.withSubscriptionStatusChanged = withSubscriptionStatusChanged;
/**
 * A processed subscription
 */
class Subscription {
    constructor(result, subscriber) {
        this.receipt = result;
        this.options = subscriber;
    }
}
exports.Subscription = Subscription;
//# sourceMappingURL=subscriptions.js.map