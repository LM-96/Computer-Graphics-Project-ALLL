import {SingleSignalTrigger} from "./trigger";
import {SingleSignalSubscriber, SubscriptionReceipt} from "./subscriptions";
import {Signal, SignalName} from "./signal";
import {MappedSingleSignalFlow} from "./mapped-single-signal-flow";
import {Pair, pairOf} from "../types/pair";
import {IllegalSignalNameException} from "./exceptions/illegal-signal-name-exception";
import {handler, SubscriptionOptions} from "./options";
import {Log} from "../log/log";

/**
 * A `flow` of signal intended as a component able to *accept* subscriptions and to *trigger* signals notifying
 * the subscribers.
 * This flow is *single* in the sense that is dedicated only to a specific *SignalName*
 */
export interface SingleSignalFlow<S, D, R> extends SingleSignalTrigger<S, D, R>, SingleSignalSubscriber<S, D, R> {
    signalName: SignalName
}

export default class SignalFlows {

    static readonly NEW_SIGNAL_SIGNAL_NAME: string = "signal-system.new"

    static #singleSignalFlows: Map<string, Pair<SignalName, SingleSignalFlow<any, any, any>>> =
        new Map<string, Pair<SignalName, SingleSignalFlow<any, any, any>>>()
    static #newSignalFlow: SingleSignalFlow<void, string, void> =
        new MappedSingleSignalFlow(new SignalName(SignalFlows.NEW_SIGNAL_SIGNAL_NAME))

    static newSingleFlow<S, D, R>(signalName: string): SingleSignalFlow<S, D, R> {
        if(this.#singleSignalFlows.has(signalName))
            throw new IllegalSignalNameException(signalName, "name already exists")

        let signalNameInst: SignalName = new SignalName(signalName)
        let flow: SingleSignalFlow<any, any, any> = new MappedSingleSignalFlow(signalNameInst)
        this.#singleSignalFlows.set(signalName, pairOf(signalNameInst, flow))
        this.#newSignalFlow.fire(null, signalName)
        Log.log("SignalSystem | registered signal " + signalName)

        return flow
    }

    static #getOrThrow(signalName: string): Pair<SignalName, SingleSignalFlow<any, any, any>> {
        let signalFlow: Pair<SignalName, SingleSignalFlow<any, any, any>> = this.#singleSignalFlows.get(signalName)
        if(signalFlow == undefined) {
            throw new IllegalSignalNameException(signalName, "no signal with this name")
        }

        return signalFlow
    }

    /**
     * Returns the global subscriber for the signal that is fired every time a new
     * signal is created and registered.
     * The signal will have the name `signal-system.new` and the data will be the name of the
     * new signal
     */
    static getNewSignalSubscriber(): SingleSignalSubscriber<any, string, any> {
        return this.#newSignalFlow
    }

    /**
     * Returns the `SignalName` associated to the signal with the given string of name or
     * `undefined` if the name is not registered
     * @param {string} signalName the string name of the signal
     * @return {SignalName} the `SignalName` instance associated with the given `name` or `undefined`
     * if no `SignalName` is associated with the given name
     */
    static getSignalName(signalName: string): SignalName {
        return this.#getOrThrow(signalName).getFirst()
    }

    /**
     * Returns the global subscriber for the given `signalName`
     * @param {SignalName} signalName the name of the signal
     * @returns {SingleSignalSubscriber} the global subscriber for the given `signalName`
     * @throws {IllegalSignalNameException} if the given `signalName` is not registered
     */
    static getSubscriber<S, D, R>(signalName: SignalName): SingleSignalSubscriber<S, D, R>
    /**
     * Returns the global subscriber for the given `signalName`
     * @param {string} signalName the string name of the signal
     * @returns {SingleSignalSubscriber} the global subscriber for the given `signalName`
     * @throws {IllegalSignalNameException} if the given `signalName` is not registered
     */
    static getSubscriber<S, D, R>(signalName: string): SingleSignalSubscriber<S, D, R>
    static getSubscriber<S, D, R>(signalName: string | SignalName): SingleSignalSubscriber<S, D, R>{
        if (typeof signalName === "string") {
            return this.#getOrThrow(signalName).getSecond()
        } else {
            return this.#getOrThrow(signalName.name).getSecond()
        }
    }

    /**
     * Immediately subscribes to the given `signalName` if already registered or
     * asynchronous waits for the signal to be registered and then subscribes to it
     * @param {SubscriptionOptions} options the options for the subscription
     * @param {(receipt: SubscriptionReceipt) => void} whenReceiptAvailable the callback with the receipt
     * that is called when the subscription receipt is available
     */
    static subscribeWhenRegistered<S, D, R>(
        signalName: string,
        options: SubscriptionOptions<S, D, R>,
        whenReceiptAvailable: (receipt: SubscriptionReceipt<S, D, R>) => void = () => {}): void {

        try {
            let receipt: SubscriptionReceipt<S, D, R> =
                this.getSubscriber(signalName).subscribe(options)
            whenReceiptAvailable(receipt)
            Log.log("SignalSystem | subscribed to signal " + signalName +
                " immediately with subscriptionId " + receipt.subscriptionId)
        } catch (e) {
            Log.log("SignalSystem | signal " + signalName + " not registered, waiting for registration")
            let newSignalReceipt: SubscriptionReceipt<void, string, void> =
                this.getNewSignalSubscriber()
                    .subscribe(handler((signal: Signal<void, string, void>) => {
                    if(signal.data === signalName) {
                        Log.log("SignalSystem | signal " + signalName + " registered, subscribing")
                        let receipt: SubscriptionReceipt<S, D, R> =
                            this.getSubscriber(signalName).subscribe(options)
                        whenReceiptAvailable(receipt)
                        this.getNewSignalSubscriber().unsubscribe(newSignalReceipt)
                    }
                }))
        }
    }

    /**
     * Gets an array containing all the signals that have correctly been registered
     * @return {Array<SignalName>} the array with all the registered signals
     */
    static getRegisteredSignals(): Array<SignalName> {
        let res: Array<SignalName> = []
        this.#singleSignalFlows.forEach(
            (value: Pair<SignalName, SingleSignalFlow<any, any, any>>, _: string) => {
            res.push(value.getFirst())
        })

        return res
    }

}