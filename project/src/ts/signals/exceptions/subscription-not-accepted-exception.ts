import {SubscriptionOptions} from "../options";

export class SubscriptionNotAcceptedException<S, D, R> extends Error {

    readonly requestedOptions: SubscriptionOptions<S, D, R>
    readonly cause: string

    constructor(requestedOptions: SubscriptionOptions<S, D, R>, cause: string) {
        super("subscription can not be accepted: " + cause)
        this.requestedOptions = requestedOptions
        this.cause = cause
        Object.setPrototypeOf(this, SubscriptionNotAcceptedException.prototype)
    }

}