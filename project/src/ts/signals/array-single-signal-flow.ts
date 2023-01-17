import {FiredSignal, Signal, SignalName} from "./signal";
import {
    SingleSignalSubscriber,
    Subscription,
    SubscriptionReceipt,
    SubscriptionStatus,
    withSubscriptionStatusChanged
} from "./subscriptions";
import {SingleSignalTrigger} from "./trigger";
import {SubscriptionOptions} from "./options";

/**
 * A `flow` of signal intended as a component able to *accept* subscriptions and to *trigger* signals notifying
 * the subscribers.
 * This flow is *single* in the sense that is dedicated only to a specific *SignalName*
 */
export class ArraySingleSignalFlow<S, D, R> implements SingleSignalSubscriber<S, D, R>, SingleSignalTrigger<S, D, R>{

    readonly signalName: SignalName
    #id: number
    readonly #subscriptions: Map<string, Subscription<S, D, R>> = new Map<string, Subscription<S, D, R>>()

    subscribe(options: SubscriptionOptions<S, D, R>): SubscriptionReceipt<S, D, R> {
        let res: SubscriptionReceipt<S, D, R> = new SubscriptionReceipt<S, D, R>(
            this.signalName.name + "#" + this.#id.toString(),
            this.signalName,
            SubscriptionStatus.ACCEPTED)
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

    fire(source: S, data: D): FiredSignal<S, D, R> {
        let signal: Signal<S, D, R> = new Signal<S, D, R>(this.signalName, source, data)
        let results: Map<string, Promise<R>> = new Map<string, Promise<R>>()
        let currentResult: Promise<R>
        for(let subscription of this.#subscriptions.values()) {
            currentResult = subscription.options.handler(signal)
            results.set(subscription.receipt.subscriptionId, currentResult)
        }
        return new FiredSignal<S, D, R>(signal, results)
    }

}