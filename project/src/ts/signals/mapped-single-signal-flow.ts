import {SyncFiredSignal, Signal, SignalName} from "./signal";
import {
    SingleSignalSubscriber,
    Subscription,
    SubscriptionReceipt,
    SubscriptionStatus,
    withSubscriptionStatusChanged
} from "./subscriptions";
import {SubscriptionOptions} from "./options";
import {SingleSignalFlow} from "./flow";
import {Result, resultOf} from "../types/result";
import {Log} from "../log/log";

/**
 * An implementation of `SingleSignalFlow` based on a map
 */
export class MappedSingleSignalFlow<S, D, R> implements SingleSignalFlow<S, D, R> {

    readonly signalName: SignalName
    #id: number = 0
    readonly #subscriptions: Map<string, Subscription<S, D, R>> = new Map<string, Subscription<S, D, R>>()

    constructor(signalName: SignalName) {
        this.signalName = signalName
    }

    subscribe(options: SubscriptionOptions<S, D, R>): SubscriptionReceipt<S, D, R> {
        let res: SubscriptionReceipt<S, D, R> = new SubscriptionReceipt<S, D, R>(
            this.signalName.name + "#" + this.#id.toString(),
            this.signalName,
            SubscriptionStatus.ACCEPTED)
        this.#id++
        let subscription: Subscription<S, D, R> = new Subscription(res, options)
        this.#subscriptions.set(res.subscriptionId, subscription)
        return res
    }

    unsubscribe(subscriptionReceipt: SubscriptionReceipt<S, D, R>): SubscriptionReceipt<S, D, R> {
        if(this.#subscriptions.delete(subscriptionReceipt.subscriptionId)) {
            return withSubscriptionStatusChanged(subscriptionReceipt, SubscriptionStatus.UNSUBSCRIBED)
        }
        return null
    }

    fire(source: S, data: D): SyncFiredSignal<S, D, R> {
        Log.log("SignalSystem | firing signal " + this.signalName.name)
        let signal: Signal<S, D, R> = new Signal<S, D, R>(this.signalName, source, data)
        let results: Map<string, Result<R>> = new Map<string, Result<R>>()
        let currentResult: Result<R>
        for(let subscription of this.#subscriptions.values()) {
            Log.log("SignalSystem | firing signal " + this.signalName.name + " to subscriber " + subscription.receipt.subscriptionId)
            currentResult = resultOf(subscription.options.handler, signal.clone())
            results.set(subscription.receipt.subscriptionId, currentResult)
        }
        Log.log("SignalSystem | signal " + this.signalName.name + " fired")
        return new SyncFiredSignal<S, D, R>(signal, results)
    }

}