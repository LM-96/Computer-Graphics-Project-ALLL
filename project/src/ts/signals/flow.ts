import {SingleSignalTrigger} from "./trigger";
import {SingleSignalSubscriber} from "./subscriptions";
import {SignalName} from "./signal";
import {MappedSingleSignalFlow} from "./mapped-single-signal-flow";
import {Pair, pairOf} from "../types/pair";
import {IllegalSignalNameException} from "./exceptions/illegal-signal-name-exception";

/**
 * A `flow` of signal intended as a component able to *accept* subscriptions and to *trigger* signals notifying
 * the subscribers.
 * This flow is *single* in the sense that is dedicated only to a specific *SignalName*
 */
export interface SingleSignalFlow<S, D, R> extends SingleSignalTrigger<S, D, R>, SingleSignalSubscriber<S, D, R> {
    signalName: SignalName
}

export default class SignalFlows {

    static #singleSignalFlows: Map<string, Pair<SignalName, SingleSignalFlow<any, any, any>>> =
        new Map<string, Pair<SignalName, SingleSignalFlow<any, any, any>>>()

    static newSingleFlow<S, D, R>(signalName: string): SingleSignalFlow<S, D, R> {
        if(this.#singleSignalFlows.has(signalName))
            throw new IllegalSignalNameException(signalName, "name already exists")

        let signalNameInst: SignalName = new SignalName(signalName)
        let flow: SingleSignalFlow<any, any, any> = new MappedSingleSignalFlow(signalNameInst)
        this.#singleSignalFlows.set(signalName, pairOf(signalNameInst, flow))

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
     * @param signalName
     */
    static getSubscriber<S, D, R>(signalName: string): SingleSignalSubscriber<S, D, R> {
        return this.#getOrThrow(signalName).getSecond()
    }

}