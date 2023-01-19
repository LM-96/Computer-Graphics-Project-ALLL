import {SyncFiredSignal, SignalName} from "./signal";
import {UnsupportedSignalException} from "./exceptions/unsupported-signal-exception";

/**
 * A *trigger* for a dedicated `SignalName`
 */
export interface SingleSignalTrigger<S, D, R> {

    /**
     * The `SignalName` this trigger is dedicated for
     */
    readonly signalName: SignalName

    /**
     * Triggers the signal from the given `source` and with the given `data`
     * @param {S} source the source that causes the trigger
     * @param {D} data the data associated to the signal
     * @return {SyncFiredSignal<S, D, R>} the fired signal with the results
     */
    fire(source: S, data: D): SyncFiredSignal<S, D, R>
}

/**
 * A *trigger* able to fire multiple `SignalName`
 * It has a finite set of signals that is able to support
 */
export interface MultipleSignalTrigger {

    /**
     * Triggers the signal with the given `SignalName` from the given `source` and `data`
     * @param {SignalName} signalName the `SignalName` that has to be fired
     * @param {S} source the source that causes the trigger
     * @param {D} data the data associated to the signal
     * @return {SyncFiredSignal<S, D, R>} the fired signal
     * @throws {UnsupportedSignalException} if the `signalName` is not supported from this trigger
     */
    fire<S, D, R>(signalName: SignalName, source: S, data: D): SyncFiredSignal<S, D, R>
}

/**
 * Fires multiple triggers
 * @param {S} source the source that causes the trigger
 * @param {D} data the data associated to the signal
 * @param {Array<SingleSignalTrigger<S, D, R>>} triggers the triggers to be fired
 * @return {Array<SyncFiredSignal<S, D, R>>} the fired signals
 */
export function fireAll<S, D, R>(source: S, data: D,
                                 ...triggers: Array<SingleSignalTrigger<S, D, R>>): Array<SyncFiredSignal<S, D, R>> {
    let res: Array<SyncFiredSignal<S, D, R>> = []
    for (let trigger of triggers) {
        res.push(trigger.fire(source, data))
    }

    return res
}