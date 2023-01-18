import {SubscriptionOptions} from "./options";
import {SignalName} from "./signal";
import {SubscriptionNotAcceptedException} from "./exceptions/subscription-not-accepted-exception";
import {UnsupportedSignalException} from "./exceptions/unsupported-signal-exception";

/**
 * The status of a subscription
 */
export enum SubscriptionStatus {
    ACCEPTED = "ACCEPTED", DENIED = "DENIED", UNSUBSCRIBED = "UNSUBSCRIBED"
}

/**
 * The receipt of a subscription
 */
export class SubscriptionReceipt<S, D, R> {

    /**
     * The unique `id` of the subscription
     */
    readonly subscriptionId: string

    /**
     * The name of the signal the subscription is interested
     */
    readonly signalName: SignalName

    readonly status: SubscriptionStatus

    constructor(subscriptionId: string, signalName: SignalName, currentStatus: SubscriptionStatus) {
        this.subscriptionId = subscriptionId
        this.signalName = signalName
        this.status = currentStatus
    }
}

/**
 * Returns a new `SubscriptionReceipt` with a new status
 * @param {SubscriptionReceipt<S, D, R>} oldReceipt the old receipt
 * @param {SubscriptionStatus} newStatus the new status of the subscription
 * @return {SubscriptionReceipt<S, D, R>} the new receipt with the changed status
 */
export function withSubscriptionStatusChanged<S, D, R>(
    oldReceipt: SubscriptionReceipt<S, D, R>, newStatus: SubscriptionStatus): SubscriptionReceipt<S, D, R> {
    return new SubscriptionReceipt<S, D, R>(oldReceipt.subscriptionId, oldReceipt.signalName, newStatus)
}

/**
 * A processed subscription
 */
export class Subscription<S, D, R> {

    /**
     * The receipt produced during the subscription process
     */
    readonly receipt: SubscriptionReceipt<S, D, R>

    /**
     * The options used to subscribe
     */
    readonly options: SubscriptionOptions<S, D, R>
    isActive: boolean

    constructor(result: SubscriptionReceipt<S, D, R>, subscriber: SubscriptionOptions<S, D, R>) {
        this.receipt = result
        this.options = subscriber
    }
}

/**
 * A component able to accept subscriptions to a specific signal
 */
export interface SingleSignalSubscriber<S, D, R> {

    /**
     * The signal this subscriber refers to
     */
    readonly signalName: SignalName

    /**
     * Accepts a subscription following the requested option, if possible, returning a **receipt**.
     * The receipt can be used to refer to the subscription, and it is needed to *unsubscribe*, so
     * *don't lose it!*<br>
     * This method can throw an error is something is wrong
     * @param {SubscriptionOptions<S, D, R>} options the options for the subscription
     * @return {SubscriptionReceipt<S, D, R>} the receipt of the subscription
     * @throws {SubscriptionNotAcceptedException} if the subscription can not be accepted
     */
    subscribe(options: SubscriptionOptions<S, D, R>): SubscriptionReceipt<S, D, R>

    /**
     * Removes a previously registered subscription, returning a new updated receipt.
     * In order to unsubscribe a previously registered subscription, it is needed the
     * receipt emitted in the subscription phase
     * If no su
     * @param {SubscriptionReceipt<S, D, R>} subscriptionReceipt the receipt produced as result of the subscription
     * @return {SubscriptionReceipt<S, D, R>} the new receipt or `null` if the subscription is not present
     */
    unsubscribe(subscriptionReceipt: SubscriptionReceipt<S, D, R>): SubscriptionReceipt<S, D, R>

}

export interface MultipleSignalSubscriber {
    /**
     * Accept a subscription following the requested options, if possible, returning a *receipt*.
     * The options **must** include the interested signal(s).
     * The receipt can be used to refer to the subscription, and it is needed to *unsubscribe*, so
     * *don't lose it!*<br>
     * This method can throw an error is something is wrong
     * @param {SubscriptionOptions<S, D, R>} options the options for the subscription
     * @return {SubscriptionReceipt<S, D, R>} the receipt of the subscription
     * @throws {UnsupportedSignalException} if the subscription is for one or more signals that are not supported
     * @throws {SubscriptionNotAcceptedException} if the subscription can not be accepted
     */
    subscribe<S, D, R>(options: SubscriptionOptions<S, D, R>): SubscriptionReceipt<S, D, R>

    /**
     * Removes a previously registered subscription, returning a new updated receipt.
     * In order to unsubscribe a previously registered subscription, it is needed the
     * receipt emitted in the subscription phase
     * If no su
     * @param {SubscriptionReceipt<S, D, R>} subscriptionReceipt the receipt produced as result of the subscription
     * @return {SubscriptionReceipt<S, D, R>} the new receipt or `null` if the subscription is not present
     */
    unsubscribe<S, D, R>(subscriptionReceipt: SubscriptionReceipt<S, D, R>): SubscriptionReceipt<S, D, R>
}