import {MultipleSignalTrigger} from "./trigger";
import {MultipleSignalSubscriber, SubscriptionReceipt} from "./subscriptions";
import {SyncFiredSignal, SignalName} from "./signal";
import {SubscriptionOptions} from "./options";
import {SingleSignalFlow} from "./flow";
import {UnsupportedSignalException} from "./exceptions/unsupported-signal-exception";

class MappedMultipleSignalFlow implements MultipleSignalTrigger, MultipleSignalSubscriber {

    readonly #signalFlows: Map<SignalName, SingleSignalFlow<any, any, any>>

    #getSignalFlowOrThrow<S, D, R>(signalName: SignalName): SingleSignalFlow<S, D, R> {
        let res: SingleSignalFlow<any, any, any> = this.#signalFlows.get(signalName)
        if(res == undefined)
            throw new UnsupportedSignalException(signalName, this)
        return res
    }

    fire<S, D, R>(signalName: SignalName, source: S, data: D): SyncFiredSignal<S, D, R> {
        let flow: SingleSignalFlow<S, D, R> = this.#getSignalFlowOrThrow<S, D, R>(signalName)
        return flow.fire(source, data)
    }

    subscribe<S, D, R>(options:SubscriptionOptions<S, D, R>): SubscriptionReceipt<S, D, R> {
        let flow: SingleSignalFlow<S, D, R> = this.#getSignalFlowOrThrow(options.signalName)
        return flow.subscribe(options)
    }

    unsubscribe<S, D, R>(subscriptionReceipt: SubscriptionReceipt<S, D, R>): SubscriptionReceipt<S, D, R> {
        let flow: SingleSignalFlow<S, D, R> = this.#getSignalFlowOrThrow(subscriptionReceipt.signalName)
        return flow.unsubscribe(subscriptionReceipt)
    }

}