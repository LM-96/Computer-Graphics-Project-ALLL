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
var _CameraMan_instances, _CameraMan_drawer, _CameraMan_camera, _CameraMan_target, _CameraMan_translationReceipt, _CameraMan_rotationReceipt, _CameraMan_workMode, _CameraMan_hight, _CameraMan_watchingOverObject;
Object.defineProperty(exports, "__esModule", { value: true });
const options_1 = require("../signals/options");
var CameraManWorkMode;
(function (CameraManWorkMode) {
    CameraManWorkMode[CameraManWorkMode["OVER"] = 0] = "OVER";
})(CameraManWorkMode || (CameraManWorkMode = {}));
class CameraMan {
    constructor(drawer) {
        _CameraMan_instances.add(this);
        _CameraMan_drawer.set(this, void 0);
        _CameraMan_camera.set(this, void 0);
        _CameraMan_target.set(this, null);
        _CameraMan_translationReceipt.set(this, null);
        _CameraMan_rotationReceipt.set(this, null);
        _CameraMan_workMode.set(this, null);
        _CameraMan_hight.set(this, 0);
        __classPrivateFieldSet(this, _CameraMan_camera, drawer.getCamera(), "f");
        __classPrivateFieldSet(this, _CameraMan_drawer, drawer, "f");
    }
    /**
     * Hire the cameraman with the given `mode`.
     * @param mode
     */
    hire(mode) {
        if (__classPrivateFieldGet(this, _CameraMan_workMode, "f") != null) {
            this.dismiss();
        }
        switch (mode) {
            case CameraManWorkMode.OVER: {
                __classPrivateFieldSet(this, _CameraMan_translationReceipt, __classPrivateFieldGet(this, _CameraMan_target, "f")
                    .getTranslationSubscriber()
                    .subscribe((0, options_1.handler)((signal) => __classPrivateFieldGet(this, _CameraMan_instances, "m", _CameraMan_watchingOverObject).call(this, signal))), "f");
            }
        }
        __classPrivateFieldSet(this, _CameraMan_workMode, mode, "f");
    }
    /**
     * Dismiss the cameramen stopping his work.
     * The camera will not be touched anymore from the camera man after this call
     */
    dismiss() {
        if (__classPrivateFieldGet(this, _CameraMan_translationReceipt, "f") != null) {
            __classPrivateFieldGet(this, _CameraMan_target, "f").getTranslationSubscriber().unsubscribe(__classPrivateFieldGet(this, _CameraMan_translationReceipt, "f"));
            __classPrivateFieldSet(this, _CameraMan_translationReceipt, null, "f");
        }
        if (__classPrivateFieldGet(this, _CameraMan_rotationReceipt, "f") != null) {
            __classPrivateFieldGet(this, _CameraMan_target, "f").getTranslationSubscriber().unsubscribe(__classPrivateFieldGet(this, _CameraMan_rotationReceipt, "f"));
            __classPrivateFieldSet(this, _CameraMan_rotationReceipt, null, "f");
        }
        __classPrivateFieldSet(this, _CameraMan_workMode, null, "f");
    }
    /**
     * Set the target object the camera man has to follow.
     * If the cameramen is already working, it will dismiss the current work
     * and start following the new target with the same work mode
     * @param {MeshObject} target the target object
     */
    setTarget(target) {
        if (__classPrivateFieldGet(this, _CameraMan_workMode, "f") != null) {
            this.dismiss();
            __classPrivateFieldSet(this, _CameraMan_target, target, "f");
            this.hire(__classPrivateFieldGet(this, _CameraMan_workMode, "f"));
        }
        else {
            __classPrivateFieldSet(this, _CameraMan_target, target, "f");
        }
    }
    getTarget() {
        return __classPrivateFieldGet(this, _CameraMan_target, "f");
    }
    hasTarget() {
        return __classPrivateFieldGet(this, _CameraMan_target, "f") !== null;
    }
    setHigh(high) {
        __classPrivateFieldSet(this, _CameraMan_hight, high, "f");
    }
    getHigh() {
        return __classPrivateFieldGet(this, _CameraMan_hight, "f");
    }
}
_CameraMan_drawer = new WeakMap(), _CameraMan_camera = new WeakMap(), _CameraMan_target = new WeakMap(), _CameraMan_translationReceipt = new WeakMap(), _CameraMan_rotationReceipt = new WeakMap(), _CameraMan_workMode = new WeakMap(), _CameraMan_hight = new WeakMap(), _CameraMan_instances = new WeakSet(), _CameraMan_watchingOverObject = function _CameraMan_watchingOverObject(signal) {
    if (__classPrivateFieldGet(this, _CameraMan_target, "f") != null) {
        let targetPosition = __classPrivateFieldGet(this, _CameraMan_target, "f").getPosition();
        __classPrivateFieldGet(this, _CameraMan_camera, "f").setPosition(targetPosition.getY(), targetPosition.getY(), targetPosition.getZ() + this.getHigh());
        __classPrivateFieldGet(this, _CameraMan_drawer, "f").renderScene();
    }
};
//# sourceMappingURL=camera-man.js.map