export interface MeshData {

}

export interface Mesh {
}


export function loadMesh(gl: WebGLRenderingContext, path: string): any {
    return LoadMesh(gl, path)
}