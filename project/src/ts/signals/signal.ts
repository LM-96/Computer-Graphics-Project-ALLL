import {Equatable} from "../types/equatable";

export class SignalName implements Equatable{
    readonly name: string

    equals(other: any): boolean {
        if(other != undefined) {
            if(other instanceof SignalName) {
                return other.name == this.name
            }
        }

        return false
    }
}

export class Signal<S, D, R> {
    readonly name: SignalName
    readonly source: S
    readonly data: D

    constructor(name: SignalName, source: S, data: D) {
        this.name = name
        this.source = source
        this.data = data
    }
}

export class FiredSignal<S, D, R> {
    readonly signal: Signal<S, D, R>
    readonly results: Map<string, Promise<R>>

    constructor(signal: Signal<S, D, R>, results: Map<string, Promise<R>>) {
        this.signal = signal
        this.results = results
    }

}





