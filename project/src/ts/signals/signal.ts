import {Equatable} from "../types/equatable";
import {Result, resultOf} from "../types/result";
import {Cloneable} from "../types/cloneable";

/**
 * The name of a signal
 */
export class SignalName implements Equatable{
    readonly name: string

    constructor(signalName: string) {
        this.name = signalName
    }

    equals(other: any): boolean {
        if(other != undefined) {
            if(other instanceof SignalName) {
                return other.name == this.name
            }
        }

        return false
    }
}

/**
 * A signal that is currently firing
 */
export class Signal<S, D, R> implements Cloneable<Signal<S, D, R>>{

    /**
     * The name of the signal
     */
    readonly name: SignalName

    /**
     * The source that fired the signal
     */
    readonly source: S

    /**
     * The data associated to the signal
     */
    readonly data: D

    constructor(name: SignalName, source: S, data: D) {
        this.name = name
        this.source = source
        this.data = data
    }

    clone(): Signal<S, D, R> {
        return new Signal<S, D, R>(this.name, this.source, this.data);
    }
}

/**
 * A signal that has previously been fired.
 * It contains also the firing signal that was received from the handlers and the that
 * in which the signal was fired
 */
export abstract class FiredSignal<S, D, R> {

    /**
     * The firing signal that was used by the handlers
     */
    readonly signal: Signal<S, D, R>

    /**
     * The time in which the signal was fired
     */
    readonly date: Date = new Date()

    protected constructor(signal: Signal<S, D, R>) {
        this.signal = signal
    }
}

/**
 * A synchronous fired signal.
 * This signal contains the result of the executed handlers associated by the subscription id
 */
export class SyncFiredSignal<S, D, R> extends FiredSignal<S, D, R> {

    readonly #result: Map<string, Result<R>> = new Map<string, Result<R>>()

    constructor(signal: Signal<S, D, R>, result: Map<string, Result<R>>) {
        super(signal);
        this.#result = result
    }

    /**
     * Gets the result of the given subscription
     * @param {string} subscriptionId the id of the desired subscription
     * @return {Result<R>} the result for the specified subscription or `undefined` if no
     * result is present for that subscription
     */
    getResultOf(subscriptionId: string): Result<R> {
        return this.#result.get(subscriptionId)
    }
}







