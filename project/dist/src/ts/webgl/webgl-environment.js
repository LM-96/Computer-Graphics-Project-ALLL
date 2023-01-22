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
var _WebGLEnvironment_canvas, _WebGLEnvironment_gl, _WebGLEnvironment_programInfo;
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWebglEnvironment = exports.WebGLEnvironment = void 0;
class WebGLEnvironment {
    constructor(canvas, webGLShaders) {
        _WebGLEnvironment_canvas.set(this, void 0);
        _WebGLEnvironment_gl.set(this, void 0);
        _WebGLEnvironment_programInfo.set(this, void 0);
        if (!('getContext' in canvas)) {
            alert("The given HTML element is not a canvas");
            throw new Error("The given HTML element is not a canvas");
        }
        __classPrivateFieldSet(this, _WebGLEnvironment_canvas, canvas, "f");
        __classPrivateFieldSet(this, _WebGLEnvironment_gl, __classPrivateFieldGet(this, _WebGLEnvironment_canvas, "f").getContext("webgl"), "f");
        if (__classPrivateFieldGet(this, _WebGLEnvironment_gl, "f") == null) {
            alert("Unable to initialize WebGL. Your browser or machine may not support it.");
            throw new Error("Unable to initialize WebGL. Your browser or machine may not support it.");
        }
        __classPrivateFieldSet(this, _WebGLEnvironment_programInfo, WebGLUtils.createProgramInfo(__classPrivateFieldGet(this, _WebGLEnvironment_gl, "f"), webGLShaders), "f");
    }
    /**
     * Returns the `HtmlCanvasElement` associated to this environment
     */
    getCanvas() {
        return __classPrivateFieldGet(this, _WebGLEnvironment_canvas, "f");
    }
    /**
     * Returns the `WebGLRenderingContext` associated to this environment
     */
    getContext() {
        return __classPrivateFieldGet(this, _WebGLEnvironment_gl, "f");
    }
    /**
     * Returns the `WebGLProgram` associated to this environment
     */
    getProgramInfo() {
        return __classPrivateFieldGet(this, _WebGLEnvironment_programInfo, "f");
    }
    /**
     * Returns the `WebGLProgram` associated to this environment
     */
    getProgram() {
        return __classPrivateFieldGet(this, _WebGLEnvironment_programInfo, "f").program;
    }
    /**
     * Returns the aspect ratio of the canvas
     */
    calculateAspectRatio() {
        return __classPrivateFieldGet(this, _WebGLEnvironment_canvas, "f").clientWidth / __classPrivateFieldGet(this, _WebGLEnvironment_canvas, "f").clientHeight;
    }
}
exports.WebGLEnvironment = WebGLEnvironment;
_WebGLEnvironment_canvas = new WeakMap(), _WebGLEnvironment_gl = new WeakMap(), _WebGLEnvironment_programInfo = new WeakMap();
/**
 * Creates a new `WebglEnvironment` using the `canvasHtmlName` to find the `HtmlElement` of the canvas
 * and the `webGLShaders` to create the `WebGLProgram`
 * @param {string} canvasHtmlName the name of the `HtmlElement` of the canvas
 * @param {string[]} webGLShaders the names of the shaders to create the `WebGLProgram`
 */
function createWebglEnvironment(canvasHtmlName, webGLShaders) {
    let canvas = document.getElementById(canvasHtmlName);
    if (canvas == null) {
        alert("Unable to find the canvas with id: " + canvas);
        throw new Error("Unable to find the canvas with id: " + canvas);
    }
    return new WebGLEnvironment(canvas, webGLShaders);
}
exports.createWebglEnvironment = createWebglEnvironment;
//# sourceMappingURL=webgl-environment.js.map