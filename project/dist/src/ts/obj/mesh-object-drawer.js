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
var _MeshObjectDrawer_glEnvironment, _MeshObjectDrawer_meshObjectManager, _MeshObjectDrawer_camera, _MeshObjectDrawer_sharedUniforms;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeshObjectDrawer = void 0;
const flowed_camera_1 = require("../camera/flowed-camera");
const webgl_wrappers_1 = require("../webgl/webgl-wrappers");
const angle_1 = require("../geometry/angle/angle");
const log_1 = require("../log/log");
class MeshObjectDrawer {
    constructor(applicationName, glEnvironment, meshObjectManager) {
        _MeshObjectDrawer_glEnvironment.set(this, void 0);
        _MeshObjectDrawer_meshObjectManager.set(this, void 0);
        this.zNear = 0.1;
        this.zFar = 200;
        _MeshObjectDrawer_camera.set(this, new flowed_camera_1.default());
        _MeshObjectDrawer_sharedUniforms.set(this, new webgl_wrappers_1.SharedUniforms());
        this.applicationName = applicationName;
        __classPrivateFieldSet(this, _MeshObjectDrawer_glEnvironment, glEnvironment, "f");
        __classPrivateFieldSet(this, _MeshObjectDrawer_meshObjectManager, meshObjectManager, "f");
    }
    /**
     * Updates the internal *View Matrix* using the camera
     */
    updateViewMatrix() {
        log_1.Log.log("MeshObjectDrawer[" + this.applicationName + "] | updating view matrix");
        __classPrivateFieldGet(this, _MeshObjectDrawer_sharedUniforms, "f").u_view = M4.inverse(__classPrivateFieldGet(this, _MeshObjectDrawer_camera, "f").calculateCameraMatrix());
        log_1.Log.log("MeshObjectDrawer[" + this.applicationName + "] | view matrix updated");
    }
    /**
     * Updates the internal *Projection Matrix* using the camera, the canvas, the zNear and the zFar
     */
    updateProjectionMatrix() {
        log_1.Log.log("MeshObjectDrawer[" + this.applicationName + "] | updating projection matrix");
        __classPrivateFieldGet(this, _MeshObjectDrawer_sharedUniforms, "f").u_projection = M4.perspective(__classPrivateFieldGet(this, _MeshObjectDrawer_camera, "f").getCurrentFov().getValueIn(angle_1.AngleUnit.RAD), __classPrivateFieldGet(this, _MeshObjectDrawer_glEnvironment, "f").calculateAspectRatio(), this.zNear, this.zFar);
        log_1.Log.log("MeshObjectDrawer[" + this.applicationName + "] | projection matrix updated");
    }
    /**
     * Begin the drawing process
     */
    startDrawing() {
        log_1.Log.log("MeshObjectDrawer[" + this.applicationName + "] | starting drawing...");
        log_1.Log.log("MeshObjectDrawer[" + this.applicationName + "]\n" +
            "\tcanvas size: " + __classPrivateFieldGet(this, _MeshObjectDrawer_glEnvironment, "f").getCanvas().width + "x" + __classPrivateFieldGet(this, _MeshObjectDrawer_glEnvironment, "f").getCanvas().height + "\n" +
            "\tcanvas aspect ratio: " + __classPrivateFieldGet(this, _MeshObjectDrawer_glEnvironment, "f").calculateAspectRatio() + "\n" +
            "\tcamera position: " + __classPrivateFieldGet(this, _MeshObjectDrawer_camera, "f").getCurrentPosition().toString() + "\n" +
            "\tcamera up: " + __classPrivateFieldGet(this, _MeshObjectDrawer_camera, "f").getCurrentUp().toString() + "\n" +
            "\tcamera target: " + __classPrivateFieldGet(this, _MeshObjectDrawer_camera, "f").getCurrentTarget().toString() + "\n" +
            "\tfov: " + __classPrivateFieldGet(this, _MeshObjectDrawer_camera, "f").getCurrentFov().getValueIn(angle_1.AngleUnit.DEG) + "°\n" +
            "\tzNear: " + this.zNear + "\n" +
            "\tzFar: " + this.zFar);
        let gl = __classPrivateFieldGet(this, _MeshObjectDrawer_glEnvironment, "f").getContext();
        log_1.Log.log("MeshObjectDrawer[" + this.applicationName + "] | context obtained [" + gl + "]");
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, gl.canvas);
        this.updateProjectionMatrix();
        this.updateViewMatrix();
        gl.useProgram(__classPrivateFieldGet(this, _MeshObjectDrawer_glEnvironment, "f").getProgram());
        log_1.Log.log("MeshObjectDrawer[" + this.applicationName + "] | program used [" + __classPrivateFieldGet(this, _MeshObjectDrawer_glEnvironment, "f").getProgram() + "]");
        WebGLUtils.setUniforms(__classPrivateFieldGet(this, _MeshObjectDrawer_glEnvironment, "f").getProgramInfo(), __classPrivateFieldGet(this, _MeshObjectDrawer_sharedUniforms, "f"));
        log_1.Log.log("MeshObjectDrawer[" + this.applicationName + "] | uniforms set [" + __classPrivateFieldGet(this, _MeshObjectDrawer_sharedUniforms, "f") + "]");
        log_1.Log.log("MeshObjectDrawer[" + this.applicationName + "] | start drawing done!");
    }
    /**
     * Draw the scene using the object manager and the camera
     */
    drawScene() {
        log_1.Log.log("MeshObjectDrawer[" + this.applicationName + "] | drawing scene");
        let gl = __classPrivateFieldGet(this, _MeshObjectDrawer_glEnvironment, "f").getContext();
        let programInfo = __classPrivateFieldGet(this, _MeshObjectDrawer_glEnvironment, "f").getProgramInfo();
        this.startDrawing();
        for (let meshObject of __classPrivateFieldGet(this, _MeshObjectDrawer_meshObjectManager, "f").getAll()) {
            log_1.Log.log("MeshObjectDrawer[" + this.applicationName + "] | drawing mesh object [" + meshObject.getName() + "]");
            meshObject.draw(gl, programInfo, false);
        }
        log_1.Log.log("MeshObjectDrawer[" + this.applicationName + "] | scene drawn");
    }
    /**
     * Returns the `Camera` associated of this drawer
     */
    getCamera() {
        return __classPrivateFieldGet(this, _MeshObjectDrawer_camera, "f");
    }
    /**
     * Returns the `MeshObjectManager` associated of this drawer
     */
    getMeshObjectManager() {
        return __classPrivateFieldGet(this, _MeshObjectDrawer_meshObjectManager, "f");
    }
}
exports.MeshObjectDrawer = MeshObjectDrawer;
_MeshObjectDrawer_glEnvironment = new WeakMap(), _MeshObjectDrawer_meshObjectManager = new WeakMap(), _MeshObjectDrawer_camera = new WeakMap(), _MeshObjectDrawer_sharedUniforms = new WeakMap();
//# sourceMappingURL=mesh-object-drawer.js.map