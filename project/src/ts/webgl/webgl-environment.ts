import {ProgramInfo} from "./webgl-wrappers";

export class WebGLEnvironment {

    readonly #canvas : HTMLCanvasElement;
    readonly #gl: WebGLRenderingContext
    readonly #programInfo: Map<string, ProgramInfo>

    constructor(canvas: HTMLElement, webGLShaders: Map<string, WebGLShader[]>) {
        if(!('getContext' in canvas)) {
            alert("The given HTML element is not a canvas")
            throw new Error("The given HTML element is not a canvas")
        }

        this.#canvas = canvas as HTMLCanvasElement;
        this.#gl = this.#canvas.getContext("webgl");
        if (this.#gl == null) {
            alert("Unable to initialize WebGL. Your browser or machine may not support it.");
            throw new Error("Unable to initialize WebGL. Your browser or machine may not support it.");
        }

        const ext = this.#gl.getExtension('WEBGL_depth_texture');
        if (!ext) {
            alert('WEBGL_depth_texture is required to work');
        }

        this.#programInfo = new Map<string, ProgramInfo>()
        webGLShaders.forEach((value, key) => {
            this.#programInfo.set(key, WebGLUtils.createProgramInfo(this.#gl, value))
        })
    }

    /**
     * Returns the `HtmlCanvasElement` associated to this environment
     */
    getCanvas(): HTMLCanvasElement {
        return this.#canvas;
    }

    /**
     * Returns the `WebGLRenderingContext` associated to this environment
     */
    getContext(): WebGLRenderingContext {
        return this.#gl;
    }

    /**
     * Returns the `WebGLProgram` associated to this environment
     */
    getProgramInfo(programName: string|null = null): ProgramInfo {
        if(programName == null) {
            return this.#programInfo.values().next().value;
        }
        return this.#programInfo.get(programName);
    }

    getProgramInfos(): Map<string, ProgramInfo> {
        return this.#programInfo;
    }

    getPrograms(): Map<string, WebGLProgram> {
        let programs = new Map<string, WebGLProgram>()
        this.#programInfo.forEach((value, key) => {
            programs.set(key, value.program)
        })
        return programs
    }

    /**
     * Returns the `WebGLProgram` associated to this environment
     */
    getProgram(programName: string|null = null): WebGLProgram {
        if(programName == null) {
            return this.#programInfo.values().next().value.program;
        }
        return this.#programInfo.get(programName)?.program;
    }

    /**
     * Returns the aspect ratio of the canvas
     */
    calculateAspectRatio(): number {
        return this.#canvas.clientWidth / this.#canvas.clientHeight;
    }
}

/**
 * Creates a new `WebglEnvironment` using the `canvasHtmlName` to find the `HtmlElement` of the canvas
 * and the `webGLShaders` to create the `WebGLProgram`
 * @param {string} canvasHtmlName the name of the `HtmlElement` of the canvas
 * @param {string[]} webGLShaders the names of the shaders to create the `WebGLProgram`
 */
export function createWebglEnvironment(canvasHtmlName: string, webGLShaders: Map<string, string[]>): WebGLEnvironment {
    let canvas: HTMLElement = document.getElementById(canvasHtmlName);
    if(canvas == null) {
        alert("Unable to find the canvas with id: " + canvas);
        throw new Error("Unable to find the canvas with id: " + canvas);
    }
    return new WebGLEnvironment(canvas, webGLShaders);
}