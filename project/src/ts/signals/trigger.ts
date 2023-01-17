import {FiredSignal, SignalName} from "./signal";
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
     * @return {FiredSignal<S, D, R>} the fired signal
     */
    fire(source: S, data: D): FiredSignal<S, D, R>
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
     * @return {FiredSignal<S, D, R>} the fired signal
     * @throws {UnsupportedSignalException} if the `signalName` is not supported from this trigger
     */
    fire<S, D, R>(signalName: SignalName, source: S, data: D): FiredSignal<S, D, R>
}