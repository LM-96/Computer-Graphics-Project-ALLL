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
var _SlManager_instances, _SlManager_lightDirection, _SlManager_sharedUniforms, _SlManager_lightPosition, _SlManager_lightTarget, _SlManager_lightUp, _SlManager_lightFov, _SlManager_spotlight, _SlManager_projWidth, _SlManager_projHeight, _SlManager_shadows, _SlManager_updateSharedUniforms;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlManager = void 0;
const number_trio_1 = require("../types/numbers/number-trio");
const point_factory_1 = require("../geometry/point/point-factory");
const angle_1 = require("../geometry/angle/angle");
class SlManager {
    constructor(sharedUniforms) {
        _SlManager_instances.add(this);
        _SlManager_lightDirection.set(this, (0, number_trio_1.numberTrio)(0, 0, 0));
        _SlManager_sharedUniforms.set(this, void 0);
        _SlManager_lightPosition.set(this, (0, point_factory_1.mutablePoint3D)(0, 0, 100));
        _SlManager_lightTarget.set(this, (0, point_factory_1.mutablePoint3D)(0, 0, 0));
        _SlManager_lightUp.set(this, (0, number_trio_1.numberTrio)(0, 1, 0));
        _SlManager_lightFov.set(this, (0, angle_1.radians)(0));
        _SlManager_spotlight.set(this, false);
        _SlManager_projWidth.set(this, 10);
        _SlManager_projHeight.set(this, 10);
        _SlManager_shadows.set(this, false);
        __classPrivateFieldSet(this, _SlManager_sharedUniforms, sharedUniforms, "f");
    }
    calculateLightWorldMatrix() {
        return M4.lookAt([__classPrivateFieldGet(this, _SlManager_lightPosition, "f").getX(), __classPrivateFieldGet(this, _SlManager_lightPosition, "f").getY(), __classPrivateFieldGet(this, _SlManager_lightPosition, "f").getZ()], [__classPrivateFieldGet(this, _SlManager_lightTarget, "f").getX(), __classPrivateFieldGet(this, _SlManager_lightTarget, "f").getY(), __classPrivateFieldGet(this, _SlManager_lightTarget, "f").getZ()], [__classPrivateFieldGet(this, _SlManager_lightUp, "f").getFirst(), __classPrivateFieldGet(this, _SlManager_lightUp, "f").getSecond(), __classPrivateFieldGet(this, _SlManager_lightUp, "f").getThird()]);
    }
    calculateLightProjectionMatrix() {
        if (__classPrivateFieldGet(this, _SlManager_spotlight, "f")) {
            return M4.perspective(__classPrivateFieldGet(this, _SlManager_lightFov, "f").getValueIn(angle_1.AngleUnit.RAD), __classPrivateFieldGet(this, _SlManager_projWidth, "f") / __classPrivateFieldGet(this, _SlManager_projHeight, "f"), 1, 15);
        }
        else {
            return M4.orthographic(-__classPrivateFieldGet(this, _SlManager_projWidth, "f") / 2, __classPrivateFieldGet(this, _SlManager_projWidth, "f") / 2, -__classPrivateFieldGet(this, _SlManager_projHeight, "f") / 2, __classPrivateFieldGet(this, _SlManager_projHeight, "f") / 2, 1, 15);
        }
    }
    getLightDirection() {
        return __classPrivateFieldGet(this, _SlManager_lightDirection, "f").clone();
    }
    getLightPosition() {
        return __classPrivateFieldGet(this, _SlManager_lightPosition, "f").clone();
    }
    getLightTarget() {
        return __classPrivateFieldGet(this, _SlManager_lightTarget, "f").clone();
    }
    getLightUp() {
        return __classPrivateFieldGet(this, _SlManager_lightUp, "f").clone();
    }
    getFov() {
        return __classPrivateFieldGet(this, _SlManager_lightFov, "f").clone();
    }
    isSpotlight() {
        return __classPrivateFieldGet(this, _SlManager_spotlight, "f");
    }
    getProjWidth() {
        return __classPrivateFieldGet(this, _SlManager_projWidth, "f");
    }
    getProjHeight() {
        return __classPrivateFieldGet(this, _SlManager_projHeight, "f");
    }
    setLightDirection(x, y, z) {
        if (typeof x === "number") {
            __classPrivateFieldGet(this, _SlManager_lightDirection, "f").setAll(x, y, z);
        }
        else {
            __classPrivateFieldGet(this, _SlManager_lightDirection, "f").setAll(x.getFirst(), x.getSecond(), x.getThird());
        }
    }
    setLightPosition(x, y, z) {
        if (typeof x === "number") {
            __classPrivateFieldGet(this, _SlManager_lightPosition, "f").set(x, y, z);
        }
        else {
            __classPrivateFieldGet(this, _SlManager_lightPosition, "f").set(x.getX(), x.getY(), x.getZ());
        }
        __classPrivateFieldGet(this, _SlManager_instances, "m", _SlManager_updateSharedUniforms).call(this);
    }
    setLightTarget(x, y, z) {
        if (typeof x === "number") {
            __classPrivateFieldGet(this, _SlManager_lightTarget, "f").set(x, y, z);
        }
        else {
            __classPrivateFieldGet(this, _SlManager_lightTarget, "f").set(x.getX(), x.getY(), x.getZ());
        }
    }
    setLightUp(x, y, z) {
        if (typeof x === "number") {
            __classPrivateFieldGet(this, _SlManager_lightUp, "f").setAll(x, y, z);
        }
        else {
            __classPrivateFieldGet(this, _SlManager_lightUp, "f").setAll(x.getFirst(), x.getSecond(), x.getThird());
        }
    }
    setFov(value) {
        __classPrivateFieldSet(this, _SlManager_lightFov, value, "f");
    }
    setSpotlight(value) {
        __classPrivateFieldSet(this, _SlManager_spotlight, value, "f");
    }
    setProjWidth(value) {
        __classPrivateFieldSet(this, _SlManager_projWidth, value, "f");
    }
    setProjHeight(value) {
        __classPrivateFieldSet(this, _SlManager_projHeight, value, "f");
    }
    setShadows(value) {
        __classPrivateFieldSet(this, _SlManager_shadows, value, "f");
    }
    getShadows() {
        return __classPrivateFieldGet(this, _SlManager_shadows, "f");
    }
}
exports.SlManager = SlManager;
_SlManager_lightDirection = new WeakMap(), _SlManager_sharedUniforms = new WeakMap(), _SlManager_lightPosition = new WeakMap(), _SlManager_lightTarget = new WeakMap(), _SlManager_lightUp = new WeakMap(), _SlManager_lightFov = new WeakMap(), _SlManager_spotlight = new WeakMap(), _SlManager_projWidth = new WeakMap(), _SlManager_projHeight = new WeakMap(), _SlManager_shadows = new WeakMap(), _SlManager_instances = new WeakSet(), _SlManager_updateSharedUniforms = function _SlManager_updateSharedUniforms() {
    __classPrivateFieldGet(this, _SlManager_sharedUniforms, "f").u_lightDirection = __classPrivateFieldGet(this, _SlManager_lightDirection, "f").toArray();
};
//# sourceMappingURL=sl-manager.js.map