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
var _MeshObjectDrawer_glEnvironment, _MeshObjectDrawer_meshObjectManager, _MeshObjectDrawer_camera, _MeshObjectDrawer_sharedUniforms, _MeshObjectDrawer_slManager, _MeshObjectDrawer_lightFrustum, _MeshObjectDrawer_bias, _MeshObjectDrawer_cubeLinesBufferInfo;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeshObjectDrawer = void 0;
const flowed_camera_1 = require("../camera/flowed-camera");
const webgl_wrappers_1 = require("../webgl/webgl-wrappers");
const angle_1 = require("../geometry/angle/angle");
const log_1 = require("../log/log");
const sl_manager_1 = require("./sl-manager");
class MeshObjectDrawer {
    constructor(applicationName, glEnvironment, meshObjectManager) {
        _MeshObjectDrawer_glEnvironment.set(this, void 0);
        _MeshObjectDrawer_meshObjectManager.set(this, void 0);
        this.zNear = 0.1;
        this.zFar = 200;
        _MeshObjectDrawer_camera.set(this, new flowed_camera_1.default());
        _MeshObjectDrawer_sharedUniforms.set(this, void 0);
        _MeshObjectDrawer_slManager.set(this, void 0);
        _MeshObjectDrawer_lightFrustum.set(this, void 0);
        _MeshObjectDrawer_bias.set(this, void 0);
        _MeshObjectDrawer_cubeLinesBufferInfo.set(this, void 0);
        this.applicationName = applicationName;
        __classPrivateFieldSet(this, _MeshObjectDrawer_glEnvironment, glEnvironment, "f");
        __classPrivateFieldSet(this, _MeshObjectDrawer_meshObjectManager, meshObjectManager, "f");
        __classPrivateFieldSet(this, _MeshObjectDrawer_sharedUniforms, new webgl_wrappers_1.SharedUniforms(), "f");
        __classPrivateFieldSet(this, _MeshObjectDrawer_slManager, new sl_manager_1.SlManager(__classPrivateFieldGet(this, _MeshObjectDrawer_sharedUniforms, "f")), "f");
        __classPrivateFieldSet(this, _MeshObjectDrawer_lightFrustum, false, "f");
        __classPrivateFieldSet(this, _MeshObjectDrawer_bias, -0.006, "f");
        __classPrivateFieldSet(this, _MeshObjectDrawer_cubeLinesBufferInfo, WebGLUtils.createBufferInfoFromArrays(__classPrivateFieldGet(this, _MeshObjectDrawer_glEnvironment, "f").getContext(), {
            position: [
                -1, -1, -1,
                1, -1, -1,
                -1, 1, -1,
                1, 1, -1,
                -1, -1, 1,
                1, -1, 1,
                -1, 1, 1,
                1, 1, 1,
            ],
            indices: [
                0, 1,
                1, 3,
                3, 2,
                2, 0,
                4, 5,
                5, 7,
                7, 6,
                6, 4,
                0, 4,
                1, 5,
                3, 7,
                2, 6,
            ],
        }), "f");
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
    drawSceneWith(projectionMatrix, cameraMatrix, textureMatrix, lightWorldMatrix, programInfo) {
        log_1.Log.log("MeshObjectDrawer[" + this.applicationName +
            "] | starting drawing with program info [" + programInfo + "]");
        let gl = __classPrivateFieldGet(this, _MeshObjectDrawer_glEnvironment, "f").getContext();
        let viewMatrix = M4.inverse(cameraMatrix);
        gl.useProgram(programInfo.program);
        WebGLUtils.setUniforms(programInfo, {
            u_view: viewMatrix,
            u_projection: projectionMatrix,
            u_bias: __classPrivateFieldGet(this, _MeshObjectDrawer_bias, "f"),
            u_textureMatrix: textureMatrix,
            u_projectedTexture: sl_manager_1.SlManager.getTextureForLights(__classPrivateFieldGet(this, _MeshObjectDrawer_glEnvironment, "f").getContext()).getFirst(),
            u_lightDirection: __classPrivateFieldGet(this, _MeshObjectDrawer_slManager, "f").calculateLightWorldMatrix().slice(8, 11),
        });
        gl.uniform1f(gl.getUniformLocation(programInfo.program, "mesh"), 1.);
        for (let meshObject of __classPrivateFieldGet(this, _MeshObjectDrawer_meshObjectManager, "f").getAll()) {
            log_1.Log.log("MeshObjectDrawer[" + this.applicationName + "] | drawing mesh object [" + meshObject.getName() + "]");
            meshObject.draw(gl, programInfo, false);
        }
    }
    render() {
        let gl = __classPrivateFieldGet(this, _MeshObjectDrawer_glEnvironment, "f").getContext();
        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);
        let lightWorldMatrix = __classPrivateFieldGet(this, _MeshObjectDrawer_slManager, "f").calculateLightWorldMatrix();
        let lightProjectionMatrix = __classPrivateFieldGet(this, _MeshObjectDrawer_slManager, "f").calculateLightProjectionMatrix();
        gl.bindFramebuffer(gl.FRAMEBUFFER, sl_manager_1.SlManager.getTextureForLights(__classPrivateFieldGet(this, _MeshObjectDrawer_glEnvironment, "f").getContext()).getSecond());
        gl.viewport(0, 0, sl_manager_1.SlManager.depthTextureSize, sl_manager_1.SlManager.depthTextureSize);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        /* TO ADJUST BASED ON WHICH PROGRAMS ARE PRESENT AND USED */
        if (__classPrivateFieldGet(this, _MeshObjectDrawer_slManager, "f").getShadows()) {
            this.drawSceneWith(lightProjectionMatrix, lightWorldMatrix, M4.identity(), lightWorldMatrix, __classPrivateFieldGet(this, _MeshObjectDrawer_glEnvironment, "f").getProgramInfo('color'));
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        let textureMatrix = M4.identity();
        textureMatrix = M4.translate(textureMatrix, 0.5, 0.5, 0.5);
        textureMatrix = M4.scale(textureMatrix, 0.5, 0.5, 0.5);
        textureMatrix = M4.multiply(textureMatrix, lightProjectionMatrix);
        textureMatrix = M4.multiply(textureMatrix, M4.inverse(lightWorldMatrix));
        this.updateProjectionMatrix();
        this.updateViewMatrix();
        let viewProjectionMatrix = M4.multiply(__classPrivateFieldGet(this, _MeshObjectDrawer_sharedUniforms, "f").u_projection, __classPrivateFieldGet(this, _MeshObjectDrawer_sharedUniforms, "f").u_view);
        this.drawSceneWith(viewProjectionMatrix, __classPrivateFieldGet(this, _MeshObjectDrawer_camera, "f").calculateCameraMatrix(), textureMatrix, lightWorldMatrix, __classPrivateFieldGet(this, _MeshObjectDrawer_glEnvironment, "f").getProgramInfo('main'));
        if (__classPrivateFieldGet(this, _MeshObjectDrawer_lightFrustum, "f")) {
            let viewMatrix = M4.inverse(__classPrivateFieldGet(this, _MeshObjectDrawer_camera, "f").calculateCameraMatrix());
            gl.useProgram(__classPrivateFieldGet(this, _MeshObjectDrawer_glEnvironment, "f").getProgramInfo('color').program);
            WebGLUtils.setBuffersAndAttributes(gl, __classPrivateFieldGet(this, _MeshObjectDrawer_glEnvironment, "f").getProgramInfo('color'), __classPrivateFieldGet(this, _MeshObjectDrawer_cubeLinesBufferInfo, "f"));
            const mat = M4.multiply(lightWorldMatrix, M4.inverse(lightProjectionMatrix));
            WebGLUtils.setUniforms(__classPrivateFieldGet(this, _MeshObjectDrawer_glEnvironment, "f").getProgramInfo('color'), {
                u_color: [1, 1, 1, 1],
                u_view: viewMatrix,
                u_projection: __classPrivateFieldGet(this, _MeshObjectDrawer_sharedUniforms, "f").u_projection,
                u_world: mat,
            });
            WebGLUtils.drawBufferInfo(gl, __classPrivateFieldGet(this, _MeshObjectDrawer_cubeLinesBufferInfo, "f"), gl.LINES);
        }
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
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
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
        log_1.Log.log("MeshObjectDrawer[" + this.applicationName + "]\n" +
            "\tcanvas size: " + __classPrivateFieldGet(this, _MeshObjectDrawer_glEnvironment, "f").getCanvas().width + "x" + __classPrivateFieldGet(this, _MeshObjectDrawer_glEnvironment, "f").getCanvas().height + "\n" +
            "\tcanvas aspect ratio: " + __classPrivateFieldGet(this, _MeshObjectDrawer_glEnvironment, "f").calculateAspectRatio() + "\n" +
            "\tcamera position: " + __classPrivateFieldGet(this, _MeshObjectDrawer_camera, "f").getCurrentPosition().toString() + "\n" +
            "\tcamera up: " + __classPrivateFieldGet(this, _MeshObjectDrawer_camera, "f").getCurrentUp().toString() + "\n" +
            "\tcamera target: " + __classPrivateFieldGet(this, _MeshObjectDrawer_camera, "f").getCurrentTarget().toString() + "\n" +
            "\tfov: " + __classPrivateFieldGet(this, _MeshObjectDrawer_camera, "f").getCurrentFov().getValueIn(angle_1.AngleUnit.DEG) + "°\n" +
            "\tzNear: " + this.zNear + "\n" +
            "\tzFar: " + this.zFar);
        // Log.log("MeshObjectDrawer[" + this.applicationName + "] | drawing scene")
        //
        // let gl: WebGLRenderingContext = this.#glEnvironment.getContext()
        // let programInfo: ProgramInfo = this.#glEnvironment.getProgramInfo()
        // this.startDrawing()
        // for(let meshObject of this.#meshObjectManager.getAll()) {
        //     Log.log("MeshObjectDrawer[" + this.applicationName + "] | drawing mesh object [" + meshObject.getName() + "]")
        //     meshObject.draw(gl, programInfo, false)
        // }
        //
        // Log.log("MeshObjectDrawer[" + this.applicationName + "] | scene drawn")
        this.render();
    }
    setBias(bias) {
        __classPrivateFieldSet(this, _MeshObjectDrawer_bias, bias, "f");
    }
    /**
     * Returns the `Camera` associated of this drawer
     */
    getCamera() {
        return __classPrivateFieldGet(this, _MeshObjectDrawer_camera, "f");
    }
    /**
     * Returns the manager for the shadows and the lights
     */
    getSlManager() {
        return __classPrivateFieldGet(this, _MeshObjectDrawer_slManager, "f");
    }
    /**
     * Returns the `MeshObjectManager` associated of this drawer
     */
    getMeshObjectManager() {
        return __classPrivateFieldGet(this, _MeshObjectDrawer_meshObjectManager, "f");
    }
    setLightFrustum(lightFrustum) {
        __classPrivateFieldSet(this, _MeshObjectDrawer_lightFrustum, lightFrustum, "f");
    }
    getLightFrustum() {
        return __classPrivateFieldGet(this, _MeshObjectDrawer_lightFrustum, "f");
    }
    getBias() {
        return __classPrivateFieldGet(this, _MeshObjectDrawer_bias, "f");
    }
}
exports.MeshObjectDrawer = MeshObjectDrawer;
_MeshObjectDrawer_glEnvironment = new WeakMap(), _MeshObjectDrawer_meshObjectManager = new WeakMap(), _MeshObjectDrawer_camera = new WeakMap(), _MeshObjectDrawer_sharedUniforms = new WeakMap(), _MeshObjectDrawer_slManager = new WeakMap(), _MeshObjectDrawer_lightFrustum = new WeakMap(), _MeshObjectDrawer_bias = new WeakMap(), _MeshObjectDrawer_cubeLinesBufferInfo = new WeakMap();
//# sourceMappingURL=mesh-object-drawer.js.map