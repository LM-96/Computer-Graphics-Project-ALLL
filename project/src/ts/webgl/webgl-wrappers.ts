import {WebGLApplication} from "./webgl-application";
import {MeshObjectManager} from "../obj/mesh-object-manager";

export interface ProgramInfo {
    program: WebGLProgram;
    attribLocations: any
    uniformLocations: any
}

export class SharedUniforms {
    u_ambientLight: Array<number> = [0.2, 0.2, 0.2]
    u_colorLight: Array<number> = [1.0, 1.0, 1.0]
    u_view: number[] = M4.identity()
    u_projection: number[] = M4.identity()
    u_limit: number = 20
    u_lightWorldPosition: number[] = [10, 10, 20];
    u_color : number[] = [0.2, 0.2, 0.2, 1]
    u_lightdirection: number[] = [0,0,1]
    mesh: number = 0.
    u_bias: number = 2
    lightWorldMatrix: number[] = M4.lookAt(
        [10, 10, 10],
        [0, 0, 0],
        [0, 1, 0],
    )
    u_reverseLightDirection: number[] = this.lightWorldMatrix.slice(8,11)
    u_textureMatrix: number[] = M4.multiply(
        M4.identity(),
        M4.inverse(this.lightWorldMatrix))
    //u_projectedTexture: WebGLTexture = WebGLApplication.prototype.environment.getCanvas().getContext("webgl").createTexture();

}