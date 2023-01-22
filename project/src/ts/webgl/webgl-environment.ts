import {ProgramInfo} from "./webgl-wrappers";

export class WebGLEnvironment {

    readonly #canvas : HTMLCanvasElement;
    readonly #gl: WebGLRenderingContext
    readonly #programInfo: ProgramInfo

    constructor(canvas: HTMLElement, webGLShaders: WebGLShader[]) {
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
        this.#programInfo = WebGLUtils.createProgramInfo(this.#gl, webGLShaders);
        this.#gl.useProgram(this.#programInfo.program)
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
    getProgramInfo(): ProgramInfo {
        return this.#programInfo;
    }


    /**
     * Returns the `WebGLProgram` associated to this environment
     */
    getProgram(): WebGLProgram {
        return this.#programInfo.program;
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
export function createWebglEnvironment(canvasHtmlName: string, webGLShaders: string[]): WebGLEnvironment {
    let canvas: HTMLElement = document.getElementById(canvasHtmlName);
    if(canvas == null) {
        alert("Unable to find the canvas with id: " + canvas);
        throw new Error("Unable to find the canvas with id: " + canvas);
    }
    return new WebGLEnvironment(canvas, webGLShaders);
}