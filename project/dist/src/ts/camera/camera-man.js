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
var _CameraMan_instances, _CameraMan_drawer, _CameraMan_camera, _CameraMan_target, _CameraMan_translationReceipt, _CameraMan_rotationReceipt, _CameraMan_workMode, _CameraMan_high, _CameraMan_distance, _CameraMan_phase, _CameraMan_watchingOverObject, _CameraMan_watchingFirstPersonTranslation, _CameraMan_watchingFirstPersonRotation, _CameraMan_watchingThirdPersonTranslation, _CameraMan_watchingThirdPersonRotation;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CameraMan = exports.CAMERAMAN_WORK_MODES = exports.CameraManWorkMode = void 0;
const options_1 = require("../signals/options");
const angle_1 = require("../geometry/angle/angle");
const log_1 = require("../log/log");
var CameraManWorkMode;
(function (CameraManWorkMode) {
    CameraManWorkMode["DISMISSED"] = "DISMISSED";
    CameraManWorkMode["OVER"] = "OVER";
    CameraManWorkMode["FIRST_PERSON"] = "FIRST_PERSON";
    CameraManWorkMode["THIRD_PERSON"] = "THIRD_PERSON";
})(CameraManWorkMode = exports.CameraManWorkMode || (exports.CameraManWorkMode = {}));
exports.CAMERAMAN_WORK_MODES = Object.values(CameraManWorkMode);
class CameraMan {
    constructor(drawer) {
        _CameraMan_instances.add(this);
        _CameraMan_drawer.set(this, void 0);
        _CameraMan_camera.set(this, void 0);
        _CameraMan_target.set(this, null);
        _CameraMan_translationReceipt.set(this, null);
        _CameraMan_rotationReceipt.set(this, null);
        _CameraMan_workMode.set(this, CameraManWorkMode.DISMISSED);
        _CameraMan_high.set(this, 5);
        _CameraMan_distance.set(this, 50);
        _CameraMan_phase.set(this, 0);
        __classPrivateFieldSet(this, _CameraMan_drawer, drawer, "f");
        __classPrivateFieldSet(this, _CameraMan_camera, drawer.getCamera(), "f");
    }
    autoSet(render = true) {
        switch (__classPrivateFieldGet(this, _CameraMan_workMode, "f")) {
            case CameraManWorkMode.OVER:
                this.setOverTarget(render);
                break;
            case CameraManWorkMode.FIRST_PERSON:
                this.setFirstPersonTarget(render);
                break;
            case CameraManWorkMode.THIRD_PERSON:
                this.setThirdPersonTarget(render);
                break;
        }
    }
    setOverTarget(render = true) {
        log_1.Log.log("CameraMan | setting up over [target: " + __classPrivateFieldGet(this, _CameraMan_target, "f").getName() + "]");
        let targetPosition = __classPrivateFieldGet(this, _CameraMan_target, "f").getPosition();
        __classPrivateFieldGet(this, _CameraMan_camera, "f").setPosition(targetPosition.getX(), targetPosition.getY(), targetPosition.getZ() + __classPrivateFieldGet(this, _CameraMan_distance, "f"));
        __classPrivateFieldGet(this, _CameraMan_camera, "f").setTarget(targetPosition.getX(), targetPosition.getY(), targetPosition.getZ());
        __classPrivateFieldGet(this, _CameraMan_camera, "f").setUp(1, 0, 0);
        if (render) {
            __classPrivateFieldGet(this, _CameraMan_drawer, "f").renderScene();
        }
    }
    setFirstPersonTarget(render = true) {
        log_1.Log.log("CameraMan | setting up to first person [target: " + __classPrivateFieldGet(this, _CameraMan_target, "f").getName() + "]");
        let targetPosition = __classPrivateFieldGet(this, _CameraMan_target, "f").getPosition();
        let phi = __classPrivateFieldGet(this, _CameraMan_target, "f").getPolarRotation().getThird().getValueIn(angle_1.AngleUnit.RAD);
        __classPrivateFieldGet(this, _CameraMan_camera, "f").setPosition(targetPosition.getX() + 5 * Math.cos(phi + __classPrivateFieldGet(this, _CameraMan_phase, "f")), targetPosition.getY() + 5 * Math.sin(phi + __classPrivateFieldGet(this, _CameraMan_phase, "f")), targetPosition.getZ() + __classPrivateFieldGet(this, _CameraMan_high, "f"));
        __classPrivateFieldGet(this, _CameraMan_camera, "f").setTarget(targetPosition.getX() + 10 * Math.cos(phi + __classPrivateFieldGet(this, _CameraMan_phase, "f")), targetPosition.getY() + 10 * Math.sin(phi + __classPrivateFieldGet(this, _CameraMan_phase, "f")), targetPosition.getZ() + __classPrivateFieldGet(this, _CameraMan_high, "f"));
        __classPrivateFieldGet(this, _CameraMan_camera, "f").setUp(0, 0, 1);
        if (render) {
            __classPrivateFieldGet(this, _CameraMan_drawer, "f").renderScene();
        }
    }
    setThirdPersonTarget(render = true) {
        log_1.Log.log("CameraMan | setting up to first person [target: " + __classPrivateFieldGet(this, _CameraMan_target, "f").getName() + "]");
        let targetPosition = __classPrivateFieldGet(this, _CameraMan_target, "f").getPosition();
        let phi = __classPrivateFieldGet(this, _CameraMan_target, "f").getPolarRotation().getThird().getValueIn(angle_1.AngleUnit.RAD);
        __classPrivateFieldGet(this, _CameraMan_camera, "f").setPosition(targetPosition.getX() - __classPrivateFieldGet(this, _CameraMan_distance, "f") * Math.cos(phi + __classPrivateFieldGet(this, _CameraMan_phase, "f")), targetPosition.getY() - __classPrivateFieldGet(this, _CameraMan_distance, "f") * Math.sin(phi + __classPrivateFieldGet(this, _CameraMan_phase, "f")), targetPosition.getZ() + __classPrivateFieldGet(this, _CameraMan_high, "f"));
        __classPrivateFieldGet(this, _CameraMan_camera, "f").setTarget(targetPosition.getX() + 10 * Math.cos(phi + __classPrivateFieldGet(this, _CameraMan_phase, "f")), targetPosition.getY() + 10 * Math.sin(phi + __classPrivateFieldGet(this, _CameraMan_phase, "f")), targetPosition.getZ() + __classPrivateFieldGet(this, _CameraMan_high, "f"));
        __classPrivateFieldGet(this, _CameraMan_camera, "f").setUp(0, 0, 1);
        if (render) {
            __classPrivateFieldGet(this, _CameraMan_drawer, "f").renderScene();
        }
    }
    /**
     * Hire the cameraman with the given `mode`.
     * If the cameraman was already hired with a different mode, this method will
     * change it to the desired one. If the work mode is the same as the one currently in use,
     * this method will do nothing.
     * @param {CameraManWorkMode} mode the mode
     */
    hire(mode) {
        if (__classPrivateFieldGet(this, _CameraMan_workMode, "f") != null) {
            this.dismiss();
        }
        if (__classPrivateFieldGet(this, _CameraMan_workMode, "f") == mode) {
            return;
        }
        log_1.Log.log("CameraMan | hiring with mode " + mode + " [target: " + __classPrivateFieldGet(this, _CameraMan_target, "f").getName() + "]");
        switch (mode) {
            case CameraManWorkMode.OVER: {
                __classPrivateFieldSet(this, _CameraMan_translationReceipt, __classPrivateFieldGet(this, _CameraMan_target, "f")
                    .getTranslationSubscriber()
                    .subscribe((0, options_1.handler)((signal) => __classPrivateFieldGet(this, _CameraMan_instances, "m", _CameraMan_watchingOverObject).call(this, signal))), "f");
                this.setOverTarget(true);
                log_1.Log.log("CameraMan | hired with mode " + mode + " [target: " + __classPrivateFieldGet(this, _CameraMan_target, "f").getName() +
                    ", translation subscriptionId: + " + __classPrivateFieldGet(this, _CameraMan_translationReceipt, "f").subscriptionId + "]");
                break;
            }
            case CameraManWorkMode.FIRST_PERSON: {
                __classPrivateFieldSet(this, _CameraMan_translationReceipt, __classPrivateFieldGet(this, _CameraMan_target, "f")
                    .getTranslationSubscriber()
                    .subscribe((0, options_1.handler)((signal) => __classPrivateFieldGet(this, _CameraMan_instances, "m", _CameraMan_watchingFirstPersonTranslation).call(this, signal))), "f");
                __classPrivateFieldSet(this, _CameraMan_rotationReceipt, __classPrivateFieldGet(this, _CameraMan_target, "f")
                    .getPolarRotationSubscriber()
                    .subscribe((0, options_1.handler)((signal) => __classPrivateFieldGet(this, _CameraMan_instances, "m", _CameraMan_watchingFirstPersonRotation).call(this, signal))), "f");
                this.setFirstPersonTarget(true);
                log_1.Log.log("CameraMan | hired with mode " + mode + " [target: " + __classPrivateFieldGet(this, _CameraMan_target, "f").getName() +
                    ", translation subscriptionId: + " + __classPrivateFieldGet(this, _CameraMan_translationReceipt, "f").subscriptionId +
                    ", rotation subscriptionId: + " + __classPrivateFieldGet(this, _CameraMan_rotationReceipt, "f").subscriptionId + "]");
                break;
            }
            case CameraManWorkMode.THIRD_PERSON: {
                __classPrivateFieldSet(this, _CameraMan_translationReceipt, __classPrivateFieldGet(this, _CameraMan_target, "f")
                    .getTranslationSubscriber()
                    .subscribe((0, options_1.handler)((signal) => __classPrivateFieldGet(this, _CameraMan_instances, "m", _CameraMan_watchingThirdPersonTranslation).call(this, signal))), "f");
                __classPrivateFieldSet(this, _CameraMan_rotationReceipt, __classPrivateFieldGet(this, _CameraMan_target, "f")
                    .getPolarRotationSubscriber()
                    .subscribe((0, options_1.handler)((signal) => __classPrivateFieldGet(this, _CameraMan_instances, "m", _CameraMan_watchingThirdPersonRotation).call(this, signal))), "f");
                this.setThirdPersonTarget(true);
                log_1.Log.log("CameraMan | hired with mode " + mode + " [target: " + __classPrivateFieldGet(this, _CameraMan_target, "f").getName() +
                    ", translation subscriptionId: + " + __classPrivateFieldGet(this, _CameraMan_translationReceipt, "f").subscriptionId +
                    ", rotation subscriptionId: + " + __classPrivateFieldGet(this, _CameraMan_rotationReceipt, "f").subscriptionId + "]");
                break;
            }
        }
        __classPrivateFieldSet(this, _CameraMan_workMode, mode, "f");
    }
    /**
     * Dismiss the cameramen stopping his work.
     * The camera will not be touched anymore from the camera man after this call
     */
    dismiss() {
        log_1.Log.log("CameraMan | dismissing [current work mode: " + __classPrivateFieldGet(this, _CameraMan_workMode, "f") + "]");
        if (__classPrivateFieldGet(this, _CameraMan_translationReceipt, "f") != null) {
            __classPrivateFieldGet(this, _CameraMan_target, "f").getTranslationSubscriber().unsubscribe(__classPrivateFieldGet(this, _CameraMan_translationReceipt, "f"));
            __classPrivateFieldSet(this, _CameraMan_translationReceipt, null, "f");
        }
        if (__classPrivateFieldGet(this, _CameraMan_rotationReceipt, "f") != null) {
            __classPrivateFieldGet(this, _CameraMan_target, "f").getTranslationSubscriber().unsubscribe(__classPrivateFieldGet(this, _CameraMan_rotationReceipt, "f"));
            __classPrivateFieldSet(this, _CameraMan_rotationReceipt, null, "f");
        }
        __classPrivateFieldSet(this, _CameraMan_workMode, CameraManWorkMode.DISMISSED, "f");
    }
    /**
     * Set the target object the camera man has to follow.
     * If the cameramen is already working, it will dismiss the current work
     * and start following the new target with the same work mode
     * @param {MeshObject} target the target object
     */
    setTarget(target) {
        if (__classPrivateFieldGet(this, _CameraMan_workMode, "f") != null) {
            if (__classPrivateFieldGet(this, _CameraMan_target, "f") != target) {
                this.dismiss();
                __classPrivateFieldSet(this, _CameraMan_target, target, "f");
                this.hire(__classPrivateFieldGet(this, _CameraMan_workMode, "f"));
            }
        }
        else {
            __classPrivateFieldSet(this, _CameraMan_target, target, "f");
        }
    }
    isWorking() {
        return __classPrivateFieldGet(this, _CameraMan_workMode, "f") != CameraManWorkMode.DISMISSED;
    }
    getTarget() {
        return __classPrivateFieldGet(this, _CameraMan_target, "f");
    }
    hasTarget() {
        return __classPrivateFieldGet(this, _CameraMan_target, "f") !== null;
    }
    setHigh(high, renderIfWorking = true) {
        __classPrivateFieldSet(this, _CameraMan_high, high, "f");
        if (this.isWorking()) {
            this.autoSet(renderIfWorking);
        }
    }
    getHigh() {
        return __classPrivateFieldGet(this, _CameraMan_high, "f");
    }
    getCurrentWorkMode() {
        return __classPrivateFieldGet(this, _CameraMan_workMode, "f");
    }
    setPhase(angle) {
        __classPrivateFieldSet(this, _CameraMan_phase, angle.getValueIn(angle_1.AngleUnit.RAD), "f");
    }
    setDistance(distance, renderIfWorking = true) {
        __classPrivateFieldSet(this, _CameraMan_distance, distance, "f");
        if (this.isWorking()) {
            this.autoSet(renderIfWorking);
        }
    }
    getDistance() {
        return __classPrivateFieldGet(this, _CameraMan_distance, "f");
        this.autoSet(true);
    }
}
exports.CameraMan = CameraMan;
_CameraMan_drawer = new WeakMap(), _CameraMan_camera = new WeakMap(), _CameraMan_target = new WeakMap(), _CameraMan_translationReceipt = new WeakMap(), _CameraMan_rotationReceipt = new WeakMap(), _CameraMan_workMode = new WeakMap(), _CameraMan_high = new WeakMap(), _CameraMan_distance = new WeakMap(), _CameraMan_phase = new WeakMap(), _CameraMan_instances = new WeakSet(), _CameraMan_watchingOverObject = function _CameraMan_watchingOverObject(_) {
    if (__classPrivateFieldGet(this, _CameraMan_target, "f") != null) {
        this.setOverTarget(true);
    }
}, _CameraMan_watchingFirstPersonTranslation = function _CameraMan_watchingFirstPersonTranslation(_) {
    if (__classPrivateFieldGet(this, _CameraMan_target, "f") != null) {
        this.setFirstPersonTarget(true);
    }
}, _CameraMan_watchingFirstPersonRotation = function _CameraMan_watchingFirstPersonRotation(_) {
    if (__classPrivateFieldGet(this, _CameraMan_target, "f") != null) {
        this.setFirstPersonTarget(true);
    }
}, _CameraMan_watchingThirdPersonTranslation = function _CameraMan_watchingThirdPersonTranslation(_) {
    if (__classPrivateFieldGet(this, _CameraMan_target, "f") != null) {
        this.setThirdPersonTarget(true);
    }
}, _CameraMan_watchingThirdPersonRotation = function _CameraMan_watchingThirdPersonRotation(_) {
    if (__classPrivateFieldGet(this, _CameraMan_target, "f") != null) {
        this.setThirdPersonTarget(true);
    }
};
//# sourceMappingURL=camera-man.js.map