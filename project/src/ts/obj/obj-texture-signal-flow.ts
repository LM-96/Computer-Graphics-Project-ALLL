import SignalFlows, {SingleSignalFlow} from "../signals/flow";
import {Pair, pairOf} from "../types/pair";
import {SubscriptionReceipt} from "../signals/subscriptions";
import {handler} from "../signals/options";
import {Signal} from "../signals/signal";

export class ObjTextureSignalFlow {

    static readonly LOADED_TEXTURE_SIGNAL_STRING_NAME: string = "loadobjx.loaded-texture"
    static #appToReDrawWithTextureLoaded: string[] = []
    static #globalTextureLoadedReceipt: SubscriptionReceipt<void, Pair<string, string>, void>|null = null
    static #globalTextureLoadedHandler:
        ((signal: Signal<void, Pair<string, string>, void>) => void)|null = null

    static #flow: SingleSignalFlow<void, Pair<string, string>, void> =
        this.#createTextureFlow()

    static ensureDrawWithTextureLoaded(appName: string) {
        if(this.#globalTextureLoadedReceipt == null) {
            this.#globalTextureLoadedHandler = (signal: Signal<void, Pair<string, string>, void>) => {
                ObjTextureSignalFlow.#appToReDrawWithTextureLoaded.forEach((appName: string) => {
                    // @ts-ignore
                    window["APPLICATIONS"].get(appName).renderScene()
                })
            }
            this.#globalTextureLoadedReceipt =
                this.#flow.subscribe(handler(this.#globalTextureLoadedHandler))
        }
        if(this.#appToReDrawWithTextureLoaded.indexOf(appName) < 0) {
            this.#appToReDrawWithTextureLoaded.push(appName)
        }
    }

    static #createTextureFlow(): SingleSignalFlow<void, Pair<string, string>, void> {
        let res = SignalFlows.newSingleFlow<void, Pair<string, string>, void>(
            this.LOADED_TEXTURE_SIGNAL_STRING_NAME)
        ON_TEXTURE_READY = (name: string, path: string) => {
            res.fire(undefined, pairOf(name, path))
        }
        return res
    }

    static getTextureSubscriber(): SingleSignalFlow<void, Pair<string, string>, void> {
        return this.#flow
    }

}