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
var _FlowedMeshObject_name, _FlowedMeshObject_data, _FlowedMeshObject_position, _FlowedMeshObject_polarRotation, _FlowedMeshObject_scale, _FlowedMeshObject_limitChecker, _FlowedMeshObject_bufferInfo, _FlowedMeshObject_translationFlow, _FlowedMeshObject_polarRotationFlow, _FlowedMeshObject_scaleFlow, _FlowedMeshObject_performedTranslationBuilder, _FlowedMeshObject_performedPolarRotationBuilder, _FlowedMeshObject_performedScaleBuilder;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowedMeshObject = void 0;
const number_trio_1 = require("../types/numbers/number-trio");
const limits_checkers_1 = require("../geometry/limits/limits-checkers");
const pair_1 = require("../types/pair");
const angle_1 = require("../geometry/angle/angle");
const flow_1 = require("../signals/flow");
const performed_translation_1 = require("../geometry/data/performed-translation");
const performed_polar_rotation_1 = require("../geometry/data/performed-polar-rotation");
const point_factory_1 = require("../geometry/point/point-factory");
const performed_scale_1 = require("../geometry/data/performed-scale");
const mesh_object_signals_1 = require("./mesh-object-signals");
class FlowedMeshObject {
    constructor(name, data) {
        _FlowedMeshObject_name.set(this, void 0);
        _FlowedMeshObject_data.set(this, void 0);
        _FlowedMeshObject_position.set(this, void 0);
        _FlowedMeshObject_polarRotation.set(this, void 0);
        _FlowedMeshObject_scale.set(this, void 0);
        _FlowedMeshObject_limitChecker.set(this, void 0);
        _FlowedMeshObject_bufferInfo.set(this, null);
        _FlowedMeshObject_translationFlow.set(this, void 0);
        _FlowedMeshObject_polarRotationFlow.set(this, void 0);
        _FlowedMeshObject_scaleFlow.set(this, void 0);
        _FlowedMeshObject_performedTranslationBuilder.set(this, void 0);
        _FlowedMeshObject_performedPolarRotationBuilder.set(this, void 0);
        _FlowedMeshObject_performedScaleBuilder.set(this, void 0);
        __classPrivateFieldSet(this, _FlowedMeshObject_name, name, "f");
        __classPrivateFieldSet(this, _FlowedMeshObject_data, data, "f");
        __classPrivateFieldSet(this, _FlowedMeshObject_position, (0, point_factory_1.mutablePoint3D)(0, 0, 0), "f");
        __classPrivateFieldSet(this, _FlowedMeshObject_polarRotation, (0, pair_1.coupleOf)((0, angle_1.angle)(0), (0, angle_1.angle)(0)), "f");
        __classPrivateFieldSet(this, _FlowedMeshObject_scale, (0, number_trio_1.numberTrio)(1, 1, 1), "f");
        __classPrivateFieldSet(this, _FlowedMeshObject_limitChecker, limits_checkers_1.LimitsCheckers.unlimited(), "f");
        __classPrivateFieldSet(this, _FlowedMeshObject_translationFlow, flow_1.default.newSingleFlow(mesh_object_signals_1.MeshObjectSignals.translationSignalNameOf(name)), "f");
        __classPrivateFieldSet(this, _FlowedMeshObject_polarRotationFlow, flow_1.default.newSingleFlow(mesh_object_signals_1.MeshObjectSignals.polarRotationSignalNameOf(name)), "f");
        __classPrivateFieldSet(this, _FlowedMeshObject_scaleFlow, flow_1.default.newSingleFlow(mesh_object_signals_1.MeshObjectSignals.scaleSignalNameOf(name)), "f");
        __classPrivateFieldSet(this, _FlowedMeshObject_performedTranslationBuilder, new performed_translation_1.PerformedTranslationBuilder(), "f");
        __classPrivateFieldSet(this, _FlowedMeshObject_performedPolarRotationBuilder, new performed_polar_rotation_1.PerformedPolarRotationBuilder(), "f");
        __classPrivateFieldSet(this, _FlowedMeshObject_performedScaleBuilder, new performed_scale_1.PerformedScaleBuilder(), "f");
        __classPrivateFieldGet(this, _FlowedMeshObject_performedTranslationBuilder, "f").who = name;
        __classPrivateFieldGet(this, _FlowedMeshObject_performedPolarRotationBuilder, "f").who = name;
        __classPrivateFieldGet(this, _FlowedMeshObject_performedScaleBuilder, "f").who = name;
    }
    draw(gl, programInfo, clear) {
        if (clear == undefined) {
            clear = false;
        }
        if (clear) {
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        }
        WebGLUtils.setBuffersAndAttributes(gl, programInfo, __classPrivateFieldGet(this, _FlowedMeshObject_bufferInfo, "f"));
        WebGLUtils.setUniforms(programInfo, __classPrivateFieldGet(this, _FlowedMeshObject_data, "f").uniforms);
        gl.drawArrays(gl.TRIANGLES, 0, __classPrivateFieldGet(this, _FlowedMeshObject_bufferInfo, "f").numElements);
    }
    getCurrentScale() {
        return __classPrivateFieldGet(this, _FlowedMeshObject_scale, "f").clone();
    }
    getLimitsChecker() {
        return __classPrivateFieldGet(this, _FlowedMeshObject_limitChecker, "f");
    }
    getPosition() {
        return __classPrivateFieldGet(this, _FlowedMeshObject_position, "f").clone();
    }
    getName() {
        return __classPrivateFieldGet(this, _FlowedMeshObject_name, "f");
    }
    getPolarRotation() {
        return __classPrivateFieldGet(this, _FlowedMeshObject_polarRotation, "f").clone();
    }
    getPolarRotationSubscriber() {
        return __classPrivateFieldGet(this, _FlowedMeshObject_polarRotationFlow, "f");
    }
    getScaleSubscriber() {
        return __classPrivateFieldGet(this, _FlowedMeshObject_scaleFlow, "f");
    }
    getTranslationSubscriber() {
        return __classPrivateFieldGet(this, _FlowedMeshObject_translationFlow, "f");
    }
    glInit(gl) {
        __classPrivateFieldSet(this, _FlowedMeshObject_bufferInfo, WebGLUtils.createBufferInfoFromArrays(gl, __classPrivateFieldGet(this, _FlowedMeshObject_data, "f").attributes), "f");
        __classPrivateFieldGet(this, _FlowedMeshObject_data, "f").uniforms.u_world = M4.identity();
    }
    setLimitsChecker(limitsChecker) {
        __classPrivateFieldSet(this, _FlowedMeshObject_limitChecker, limitsChecker, "f");
    }
    setPolarRotation(theta, phi) {
        __classPrivateFieldGet(this, _FlowedMeshObject_performedPolarRotationBuilder, "f").clear();
        __classPrivateFieldGet(this, _FlowedMeshObject_performedPolarRotationBuilder, "f").from = __classPrivateFieldGet(this, _FlowedMeshObject_polarRotation, "f").clone();
        __classPrivateFieldGet(this, _FlowedMeshObject_polarRotation, "f").setFirst(theta);
        __classPrivateFieldGet(this, _FlowedMeshObject_polarRotation, "f").setSecond(phi);
        __classPrivateFieldGet(this, _FlowedMeshObject_performedPolarRotationBuilder, "f").to = __classPrivateFieldGet(this, _FlowedMeshObject_polarRotation, "f").clone();
        __classPrivateFieldGet(this, _FlowedMeshObject_polarRotationFlow, "f").fire(this, __classPrivateFieldGet(this, _FlowedMeshObject_performedPolarRotationBuilder, "f").build());
    }
    setPosition(position, y, z) {
        __classPrivateFieldGet(this, _FlowedMeshObject_performedTranslationBuilder, "f").clear();
        __classPrivateFieldGet(this, _FlowedMeshObject_performedTranslationBuilder, "f").from = __classPrivateFieldGet(this, _FlowedMeshObject_position, "f").clone();
        if (typeof position === "number") {
            __classPrivateFieldGet(this, _FlowedMeshObject_position, "f").set(position, y, z);
        }
        else {
            __classPrivateFieldGet(this, _FlowedMeshObject_position, "f").set(position.getX(), position.getY(), position.getZ());
        }
        __classPrivateFieldGet(this, _FlowedMeshObject_performedTranslationBuilder, "f").to = __classPrivateFieldGet(this, _FlowedMeshObject_position, "f").clone();
        __classPrivateFieldGet(this, _FlowedMeshObject_translationFlow, "f").fire(this, __classPrivateFieldGet(this, _FlowedMeshObject_performedTranslationBuilder, "f").build());
    }
    setScale(scale, y, z) {
        __classPrivateFieldGet(this, _FlowedMeshObject_performedScaleBuilder, "f").clear();
        __classPrivateFieldGet(this, _FlowedMeshObject_performedScaleBuilder, "f").from = __classPrivateFieldGet(this, _FlowedMeshObject_scale, "f").clone();
        if (typeof scale === "number") {
            __classPrivateFieldGet(this, _FlowedMeshObject_scale, "f").setFirst(scale);
            __classPrivateFieldGet(this, _FlowedMeshObject_scale, "f").setSecond(y);
            __classPrivateFieldGet(this, _FlowedMeshObject_scale, "f").setThird(z);
        }
        else {
            __classPrivateFieldGet(this, _FlowedMeshObject_scale, "f").setFirst(scale.getFirst());
            __classPrivateFieldGet(this, _FlowedMeshObject_scale, "f").setSecond(scale.getSecond());
            __classPrivateFieldGet(this, _FlowedMeshObject_scale, "f").setThird(scale.getThird());
        }
        __classPrivateFieldGet(this, _FlowedMeshObject_performedScaleBuilder, "f").to = __classPrivateFieldGet(this, _FlowedMeshObject_scale, "f").clone();
        __classPrivateFieldGet(this, _FlowedMeshObject_scaleFlow, "f").fire(this, __classPrivateFieldGet(this, _FlowedMeshObject_performedScaleBuilder, "f").build());
    }
}
exports.FlowedMeshObject = FlowedMeshObject;
_FlowedMeshObject_name = new WeakMap(), _FlowedMeshObject_data = new WeakMap(), _FlowedMeshObject_position = new WeakMap(), _FlowedMeshObject_polarRotation = new WeakMap(), _FlowedMeshObject_scale = new WeakMap(), _FlowedMeshObject_limitChecker = new WeakMap(), _FlowedMeshObject_bufferInfo = new WeakMap(), _FlowedMeshObject_translationFlow = new WeakMap(), _FlowedMeshObject_polarRotationFlow = new WeakMap(), _FlowedMeshObject_scaleFlow = new WeakMap(), _FlowedMeshObject_performedTranslationBuilder = new WeakMap(), _FlowedMeshObject_performedPolarRotationBuilder = new WeakMap(), _FlowedMeshObject_performedScaleBuilder = new WeakMap();
//# sourceMappingURL=flowed-mesh-object.js.map