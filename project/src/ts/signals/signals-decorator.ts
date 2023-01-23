import {Log} from "../log/log";
import {Signal} from "./signal";
import SignalFlows from "./flow";
import {handler, SubscriptionOptions} from "./options";

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
export function OnSignal<S, D, R>(signalName: string) {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
        Log.log("onSignal | registering signal handler for signal " + signalName + " on method " + propertyKey)
        let options: SubscriptionOptions<S, D, R> = handler((signal: Signal<S, D, R>) => {
            return descriptor.value(signal)
        })
        SignalFlows.subscribeWhenRegistered(signalName, options)
    }
}

export const OnSignalSubMethod = Symbol("OnSignalMethod")

export function OnSignalMethod<S, D, R>(signalName: string) {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
        Log.log("onSignal | registering signal handler for signal " + signalName + " on method " + propertyKey)
        target[OnSignalSubMethod] = target[OnSignalSubMethod] || new Map<string, string>()
        target[OnSignalSubMethod].set(propertyKey, signalName)
    }
}

export function SignalListener<T extends { new(...args: any[]): {} }>(Base: T) {
    return class extends Base {
        constructor(...args: any[]) {
            super(...args)
            const onSignalMethods = Base.prototype[OnSignalSubMethod]
            if(onSignalMethods != undefined) {
                onSignalMethods.forEach((signalName: string, methodName: string) => {
                    let options: SubscriptionOptions<any, any, any> = handler(
                        (signal: Signal<any, any, any>) => {
                            return (this as any)[methodName](signal)
                        })
                    SignalFlows.subscribeWhenRegistered(signalName, options);
                })
            }
        }
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