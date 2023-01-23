import {MeshObject} from "./mesh-object";
import {Attributes, loadMesh, MeshData} from "./load-mesh-wrapper";
import {FlowedMeshObject} from "./flowed-mesh-object";
import SignalFlows, {SingleSignalFlow} from "../signals/flow";
import {MeshObjectSignals} from "./mesh-object-signals";
import {WebGLEnvironment} from "../webgl/webgl-environment";
import {Log} from "../log/log";

/**
 * A manager for the mesh object able to load them maintaining their data.
 * When an object is loaded using this manager, its MeshObject is saved into
 * an internal map and can be retrieved as needed simply calling the 'get' function
 */
export class MeshObjectManager {
    readonly applicationName: string
    #glEnvironment: WebGLEnvironment
    #objects: Map<string, MeshObject>
    #loadedObjectFlow: SingleSignalFlow<MeshObjectManager, MeshObject, void>

    constructor(applicationName: string, environment: WebGLEnvironment) {
        this.applicationName = applicationName
        this.#glEnvironment = environment
        this.#objects = new Map()
        this.#loadedObjectFlow = SignalFlows.newSingleFlow(MeshObjectSignals.OBJECT_LOADED_SIGNAL_STRING_NAME)
    }

    /**
     * Loads an '.obj' file using the 'load_mesh.js' and stores its data
     * into a MeshObject, saving it into the internal map of this manager.
     * The name is associated to the created object and can be used to retrieve
     * it when calling the 'get' function
     * @param {string} name the name associated to the object
     * @param {string} path the path of the '.obj' file
     * @returns the new MeshObject that is also stored into the manager
     */
    loadObj(name: string, path: string): MeshObject {
        Log.log("MeshObjectManager[" + this.applicationName + "] | loading object '" + name + "' from '" + path + "'")
        let data: any = loadObjX(this.#glEnvironment.getContext(), path)
        let res: MeshObject = new FlowedMeshObject(name, data)
        this.#objects.set(name, res)
        res.glInit(this.#glEnvironment.getContext())
        this.#loadedObjectFlow.fire(this, res)
        return res
    }

    /**
     * Loads a mesh object using the raw data passed as parameter and stores its
     * data into a MeshObject, saving it into the internal map of this manager.
     * The name is associated to the created object and can be used to retrieve
     * it when calling the 'get' function
     * @param {string} name the name associated to the object
     * @param {any} position the data about the position of the vertex
     * @param {any} texcoord the data about the texcoords
     * @param {any} normal the data about the normals
     * @param {any} indices the data about the indices
     * @returns the new MeshObject that is also stored into the manager
     */
    loadFromRawData(name: string, position: any, texcoord: any, normal: any, indices: any): MeshObject {
        let attributes: Attributes = {
            position: { data: position },
            texcoord: undefined,
            normal: undefined
        };

        if (texcoord != null) {
            attributes.texcoord = { data: texcoord };
        }
        if (normal != null) {
            attributes.normal = { data: normal };
        }
        if (indices != null) {
            attributes.indices = { data: indices };
        }
        let data: MeshData = {
            mesh: null,
            attributes: attributes,
            numVertices: undefined,
            uniforms: undefined
        };
        let meshObj = new FlowedMeshObject(name, data);
        this.#objects.set(name, meshObj);
        meshObj.glInit(this.#glEnvironment.getContext());
        this.#loadedObjectFlow.fire(this, meshObj);
        return meshObj;
    };

    /**
     * Returns the subscriber for the signal that is triggered every time a new object is loaded
     * @returns {SingleSignalFlow<MeshObjectManager, MeshObject, void>} the subscriber for the signal
     * that is triggered every time a new object is loaded
     */
    getLoadedObjectSubscriber(): SingleSignalFlow<MeshObjectManager, MeshObject, void> {
        return this.#loadedObjectFlow;
    }

    /**
     * Returns the MeshObject associated with the given name or 'undefined' if
     * no object is associated to it
     * @param {string} name the name associated to the object
     * @returns {MeshObject} the MeshObject associated with the given name or 'undefined' if
     * no object is associated to it
     */
    get(name: string): MeshObject {
        return this.#objects.get(name);
    };

    /**
     * Returns all the objects saved into this manager
     * @returns {Array<MeshObject>} all of the objects saved into this manager
     */
    getAll(): Array<MeshObject> {
        return new Array<MeshObject>(...this.#objects.values());
    }
}