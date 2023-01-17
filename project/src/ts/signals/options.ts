import {Signal, SignalName} from "./signal";

export type SignalHandler<S, D, R> = (signal: Signal<S, D, R>) => Promise<R>

export class SubscriptionOptions<S, D, R> {
    readonly signalName: SignalName
    readonly handler: SignalHandler<S, D, R>
}