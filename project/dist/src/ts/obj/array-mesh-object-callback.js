"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ArrayMeshObjectCallbackContainer_onTranslation, _ArrayMeshObjectCallbackContainer_onRotation, _ArrayMeshObjectCallbackContainer_onScale;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayMeshObjectCallbackContainer = void 0;
const arrays_1 = require("../types/arrays");
class ArrayMeshObjectCallbackContainer {
    constructor() {
        _ArrayMeshObjectCallbackContainer_onTranslation.set(this, new Array());
        _ArrayMeshObjectCallbackContainer_onRotation.set(this, new Array());
        _ArrayMeshObjectCallbackContainer_onScale.set(this, new Array());
    }
    addOnRotation(block) {
        __classPrivateFieldGet(this, _ArrayMeshObjectCallbackContainer_onRotation, "f").push(block);
    }
    addOnScaled(block) {
        __classPrivateFieldGet(this, _ArrayMeshObjectCallbackContainer_onScale, "f").push(block);
    }
    addOnTranslation(block) {
        __classPrivateFieldGet(this, _ArrayMeshObjectCallbackContainer_onTranslation, "f").push(block);
    }
    removeOnRotation(block) {
        arrays_1.Arrays.removeFrom(__classPrivateFieldGet(this, _ArrayMeshObjectCallbackContainer_onRotation, "f"), block);
    }
    removeOnScaled(block) {
        arrays_1.Arrays.removeFrom(__classPrivateFieldGet(this, _ArrayMeshObjectCallbackContainer_onScale, "f"), block);
    }
    removeOnTranslation(block) {
        arrays_1.Arrays.removeFrom(__classPrivateFieldGet(this, _ArrayMeshObjectCallbackContainer_onTranslation, "f"), block);
    }
    notifyTranslation(oldPosition, delta, newPosition) {
        for (let callback of __classPrivateFieldGet(this, _ArrayMeshObjectCallbackContainer_onTranslation, "f"))
            callback(oldPosition, delta, newPosition);
    }
    notifyRotation(startRotation, delta, endRotation) {
        for (let callback of __classPrivateFieldGet(this, _ArrayMeshObjectCallbackContainer_onRotation, "f"))
            callback(startRotation, delta, endRotation);
    }
    notifyScale(startScale, delta, endScale) {
        for (let callback of __classPrivateFieldGet(this, _ArrayMeshObjectCallbackContainer_onScale, "f"))
            callback(startScale, delta, endScale);
    }
}
exports.ArrayMeshObjectCallbackContainer = ArrayMeshObjectCallbackContainer;
_ArrayMeshObjectCallbackContainer_onTranslation = new WeakMap(), _ArrayMeshObjectCallbackContainer_onRotation = new WeakMap(), _ArrayMeshObjectCallbackContainer_onScale = new WeakMap();
//# sourceMappingURL=array-mesh-object-callback.js.map