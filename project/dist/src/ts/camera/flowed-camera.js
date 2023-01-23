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
var _FlowedCamera_position, _FlowedCamera_up, _FlowedCamera_target, _FlowedCamera_fov, _FlowedCamera_lookingAtObject, _FlowedCamera_followObjectTranslation, _FlowedCamera_targetObject, _FlowedCamera_lookingAtObjectReceipt, _FlowedCamera_positionFlow, _FlowedCamera_upFlow, _FlowedCamera_targetFlow, _FlowedCamera_fovFlow, _FlowedCamera_lookingAtObjectFlow, _FlowedCamera_followObjectTranslationFlow, _FlowedCamera_followedObjectFlow, _FlowedCamera_lookedAtObjectFlow, _FlowedCamera_performedTranslationBuilder, _FlowedCamera_lookAtObjectReceipt, _FlowedCamera_followObjectReceipt;
Object.defineProperty(exports, "__esModule", { value: true });
const number_trio_1 = require("../types/numbers/number-trio");
const angle_1 = require("../geometry/angle/angle");
const point_factory_1 = require("../geometry/point/point-factory");
const flow_1 = require("../signals/flow");
const performed_translation_1 = require("../geometry/data/performed-translation");
const performed_number_trio_change_1 = require("../types/data/performed-number-trio-change");
const performed_object_set_1 = require("../types/data/performed-object-set");
const camera_signals_1 = require("./camera-signals");
const mesh_object_signals_1 = require("../obj/mesh-object-signals");
const options_1 = require("../signals/options");
class FlowedCamera {
    constructor() {
        _FlowedCamera_position.set(this, void 0);
        _FlowedCamera_up.set(this, void 0);
        _FlowedCamera_target.set(this, void 0);
        _FlowedCamera_fov.set(this, void 0);
        _FlowedCamera_lookingAtObject.set(this, void 0);
        _FlowedCamera_followObjectTranslation.set(this, void 0);
        _FlowedCamera_targetObject.set(this, void 0);
        _FlowedCamera_lookingAtObjectReceipt.set(this, void 0);
        _FlowedCamera_positionFlow.set(this, void 0);
        _FlowedCamera_upFlow.set(this, void 0);
        _FlowedCamera_targetFlow.set(this, void 0);
        _FlowedCamera_fovFlow.set(this, void 0);
        _FlowedCamera_lookingAtObjectFlow.set(this, void 0);
        _FlowedCamera_followObjectTranslationFlow.set(this, void 0);
        _FlowedCamera_followedObjectFlow.set(this, void 0);
        _FlowedCamera_lookedAtObjectFlow.set(this, void 0);
        _FlowedCamera_performedTranslationBuilder.set(this, void 0);
        _FlowedCamera_lookAtObjectReceipt.set(this, null);
        _FlowedCamera_followObjectReceipt.set(this, null);
        __classPrivateFieldSet(this, _FlowedCamera_position, (0, point_factory_1.mutablePoint3D)(1, 1, 1), "f");
        __classPrivateFieldSet(this, _FlowedCamera_up, (0, number_trio_1.numberTrio)(0, 0, 1), "f");
        __classPrivateFieldSet(this, _FlowedCamera_target, (0, point_factory_1.mutablePoint3D)(0, 0, 0), "f");
        __classPrivateFieldSet(this, _FlowedCamera_fov, (0, angle_1.degree)(60), "f");
        __classPrivateFieldSet(this, _FlowedCamera_lookingAtObject, false, "f");
        __classPrivateFieldSet(this, _FlowedCamera_followObjectTranslation, false, "f");
        __classPrivateFieldSet(this, _FlowedCamera_targetObject, null, "f");
        __classPrivateFieldSet(this, _FlowedCamera_positionFlow, flow_1.default.newSingleFlow(camera_signals_1.default.CAMERA_TRANSLATION_SIGNAL_STRING_NAME), "f");
        __classPrivateFieldSet(this, _FlowedCamera_upFlow, flow_1.default.newSingleFlow(camera_signals_1.default.CAMERA_UP_SIGNAL_STRING_NAME), "f");
        __classPrivateFieldSet(this, _FlowedCamera_targetFlow, flow_1.default.newSingleFlow(camera_signals_1.default.CAMERA_TARGET_SIGNAL_STRING_NAME), "f");
        __classPrivateFieldSet(this, _FlowedCamera_fovFlow, flow_1.default.newSingleFlow(camera_signals_1.default.CAMERA_FOV_SIGNAL_STRING_NAME), "f");
        __classPrivateFieldSet(this, _FlowedCamera_lookingAtObjectFlow, flow_1.default.newSingleFlow(camera_signals_1.default.CAMERA_LOOKING_AT_OBJECT_SIGNAL_STRING_NAME), "f");
        __classPrivateFieldSet(this, _FlowedCamera_followObjectTranslationFlow, flow_1.default.newSingleFlow(camera_signals_1.default.CAMERA_FOLLOW_OBJECT_TRANSLATION_SIGNAL_STRING_NAME), "f");
        __classPrivateFieldSet(this, _FlowedCamera_followedObjectFlow, flow_1.default.newSingleFlow(camera_signals_1.default.CAMERA_TARGET_OBJECT_SIGNAL_STRING_NAME), "f");
        __classPrivateFieldSet(this, _FlowedCamera_lookedAtObjectFlow, flow_1.default.newSingleFlow(camera_signals_1.default.CAMERA_LOOKED_AT_OBJECT_SIGNAL_STRING_NAME), "f");
        __classPrivateFieldSet(this, _FlowedCamera_performedTranslationBuilder, new performed_translation_1.PerformedTranslationBuilder(), "f");
        __classPrivateFieldGet(this, _FlowedCamera_performedTranslationBuilder, "f").who = "camera";
    }
    lookAtObject(signal) {
        this.setTarget(signal.data.to);
    }
    followObject(signal) {
        let translationVector = signal.data.translationVector;
        this.setPosition(__classPrivateFieldGet(this, _FlowedCamera_position, "f").getX() + translationVector.getFirst(), __classPrivateFieldGet(this, _FlowedCamera_position, "f").getY() + translationVector.getSecond(), __classPrivateFieldGet(this, _FlowedCamera_position, "f").getZ() + translationVector.getThird());
    }
    calculateCameraMatrix() {
        return M4.lookAt(__classPrivateFieldGet(this, _FlowedCamera_position, "f").toArray(), __classPrivateFieldGet(this, _FlowedCamera_target, "f").toArray(), __classPrivateFieldGet(this, _FlowedCamera_up, "f").toArray());
    }
    getCameraPositionSubscriber() {
        return __classPrivateFieldGet(this, _FlowedCamera_positionFlow, "f");
    }
    getCurrentDistanceFromTarget() {
        return (0, number_trio_1.numberTrio)(__classPrivateFieldGet(this, _FlowedCamera_position, "f").getX() - __classPrivateFieldGet(this, _FlowedCamera_target, "f").getX(), __classPrivateFieldGet(this, _FlowedCamera_position, "f").getY() - __classPrivateFieldGet(this, _FlowedCamera_target, "f").getY(), __classPrivateFieldGet(this, _FlowedCamera_position, "f").getZ() - __classPrivateFieldGet(this, _FlowedCamera_target, "f").getZ());
    }
    getCurrentFov() {
        return __classPrivateFieldGet(this, _FlowedCamera_fov, "f").clone();
    }
    getCurrentPosition() {
        return __classPrivateFieldGet(this, _FlowedCamera_position, "f").frozen(false);
    }
    getCurrentTarget() {
        return __classPrivateFieldGet(this, _FlowedCamera_target, "f").frozen(false);
    }
    getCurrentUp() {
        return __classPrivateFieldGet(this, _FlowedCamera_up, "f").clone();
    }
    getFollowedObject() {
        if (__classPrivateFieldGet(this, _FlowedCamera_followObjectTranslation, "f")) {
            return __classPrivateFieldGet(this, _FlowedCamera_targetObject, "f");
        }
        return null;
    }
    getFollowedObjectSubscriber() {
        return __classPrivateFieldGet(this, _FlowedCamera_followedObjectFlow, "f");
    }
    getFollowingObjectSubscriber() {
        return __classPrivateFieldGet(this, _FlowedCamera_followObjectTranslationFlow, "f");
    }
    getFovSubscriber() {
        return __classPrivateFieldGet(this, _FlowedCamera_fovFlow, "f");
    }
    getLookedObject() {
        if (__classPrivateFieldGet(this, _FlowedCamera_lookingAtObject, "f")) {
            return __classPrivateFieldGet(this, _FlowedCamera_targetObject, "f");
        }
        return null;
    }
    getLookedObjectSubscriber() {
        return __classPrivateFieldGet(this, _FlowedCamera_lookedAtObjectFlow, "f");
    }
    getLookingAtObjectSubscriber() {
        return undefined;
    }
    getTargetSubscriber() {
        return __classPrivateFieldGet(this, _FlowedCamera_targetFlow, "f");
    }
    getUpSubscriber() {
        return __classPrivateFieldGet(this, _FlowedCamera_upFlow, "f");
    }
    isFollowingObjectTranslation() {
        return __classPrivateFieldGet(this, _FlowedCamera_followObjectTranslation, "f");
    }
    isLookingAtObject() {
        return __classPrivateFieldGet(this, _FlowedCamera_lookingAtObject, "f");
    }
    setDistanceFromTarget(distanceFromTarget, y, z) {
        if (typeof distanceFromTarget === "number") {
            __classPrivateFieldGet(this, _FlowedCamera_position, "f").set(__classPrivateFieldGet(this, _FlowedCamera_target, "f").getX() + distanceFromTarget, __classPrivateFieldGet(this, _FlowedCamera_target, "f").getY() + y, __classPrivateFieldGet(this, _FlowedCamera_target, "f").getZ() + z);
        }
        else {
            __classPrivateFieldGet(this, _FlowedCamera_position, "f").set(__classPrivateFieldGet(this, _FlowedCamera_target, "f").getX() + distanceFromTarget.getFirst(), __classPrivateFieldGet(this, _FlowedCamera_target, "f").getY() + distanceFromTarget.getSecond(), __classPrivateFieldGet(this, _FlowedCamera_target, "f").getZ() + distanceFromTarget.getThird());
        }
    }
    setFov(fov) {
        let oldFov = __classPrivateFieldGet(this, _FlowedCamera_fov, "f").clone();
        __classPrivateFieldSet(this, _FlowedCamera_fov, fov, "f");
        __classPrivateFieldGet(this, _FlowedCamera_fovFlow, "f").fire(this, new performed_object_set_1.PerformedObjectSet(oldFov, __classPrivateFieldGet(this, _FlowedCamera_fov, "f")));
    }
    setPosition(position, y, z) {
        __classPrivateFieldGet(this, _FlowedCamera_performedTranslationBuilder, "f").clear();
        __classPrivateFieldGet(this, _FlowedCamera_performedTranslationBuilder, "f").from = __classPrivateFieldGet(this, _FlowedCamera_position, "f").clone();
        if (typeof position === "number") {
            __classPrivateFieldGet(this, _FlowedCamera_position, "f").set(position, y, z);
        }
        else {
            __classPrivateFieldGet(this, _FlowedCamera_position, "f").set(position.getX(), position.getY(), position.getZ());
        }
        __classPrivateFieldGet(this, _FlowedCamera_performedTranslationBuilder, "f").to = __classPrivateFieldGet(this, _FlowedCamera_position, "f").clone();
        __classPrivateFieldGet(this, _FlowedCamera_positionFlow, "f").fire(this, __classPrivateFieldGet(this, _FlowedCamera_performedTranslationBuilder, "f").build());
    }
    setTarget(target, y, z) {
        let oldTarget = __classPrivateFieldGet(this, _FlowedCamera_target, "f").clone();
        if (typeof target === "number") {
            __classPrivateFieldGet(this, _FlowedCamera_target, "f").set(target, y, z);
        }
        else {
            __classPrivateFieldGet(this, _FlowedCamera_target, "f").set(target.getX(), target.getY(), target.getZ());
        }
        __classPrivateFieldGet(this, _FlowedCamera_targetFlow, "f").fire(this, new performed_object_set_1.PerformedObjectSet(oldTarget, __classPrivateFieldGet(this, _FlowedCamera_target, "f")));
    }
    setUp(up, y, z) {
        let oldUp = __classPrivateFieldGet(this, _FlowedCamera_up, "f").clone();
        if (typeof up === "number") {
            __classPrivateFieldGet(this, _FlowedCamera_up, "f").setAll(up, y, z);
        }
        else {
            __classPrivateFieldGet(this, _FlowedCamera_up, "f").setAll(up.getFirst(), up.getSecond(), up.getThird());
        }
        __classPrivateFieldGet(this, _FlowedCamera_upFlow, "f").fire(this, new performed_number_trio_change_1.PerformedNumberTrioChange(oldUp, __classPrivateFieldGet(this, _FlowedCamera_up, "f")));
    }
    startFollowingObject(obj) {
        if (__classPrivateFieldGet(this, _FlowedCamera_followObjectTranslation, "f")) {
            this.stopFollowingObject();
        }
        let oldObject = __classPrivateFieldGet(this, _FlowedCamera_targetObject, "f");
        __classPrivateFieldSet(this, _FlowedCamera_targetObject, obj, "f");
        let oldFollowObjectTranslation = __classPrivateFieldGet(this, _FlowedCamera_followObjectTranslation, "f");
        if (!__classPrivateFieldGet(this, _FlowedCamera_lookingAtObject, "f") || (__classPrivateFieldGet(this, _FlowedCamera_lookingAtObject, "f") && __classPrivateFieldGet(this, _FlowedCamera_targetObject, "f") !== oldObject)) {
            this.startLookingAtObject(obj);
        }
        __classPrivateFieldSet(this, _FlowedCamera_followObjectTranslation, true, "f");
        __classPrivateFieldSet(this, _FlowedCamera_followObjectReceipt, mesh_object_signals_1.MeshObjectSignals
            .getTranslationSubscriberOf(__classPrivateFieldGet(this, _FlowedCamera_targetObject, "f"))
            .subscribe((0, options_1.handler)((signal) => { this.followObject(signal); })), "f");
        __classPrivateFieldGet(this, _FlowedCamera_followedObjectFlow, "f").fire(this, new performed_object_set_1.PerformedObjectSet(oldObject, __classPrivateFieldGet(this, _FlowedCamera_targetObject, "f")));
        __classPrivateFieldGet(this, _FlowedCamera_followObjectTranslationFlow, "f").fire(this, new performed_object_set_1.PerformedObjectSet(oldFollowObjectTranslation, __classPrivateFieldGet(this, _FlowedCamera_followObjectTranslation, "f")));
    }
    startLookingAtObject(obj) {
        if (__classPrivateFieldGet(this, _FlowedCamera_lookingAtObject, "f")) {
            this.stopLookingAtObject();
        }
        let oldObject = __classPrivateFieldGet(this, _FlowedCamera_targetObject, "f");
        let oldLookingAtObject = __classPrivateFieldGet(this, _FlowedCamera_lookingAtObject, "f");
        __classPrivateFieldSet(this, _FlowedCamera_targetObject, obj, "f");
        __classPrivateFieldSet(this, _FlowedCamera_lookingAtObject, true, "f");
        __classPrivateFieldSet(this, _FlowedCamera_lookAtObjectReceipt, mesh_object_signals_1.MeshObjectSignals
            .getTranslationSubscriberOf(__classPrivateFieldGet(this, _FlowedCamera_targetObject, "f"))
            .subscribe((0, options_1.handler)((signal) => { this.lookAtObject(signal); })), "f");
        __classPrivateFieldGet(this, _FlowedCamera_lookedAtObjectFlow, "f").fire(this, new performed_object_set_1.PerformedObjectSet(oldObject, __classPrivateFieldGet(this, _FlowedCamera_targetObject, "f")));
        __classPrivateFieldGet(this, _FlowedCamera_lookingAtObjectFlow, "f").fire(this, new performed_object_set_1.PerformedObjectSet(oldLookingAtObject, __classPrivateFieldGet(this, _FlowedCamera_lookingAtObject, "f")));
    }
    stopFollowingObject() {
        if (__classPrivateFieldGet(this, _FlowedCamera_followObjectTranslation, "f") == true) {
            let oldFollowObjectTranslation = __classPrivateFieldGet(this, _FlowedCamera_followObjectTranslation, "f");
            mesh_object_signals_1.MeshObjectSignals
                .getTranslationSubscriberOf(__classPrivateFieldGet(this, _FlowedCamera_targetObject, "f"))
                .unsubscribe(__classPrivateFieldGet(this, _FlowedCamera_followObjectReceipt, "f"));
            __classPrivateFieldSet(this, _FlowedCamera_followObjectReceipt, null, "f");
            __classPrivateFieldSet(this, _FlowedCamera_followObjectTranslation, false, "f");
            __classPrivateFieldGet(this, _FlowedCamera_followObjectTranslationFlow, "f").fire(this, new performed_object_set_1.PerformedObjectSet(oldFollowObjectTranslation, __classPrivateFieldGet(this, _FlowedCamera_followObjectTranslation, "f")));
        }
    }
    stopLookingAtObject() {
        if (__classPrivateFieldGet(this, _FlowedCamera_lookingAtObject, "f")) {
            if (__classPrivateFieldGet(this, _FlowedCamera_followObjectTranslation, "f")) {
                this.stopFollowingObject();
            }
            mesh_object_signals_1.MeshObjectSignals
                .getTranslationSubscriberOf(__classPrivateFieldGet(this, _FlowedCamera_targetObject, "f"))
                .unsubscribe(__classPrivateFieldGet(this, _FlowedCamera_lookAtObjectReceipt, "f"));
            __classPrivateFieldSet(this, _FlowedCamera_lookAtObjectReceipt, null, "f");
            let oldLookingAtObject = __classPrivateFieldGet(this, _FlowedCamera_lookingAtObject, "f");
            __classPrivateFieldSet(this, _FlowedCamera_lookingAtObject, false, "f");
            __classPrivateFieldGet(this, _FlowedCamera_lookingAtObjectFlow, "f").fire(this, new performed_object_set_1.PerformedObjectSet(oldLookingAtObject, __classPrivateFieldGet(this, _FlowedCamera_lookingAtObject, "f")));
        }
    }
}
exports.default = FlowedCamera;
_FlowedCamera_position = new WeakMap(), _FlowedCamera_up = new WeakMap(), _FlowedCamera_target = new WeakMap(), _FlowedCamera_fov = new WeakMap(), _FlowedCamera_lookingAtObject = new WeakMap(), _FlowedCamera_followObjectTranslation = new WeakMap(), _FlowedCamera_targetObject = new WeakMap(), _FlowedCamera_lookingAtObjectReceipt = new WeakMap(), _FlowedCamera_positionFlow = new WeakMap(), _FlowedCamera_upFlow = new WeakMap(), _FlowedCamera_targetFlow = new WeakMap(), _FlowedCamera_fovFlow = new WeakMap(), _FlowedCamera_lookingAtObjectFlow = new WeakMap(), _FlowedCamera_followObjectTranslationFlow = new WeakMap(), _FlowedCamera_followedObjectFlow = new WeakMap(), _FlowedCamera_lookedAtObjectFlow = new WeakMap(), _FlowedCamera_performedTranslationBuilder = new WeakMap(), _FlowedCamera_lookAtObjectReceipt = new WeakMap(), _FlowedCamera_followObjectReceipt = new WeakMap();
//# sourceMappingURL=flowed-camera.js.map