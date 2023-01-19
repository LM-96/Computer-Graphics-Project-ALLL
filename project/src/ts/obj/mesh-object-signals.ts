import {SignalName} from "../signals/signal";
import SignalFlows from "../signals/flow";

export class MeshObjectSignals {

    /**
     * The string name of the signal that is emitted when the object is loaded by the manager
     */
    static readonly OBJECT_LOADED_SIGNAL_STRING_NAME: string = "mesh-manager.loaded"

    /**
     * Creates the string name of the signal that is emitted when the object is translated
     * @param {string} name the name of the **mesh** object
     * @returns {string} the string name of the signal that is emitted when the object is translated
     */
    static translationSignalNameOf(name: string): string {
        return "mesh-objects." + name + ".translation"
    }

    /**
     * Creates the string name of the signal that is emitted when the object is polar rotated
     * @param {string} name the name of the **mesh** object
     * @returns {string} the string name of the signal that is emitted when the object is polar rotated
     */
    static polarRotationSignalNameOf(name: string): string {
        return "mesh-objects." + name + ".polar-rotation"
    }

    /**
     * Creates the string name of the signal that is emitted when the object is scaled
     * @param {string} name the name of the **mesh** object
     * @returns {string} the string name of the signal that is emitted when the object is scaled
     */
    static scaleSignalNameOf(name: string): string {
        return "mesh-objects." + name + ".translation"
    }

    /**
     * Returns the registered `SignalName` for the translation signal of the given object
     * @param {string} name the name of the **mesh** object
     * @returns {SignalName} the registered `SignalName` for the translation signal of the given object
     */
    static getTranslationSignalNameOf(name: string): SignalName {
        return SignalFlows.getSignalName(MeshObjectSignals.translationSignalNameOf(name))
    }

    /**
     * Returns the registered `SignalName` for the polar rotation signal of the given object
     * @param {string} name the name of the **mesh** object
     * @returns {SignalName} the registered `SignalName` for the polar rotation signal of the given object
     */
    static getPolarRotationSignalNameOf(name: string): SignalName {
        return SignalFlows.getSignalName(MeshObjectSignals.polarRotationSignalNameOf(name))
    }

    /**
     * Returns the registered `SignalName` for the scale signal of the given object
     * @param {string} name the name of the **mesh** object
     * @returns {SignalName} the registered `SignalName` for the scale signal of the given object
     */
    static getScaleSignalNameOf(name: string): SignalName {
        return SignalFlows.getSignalName(MeshObjectSignals.scaleSignalNameOf(name))
    }

}