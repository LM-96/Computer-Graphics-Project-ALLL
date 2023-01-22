"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeshObjectSignals = void 0;
const flow_1 = require("../signals/flow");
class MeshObjectSignals {
    /**
     * Creates the string name of the signal that is emitted when the object is translated
     * @param {string} name the name of the **mesh** object
     * @returns {string} the string name of the signal that is emitted when the object is translated
     */
    static translationSignalNameOf(name) {
        return "mesh-objects." + name + ".translation";
    }
    /**
     * Creates the string name of the signal that is emitted when the object is polar rotated
     * @param {string} name the name of the **mesh** object
     * @returns {string} the string name of the signal that is emitted when the object is polar rotated
     */
    static polarRotationSignalNameOf(name) {
        return "mesh-objects." + name + ".polar-rotation";
    }
    /**
     * Creates the string name of the signal that is emitted when the object is scaled
     * @param {string} name the name of the **mesh** object
     * @returns {string} the string name of the signal that is emitted when the object is scaled
     */
    static scaleSignalNameOf(name) {
        return "mesh-objects." + name + ".scale";
    }
    /**
     * Returns the registered `SignalName` for the translation signal of the given object
     * @param {string} name the name of the **mesh** object
     * @returns {SignalName} the registered `SignalName` for the translation signal of the given object
     */
    static getTranslationSignalNameOf(name) {
        return flow_1.default.getSignalName(MeshObjectSignals.translationSignalNameOf(name));
    }
    /**
     * Returns the registered `SignalName` for the polar rotation signal of the given object
     * @param {string} name the name of the **mesh** object
     * @returns {SignalName} the registered `SignalName` for the polar rotation signal of the given object
     */
    static getPolarRotationSignalNameOf(name) {
        return flow_1.default.getSignalName(MeshObjectSignals.polarRotationSignalNameOf(name));
    }
    /**
     * Returns the registered `SignalName` for the scale signal of the given object
     * @param {string} name the name of the **mesh** object
     * @returns {SignalName} the registered `SignalName` for the scale signal of the given object
     */
    static getScaleSignalNameOf(name) {
        return flow_1.default.getSignalName(MeshObjectSignals.scaleSignalNameOf(name));
    }
    /**
     * Returns the subscriber for the translation signal of the given object
     * @param {MeshObject} obj the object
     * @returns {SingleSignalSubscriber<PerformedTranslation>} the subscriber for the translation signal of the given object     *
     */
    static getTranslationSubscriberOf(obj) {
        return flow_1.default.getSubscriber(MeshObjectSignals.translationSignalNameOf(obj.getName()));
    }
}
exports.MeshObjectSignals = MeshObjectSignals;
/**
 * The string name of the signal that is emitted when the object is loaded by the manager
 */
MeshObjectSignals.OBJECT_LOADED_SIGNAL_STRING_NAME = "mesh-manager.loaded";
//# sourceMappingURL=mesh-object-signals.js.map