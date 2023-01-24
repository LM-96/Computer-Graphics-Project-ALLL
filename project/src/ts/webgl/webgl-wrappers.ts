import {WebGLApplication} from "./webgl-application";
import {MeshObjectManager} from "../obj/mesh-object-manager";
import {WebGLEnvironment} from "./webgl-environment";
import {deg2Rad} from "../geometry/angle/angle";

export interface ProgramInfo {
    program: WebGLProgram;
    attribLocations: any
    uniformLocations: any
}

export class SharedUniforms {
    constructor(gl: WebGLRenderingContext, cameraMatrix: number[]) {
        let texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(
            gl.TEXTURE_2D,      // target
            0,                  // mip level
            gl.DEPTH_COMPONENT, // internal format
            512,   // width
            512,   // height
            0,                  // border
            gl.DEPTH_COMPONENT, // format
            gl.UNSIGNED_INT,    // type
            null);              // data
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        this.u_projectedTexture = texture
        this.u_viewWorldPosition = cameraMatrix.slice(12, 15);
    }

    u_ambientLight: Array<number> = [0.2, 0.2, 0.2]
    u_colorLight: Array<number> = [1.0, 1.0, 1.0]
    u_view: number[] = M4.identity()
    u_projection: number[] = M4.identity()
    u_limit: number = 20
    u_lightWorldPosition: number[] = [10, 10, 20];
    u_color : number[] = [0.2, 0.2, 0.2, 1]
    u_lightDirection: number[] = [2,2,2]
    mesh: number = 0.
    u_bias: number = -0.01
    lightWorldMatrix: number[] = M4.lookAt(
        [10, 10, 10],
        [0, 0, 0],
        [0, 1, 0],
    )
    u_reverseLightDirection: number[] = this.lightWorldMatrix.slice(8,11)
    u_textureMatrix: number[] = M4.multiply(
        M4.identity(),
        M4.inverse(this.lightWorldMatrix))
    u_projectedTexture
    u_shininess: number = 150
    u_innerLimit: number = Math.cos(deg2Rad(100 / 2 - 10))
    u_outerLimit: number = Math.cos(deg2Rad(100 / 2))
    u_viewWorldPosition
}