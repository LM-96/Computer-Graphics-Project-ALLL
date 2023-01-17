import {Arrays} from "../types/arrays";

export interface SignalHandler<S, D> {
    handle(signal: Signal<S, D>): void
}

export interface AsyncSignalHandler<S, D, R> {
    handle(signal: Signal<S, D>): Promise<R>
}

export class SignalName {
    readonly name: string
}

export class Signal<S, D> {
    readonly name: SignalName
    readonly source: S
    readonly data: D

    constructor(name: SignalName, source: S, data: D) {
        this.name = name
        this.source = source
        this.data = data
    }
}

export class FiredSignal<S, D> {
    readonly signal: Signal<S, D>
    readonly handlerPromises: Array<Promise<void>>

    constructor(signal: Signal<S, D>, handlerPromises: Array<Promise<void>>) {
        this.signal = signal
        this.handlerPromises = handlerPromises
    }

}

export interface SignalSubscriber<S, D> {
    subscribe(handler: SignalHandler<S, D>): void
    unsubscribe(handler: SignalHandler<S, D>): void
}

export interface SignalTrigger<S, D> {
    fire(signalName: SignalName, source: S, data: D): void
}

export class ArraySignalSubscriber<S, D> implements SignalSubscriber<S, D>, SignalTrigger<S, D>{

    readonly #handlers: Array<SignalHandler<S, D>> = []

    subscribe(handler: SignalHandler<S, D>): void {
        this.#handlers.push(handler)
    }

    unsubscribe(handler: SignalHandler<S, D>): void {
        Arrays.removeFrom(this.#handlers, handler)
    }

    fire(signalName: SignalName, source: S, data: D): FiredSignal<S, D> {
        let signal: Signal<S, D> = new Signal<S, D>(signalName, source, data)
        let promises: Array<Promise<any>> = []
        for(let handler of this.#handlers)
            promises.push(handler.handle(signal))
        return new FiredSignal<S, D>(signal, promises)
    }

}