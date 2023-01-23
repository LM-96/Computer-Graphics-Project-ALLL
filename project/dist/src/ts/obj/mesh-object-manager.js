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
var _MeshObjectManager_glEnvironment, _MeshObjectManager_objects, _MeshObjectManager_loadedObjectFlow;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeshObjectManager = void 0;
const flowed_mesh_object_1 = require("./flowed-mesh-object");
const flow_1 = require("../signals/flow");
const mesh_object_signals_1 = require("./mesh-object-signals");
const log_1 = require("../log/log");
/**
 * A manager for the mesh object able to load them maintaining their data.
 * When an object is loaded using this manager, its MeshObject is saved into
 * an internal map and can be retrieved as needed simply calling the 'get' function
 */
class MeshObjectManager {
    constructor(applicationName, environment) {
        _MeshObjectManager_glEnvironment.set(this, void 0);
        _MeshObjectManager_objects.set(this, void 0);
        _MeshObjectManager_loadedObjectFlow.set(this, void 0);
        this.applicationName = applicationName;
        __classPrivateFieldSet(this, _MeshObjectManager_glEnvironment, environment, "f");
        __classPrivateFieldSet(this, _MeshObjectManager_objects, new Map(), "f");
        __classPrivateFieldSet(this, _MeshObjectManager_loadedObjectFlow, flow_1.default.newSingleFlow(mesh_object_signals_1.MeshObjectSignals.OBJECT_LOADED_SIGNAL_STRING_NAME), "f");
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
    loadObj(name, path) {
        log_1.Log.log("MeshObjectManager[" + this.applicationName + "] | loading object '" + name + "' from '" + path + "'");
        let data = loadObjX(__classPrivateFieldGet(this, _MeshObjectManager_glEnvironment, "f").getContext(), path);
        let res = new flowed_mesh_object_1.FlowedMeshObject(name, data);
        __classPrivateFieldGet(this, _MeshObjectManager_objects, "f").set(name, res);
        res.glInit(__classPrivateFieldGet(this, _MeshObjectManager_glEnvironment, "f").getContext());
        __classPrivateFieldGet(this, _MeshObjectManager_loadedObjectFlow, "f").fire(this, res);
        return res;
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
    loadFromRawData(name, position, texcoord, normal, indices) {
        let attributes = {
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
        let data = {
            mesh: null,
            attributes: attributes,
            numVertices: undefined,
            uniforms: undefined
        };
        let meshObj = new flowed_mesh_object_1.FlowedMeshObject(name, data);
        __classPrivateFieldGet(this, _MeshObjectManager_objects, "f").set(name, meshObj);
        meshObj.glInit(__classPrivateFieldGet(this, _MeshObjectManager_glEnvironment, "f").getContext());
        __classPrivateFieldGet(this, _MeshObjectManager_loadedObjectFlow, "f").fire(this, meshObj);
        return meshObj;
    }
    ;
    /**
     * Returns the subscriber for the signal that is triggered every time a new object is loaded
     * @returns {SingleSignalFlow<MeshObjectManager, MeshObject, void>} the subscriber for the signal
     * that is triggered every time a new object is loaded
     */
    getLoadedObjectSubscriber() {
        return __classPrivateFieldGet(this, _MeshObjectManager_loadedObjectFlow, "f");
    }
    /**
     * Returns the MeshObject associated with the given name or 'undefined' if
     * no object is associated to it
     * @param {string} name the name associated to the object
     * @returns {MeshObject} the MeshObject associated with the given name or 'undefined' if
     * no object is associated to it
     */
    get(name) {
        return __classPrivateFieldGet(this, _MeshObjectManager_objects, "f").get(name);
    }
    ;
    /**
     * Returns all the objects saved into this manager
     * @returns {Array<MeshObject>} all of the objects saved into this manager
     */
    getAll() {
        return new Array(...__classPrivateFieldGet(this, _MeshObjectManager_objects, "f").values());
    }
}
exports.MeshObjectManager = MeshObjectManager;
_MeshObjectManager_glEnvironment = new WeakMap(), _MeshObjectManager_objects = new WeakMap(), _MeshObjectManager_loadedObjectFlow = new WeakMap();
//# sourceMappingURL=mesh-object-manager.js.map