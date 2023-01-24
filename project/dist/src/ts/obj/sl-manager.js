"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SlManager_instances, _SlManager_lightDirection, _SlManager_sharedUniforms, _SlManager_updateSharedUniforms;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlManager = void 0;
const number_trio_1 = require("../types/numbers/number-trio");
class SlManager {
    constructor(sharedUniforms) {
        _SlManager_instances.add(this);
        _SlManager_lightDirection.set(this, (0, number_trio_1.numberTrio)(0, 0, 0));
        _SlManager_sharedUniforms.set(this, void 0);
        __classPrivateFieldSet(this, _SlManager_sharedUniforms, sharedUniforms, "f");
    }
    getLightDirection() {
        return __classPrivateFieldGet(this, _SlManager_lightDirection, "f").clone();
    }
    setLightDirection(x, y, z) {
        if (typeof x === "number") {
            __classPrivateFieldGet(this, _SlManager_lightDirection, "f").setAll(x, y, z);
        }
        else {
            __classPrivateFieldGet(this, _SlManager_lightDirection, "f").setAll(x.getFirst(), x.getSecond(), x.getThird());
        }
        __classPrivateFieldGet(this, _SlManager_instances, "m", _SlManager_updateSharedUniforms).call(this);
    }
}
exports.SlManager = SlManager;
_SlManager_lightDirection = new WeakMap(), _SlManager_sharedUniforms = new WeakMap(), _SlManager_instances = new WeakSet(), _SlManager_updateSharedUniforms = function _SlManager_updateSharedUniforms() {
    __classPrivateFieldGet(this, _SlManager_sharedUniforms, "f").u_lightDirection = __classPrivateFieldGet(this, _SlManager_lightDirection, "f").toArray();
};
//# sourceMappingURL=sl-manager.js.map