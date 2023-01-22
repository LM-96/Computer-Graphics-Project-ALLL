import {Signal, SignalName} from "./signal";
import SignalFlows from "./flow";
import {SubscriptionReceipt} from "./subscriptions";

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

class SignalSubscriptionContinuation<D> {
    subscribeWhen: string|null = null
    subscribeWhenData: D|null = null

    unsubscribeWhen: string|null = null
    unsubscribeWhenData: D|null = null
}

const SignalToRegister = Symbol("SignalToRegister")

function getOrCreateSignalSubscriptionContinuation<D>(target: any,
                                                   propertyKey: string): SignalSubscriptionContinuation<D> {
    target[SignalToRegister] = target[SignalToRegister] || new Map<string, SignalSubscriptionContinuation<D>>()
    let signalSubscriptionContinuation = target[SignalToRegister].get(propertyKey)
    if(signalSubscriptionContinuation == undefined) {
        signalSubscriptionContinuation = new SignalSubscriptionContinuation()
        target[SignalToRegister].set(propertyKey, signalSubscriptionContinuation)
    }
    return signalSubscriptionContinuation
}

/**
 * Register a method as a signal handler for the give `signalName`
 * @param {string} signalName the name of the signal to subscribe to
 * @param {(receipt: SubscriptionReceipt<S, D, R>) => void} withReceipt the function that will be invoked
 * when the subscription is completed
 */
export function onSignal<S, D, R>(signalName: string) {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
        let options: SubscriptionOptions<S, D, R> = handler((signal: Signal<S, D, R>) => {
            return descriptor.value(signal)
        })
        SignalFlows.subscribeWhenRegistered(signalName, options)
    }
}

export function subscribeWhen<D>(otherSignal: string, signalData: D|null) {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
        let continuation : SignalSubscriptionContinuation<D> =
            getOrCreateSignalSubscriptionContinuation(target, propertyKey)
        continuation.subscribeWhen = otherSignal
        continuation.subscribeWhenData = signalData
    }
}

export function unsubscribeWhen<D>(otherSignal: string, signalData: D|null) {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
        let continuation : SignalSubscriptionContinuation<D> =
            getOrCreateSignalSubscriptionContinuation(target, propertyKey)
        continuation.unsubscribeWhen = otherSignal
        continuation.unsubscribeWhenData = signalData
    }
}