"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ArrayRRSCallbackContainer_onTranslation, _ArrayRRSCallbackContainer_onRotation, _ArrayRRSCallbackContainer_onDilation;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayRRSCallbackContainer = void 0;
const arrays_1 = require("../../types/arrays");
class ArrayRRSCallbackContainer {
    constructor() {
        _ArrayRRSCallbackContainer_onTranslation.set(this, new Array());
        _ArrayRRSCallbackContainer_onRotation.set(this, new Array());
        _ArrayRRSCallbackContainer_onDilation.set(this, new Array());
    }
    addOnRotation(block) {
        __classPrivateFieldGet(this, _ArrayRRSCallbackContainer_onRotation, "f").push(block);
    }
    addOnDilation(block) {
        __classPrivateFieldGet(this, _ArrayRRSCallbackContainer_onDilation, "f").push(block);
    }
    addOnTranslation(block) {
        __classPrivateFieldGet(this, _ArrayRRSCallbackContainer_onTranslation, "f").push(block);
    }
    removeOnRotation(block) {
        arrays_1.Arrays.removeFrom(__classPrivateFieldGet(this, _ArrayRRSCallbackContainer_onRotation, "f"), block);
    }
    removeOnDilation(block) {
        arrays_1.Arrays.removeFrom(__classPrivateFieldGet(this, _ArrayRRSCallbackContainer_onDilation, "f"), block);
    }
    removeOnTranslation(block) {
        arrays_1.Arrays.removeFrom(__classPrivateFieldGet(this, _ArrayRRSCallbackContainer_onTranslation, "f"), block);
    }
    notifyTranslation(oldPosition, delta, newPosition) {
        for (let callback of __classPrivateFieldGet(this, _ArrayRRSCallbackContainer_onTranslation, "f"))
            callback(oldPosition, delta, newPosition);
    }
    notifyRotation(startRotation, delta, endRotation) {
        for (let callback of __classPrivateFieldGet(this, _ArrayRRSCallbackContainer_onRotation, "f"))
            callback(startRotation, delta, endRotation);
    }
    notifyScale(startScale, delta, endScale) {
        for (let callback of __classPrivateFieldGet(this, _ArrayRRSCallbackContainer_onDilation, "f"))
            callback(startScale, delta, endScale);
    }
}
exports.ArrayRRSCallbackContainer = ArrayRRSCallbackContainer;
_ArrayRRSCallbackContainer_onTranslation = new WeakMap(), _ArrayRRSCallbackContainer_onRotation = new WeakMap(), _ArrayRRSCallbackContainer_onDilation = new WeakMap();
//# sourceMappingURL=array-rrs-callbacks.js.map