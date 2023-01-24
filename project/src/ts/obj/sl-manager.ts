import {numberTrio, NumberTrio} from "../types/numbers/number-trio";
import {SharedUniforms} from "../webgl/webgl-wrappers";
import {Point3D} from "../geometry/point/point-3d";
import {mutablePoint3D, point3D} from "../geometry/point/point-factory";
import {Angle, AngleUnit, radians} from "../geometry/angle/angle";
import {Pair, pairOf} from "../types/pair";

export class SlManager {

    static readonly depthTextureSize = 512
    static #depthTB: Map<WebGLRenderingContext, Pair<WebGLTexture, WebGLFramebuffer>> =
        new Map<WebGLRenderingContext, Pair<WebGLTexture, WebGLFramebuffer>>()
    static getTextureForLights(gl: WebGLRenderingContext) : Pair<WebGLTexture, WebGLFramebuffer> {

        let res: Pair<WebGLTexture, WebGLFramebuffer> = SlManager.#depthTB.get(gl)
        if(res === undefined) {
            let depthTexture = gl.createTexture();
            let depthTextureSize = this.depthTextureSize;
            gl.bindTexture(gl.TEXTURE_2D, depthTexture);
            gl.texImage2D(
                gl.TEXTURE_2D,      // target
                0,                  // mip level
                gl.DEPTH_COMPONENT, // internal format
                depthTextureSize,   // width
                depthTextureSize,   // height
                0,                  // border
                gl.DEPTH_COMPONENT, // format
                gl.UNSIGNED_INT,    // type
                null);              // data
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

            let depthFramebuffer = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, depthFramebuffer);
            gl.framebufferTexture2D(
                gl.FRAMEBUFFER,       // target
                gl.DEPTH_ATTACHMENT,  // attachment point
                gl.TEXTURE_2D,        // texture target
                depthTexture,         // texture
                0);                   // mip level

            // --------------------------------------------------
            // UNUSED TEXTURE

            // create a color texture of the same size as the depth texture
            // see article why this is needed_
            let unusedTexture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, unusedTexture);
            gl.texImage2D(
                gl.TEXTURE_2D,
                0,
                gl.RGBA,
                depthTextureSize,
                depthTextureSize,
                0,
                gl.RGBA,
                gl.UNSIGNED_BYTE,
                null,
            );

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

            // attach it to the framebuffer
            gl.framebufferTexture2D(
                gl.FRAMEBUFFER,        // target
                gl.COLOR_ATTACHMENT0,  // attachment point
                gl.TEXTURE_2D,         // texture target
                unusedTexture,         // texture
                0);
            res = pairOf(depthTexture, depthFramebuffer)
            this.#depthTB.set(gl, res)
        }

        return res
    }

    #lightDirection: NumberTrio = numberTrio(0, 0, 0)
    #sharedUniforms: SharedUniforms
    #lightPosition: Point3D = mutablePoint3D(0, 0, 100)
    #lightTarget: Point3D = mutablePoint3D(0, 0, 0)
    #lightUp: NumberTrio = numberTrio(0, 1, 0)
    #lightFov: Angle = radians(0)
    #spotlight: boolean = false
    #projWidth: number = 10
    #projHeight: number = 10
    #shadows: boolean = false

    #near: number = 1
    #far: number = 700

    constructor(sharedUniforms: SharedUniforms) {
        this.#sharedUniforms = sharedUniforms
    }

    #updateSharedUniforms() {
        this.#sharedUniforms.u_lightDirection = this.#lightDirection.toArray()
    }

    calculateLightWorldMatrix(): number[] {
        return M4.lookAt(
            [this.#lightPosition.getX(), this.#lightPosition.getY(), this.#lightPosition.getZ()],
            [this.#lightTarget.getX(), this.#lightTarget.getY(), this.#lightTarget.getZ()],
            [this.#lightUp.getFirst(), this.#lightUp.getSecond(), this.#lightUp.getThird()],
        );
    }

    calculateLightProjectionMatrix(): number[] {
        if(this.#spotlight) {
            return M4.perspective(this.#lightFov.getValueIn(AngleUnit.RAD),
                this.#projWidth / this.#projHeight, this.#near, this.#far)
        } else {
            return M4.orthographic(-this.#projWidth / 2, this.#projWidth / 2,
                -this.#projHeight / 2, this.#projHeight / 2, this.#near, this.#far)
        }
    }

    getLightDirection(): NumberTrio {
        return this.#lightDirection.clone()
    }

    getLightPosition(): Point3D {
        return this.#lightPosition.clone()
    }

    getLightTarget(): Point3D {
        return this.#lightTarget.clone()
    }

    getLightUp(): NumberTrio {
        return this.#lightUp.clone()
    }

    getFov(): Angle {
        return this.#lightFov.clone()
    }

    getNear(): number {
        return this.#near
    }

    getFar(): number {
        return this.#far
    }

    isSpotlight(): boolean {
        return this.#spotlight
    }

    getProjWidth(): number {
        return this.#projWidth
    }

    getProjHeight(): number {
        return this.#projHeight
    }

    setLightDirection(x: number, y: number, z: number): void
    setLightDirection(value: NumberTrio): void
    setLightDirection(x: number|NumberTrio, y?: number, z?: number): void {
        if(typeof x === "number") {
            this.#lightDirection.setAll(x, y, z)
        } else {
            this.#lightDirection.setAll(x.getFirst(), x.getSecond(), x.getThird())
        }
    }

    setLightPosition(x: number, y: number, z: number): void
    setLightPosition(value: Point3D): void
    setLightPosition(x: number|Point3D, y?: number, z?: number): void {
        if(typeof x === "number") {
            this.#lightPosition.set(x, y, z)
        } else {
            this.#lightPosition.set(x.getX(), x.getY(), x.getZ())
        }
        this.#updateSharedUniforms()
    }

    setLightTarget(x: number, y: number, z: number): void
    setLightTarget(value: Point3D): void
    setLightTarget(x: number|Point3D, y?: number, z?: number): void {
        if(typeof x === "number") {
            this.#lightTarget.set(x, y, z)
        } else {
            this.#lightTarget.set(x.getX(), x.getY(), x.getZ())
        }
    }

    setLightUp(x: number, y: number, z: number): void
    setLightUp(value: NumberTrio): void
    setLightUp(x: number|NumberTrio, y?: number, z?: number): void {
        if(typeof x === "number") {
            this.#lightUp.setAll(x, y, z)
        } else {
            this.#lightUp.setAll(x.getFirst(), x.getSecond(), x.getThird())
        }
    }

    setFov(value: Angle): void {
        this.#lightFov = value
    }

    setSpotlight(value: boolean): void {
        this.#spotlight = value
    }

    setProjWidth(value: number): void {
        this.#projWidth = value
    }

    setProjHeight(value: number): void {
        this.#projHeight = value
    }

    setShadows(value: boolean): void {
        this.#shadows = value
    }

    getShadows(): boolean {
        return this.#shadows
    }

    setNear(value: number): void {
        this.#near = value
    }

    setFar(value: number): void {
        this.#far = value
    }


}