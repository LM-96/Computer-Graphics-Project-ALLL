export interface DataObject<T> {
    data: T
}

export interface Attributes {
    position: DataObject<any>
    texcoord: DataObject<any>
    normal: DataObject<any>
    indices?: DataObject<any>
}

export interface Uniforms {
    ambient: object
    diffuse: object
    specular: object
    emissive: object
    shininess: object
    opacity: object
    u_world?: any;
}

export interface MeshData {
    mesh: object
    attributes: Attributes
    numVertices: number
    uniforms: Uniforms
}

export function loadMesh(gl: WebGLRenderingContext, path: string): MeshData {
    return LoadMesh(gl, path)
}