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
    u_lightDirection: Array<number> = [2, 2, 2]
    u_bias: number = 0.001
    texture_matrix: number[] = M4.identity()
    u_projectedTexture: WebGLTexture | null = null
    u_colorMult: number[] = [1, 1, 1, 1]
}