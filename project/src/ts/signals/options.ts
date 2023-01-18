import {Signal, SignalName} from "./signal";

export type SignalHandler<S, D, R> = (signal: Signal<S, D, R>) => R

export class SubscriptionOptions<S, D, R> {
    readonly signalName: SignalName = undefined
    readonly handler: SignalHandler<S, D, R>

    constructor(signalName: SignalName|undefined, handler: SignalHandler<S, D, R>) {
        this.signalName = signalName
        this.handler = handler
    }
}

/**
 * Creates and returns a new `SubscriptionOptions` which contains only the handler to be invoked when
 * the signal is triggered
 * @param {SignalHandler<S, D, R>} handler the asynchronous function that has to be invoked once a signal is triggered
 * @return {SubscriptionOptions<S, D, R>} the new created options ready to be passed to the `subscribe` function
 */
export function handler<S, D, R>(handler: SignalHandler<S, D, R>): SubscriptionOptions<S, D, R> {
    return new SubscriptionOptions<S, D, R>(undefined, handler)
}

/**
 * Creates and returns a new `SubscriptionOptions` which contains the name of the signal the options will refer to
 * and the handler to be invoked when the specified signal is triggered
 * @param {SignalName} signalName the name of the signal these options refer to
 * @param {SignalHandler<S, D, R>} handler the asynchronous function that has to be invoked once a signal is triggered
 * @return {SubscriptionOptions<S, D, R>} the new created options ready to be passed to the `subscribe` function
 */
export function handlerFor<S, D, R>(signalName: SignalName,
                                    handler: SignalHandler<S, D, R>): SubscriptionOptions<S, D, R> {
    return new SubscriptionOptions<S, D, R>(signalName, handler)
}