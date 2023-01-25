"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _SlManager_instances, _a, _SlManager_depthTB, _SlManager_lightDirection, _SlManager_sharedUniforms, _SlManager_lightPosition, _SlManager_lightTarget, _SlManager_lightUp, _SlManager_lightFov, _SlManager_spotlight, _SlManager_projWidth, _SlManager_projHeight, _SlManager_shadows, _SlManager_near, _SlManager_far, _SlManager_updateSharedUniforms;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlManager = void 0;
const number_trio_1 = require("../types/numbers/number-trio");
const point_factory_1 = require("../geometry/point/point-factory");
const angle_1 = require("../geometry/angle/angle");
const pair_1 = require("../types/pair");
class SlManager {
    static getTextureForLights(gl) {
        let res = __classPrivateFieldGet(SlManager, _a, "f", _SlManager_depthTB).get(gl);
        if (res === undefined) {
            let depthTexture = gl.createTexture();
            let depthTextureSize = this.depthTextureSize;
            gl.bindTexture(gl.TEXTURE_2D, depthTexture);
            gl.texImage2D(gl.TEXTURE_2D, // target
            0, // mip level
            gl.DEPTH_COMPONENT, // internal format
            depthTextureSize, // width
            depthTextureSize, // height
            0, // border
            gl.DEPTH_COMPONENT, // format
            gl.UNSIGNED_INT, // type
            null); // data
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            let depthFramebuffer = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, depthFramebuffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, // target
            gl.DEPTH_ATTACHMENT, // attachment point
            gl.TEXTURE_2D, // texture target
            depthTexture, // texture
            0); // mip level
            // --------------------------------------------------
            // UNUSED TEXTURE
            // create a color texture of the same size as the depth texture
            // see article why this is needed_
            let unusedTexture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, unusedTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, depthTextureSize, depthTextureSize, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            // attach it to the framebuffer
            gl.framebufferTexture2D(gl.FRAMEBUFFER, // target
            gl.COLOR_ATTACHMENT0, // attachment point
            gl.TEXTURE_2D, // texture target
            unusedTexture, // texture
            0);
            res = (0, pair_1.pairOf)(depthTexture, depthFramebuffer);
            __classPrivateFieldGet(this, _a, "f", _SlManager_depthTB).set(gl, res);
        }
        return res;
    }
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
        _SlManager_near.set(this, 1);
        _SlManager_far.set(this, 700);
        __classPrivateFieldSet(this, _SlManager_sharedUniforms, sharedUniforms, "f");
    }
    calculateLightWorldMatrix() {
        return M4.lookAt([__classPrivateFieldGet(this, _SlManager_lightPosition, "f").getX(), __classPrivateFieldGet(this, _SlManager_lightPosition, "f").getY(), __classPrivateFieldGet(this, _SlManager_lightPosition, "f").getZ()], [__classPrivateFieldGet(this, _SlManager_lightTarget, "f").getX(), __classPrivateFieldGet(this, _SlManager_lightTarget, "f").getY(), __classPrivateFieldGet(this, _SlManager_lightTarget, "f").getZ()], [__classPrivateFieldGet(this, _SlManager_lightUp, "f").getFirst(), __classPrivateFieldGet(this, _SlManager_lightUp, "f").getSecond(), __classPrivateFieldGet(this, _SlManager_lightUp, "f").getThird()]);
    }
    calculateLightProjectionMatrix() {
        if (__classPrivateFieldGet(this, _SlManager_spotlight, "f")) {
            return M4.perspective(__classPrivateFieldGet(this, _SlManager_lightFov, "f").getValueIn(angle_1.AngleUnit.RAD), __classPrivateFieldGet(this, _SlManager_projWidth, "f") / __classPrivateFieldGet(this, _SlManager_projHeight, "f"), __classPrivateFieldGet(this, _SlManager_near, "f"), __classPrivateFieldGet(this, _SlManager_far, "f"));
        }
        else {
            return M4.orthographic(-__classPrivateFieldGet(this, _SlManager_projWidth, "f") / 2, __classPrivateFieldGet(this, _SlManager_projWidth, "f") / 2, -__classPrivateFieldGet(this, _SlManager_projHeight, "f") / 2, __classPrivateFieldGet(this, _SlManager_projHeight, "f") / 2, __classPrivateFieldGet(this, _SlManager_near, "f"), __classPrivateFieldGet(this, _SlManager_far, "f"));
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
    getNear() {
        return __classPrivateFieldGet(this, _SlManager_near, "f");
    }
    getFar() {
        return __classPrivateFieldGet(this, _SlManager_far, "f");
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
    setNear(value) {
        __classPrivateFieldSet(this, _SlManager_near, value, "f");
    }
    setFar(value) {
        __classPrivateFieldSet(this, _SlManager_far, value, "f");
    }
}
exports.SlManager = SlManager;
_a = SlManager, _SlManager_lightDirection = new WeakMap(), _SlManager_sharedUniforms = new WeakMap(), _SlManager_lightPosition = new WeakMap(), _SlManager_lightTarget = new WeakMap(), _SlManager_lightUp = new WeakMap(), _SlManager_lightFov = new WeakMap(), _SlManager_spotlight = new WeakMap(), _SlManager_projWidth = new WeakMap(), _SlManager_projHeight = new WeakMap(), _SlManager_shadows = new WeakMap(), _SlManager_near = new WeakMap(), _SlManager_far = new WeakMap(), _SlManager_instances = new WeakSet(), _SlManager_updateSharedUniforms = function _SlManager_updateSharedUniforms() {
    __classPrivateFieldGet(this, _SlManager_sharedUniforms, "f").u_lightDirection = __classPrivateFieldGet(this, _SlManager_lightDirection, "f").toArray();
};
SlManager.depthTextureSize = 512;
_SlManager_depthTB = { value: new Map() };
//# sourceMappingURL=sl-manager.js.map