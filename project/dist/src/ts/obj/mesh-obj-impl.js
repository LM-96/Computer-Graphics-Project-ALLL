"use strict";
var _MeshObjImpl_name, _MeshObjImpl_data, _MeshObjImpl_position, _MeshObjImpl_rotation, _MeshObjImpl_scale, _MeshObjImpl_limitChecker, _MeshObjImpl_callbacks;
Object.defineProperty(exports, "__esModule", { value: true });
const point_factory_1 = require("../geometry/point/point-factory");
const number_couple_1 = require("../types/numbers/number-couple");
const number_trio_1 = require("../types/numbers/number-trio");
const limits_checkers_1 = require("../geometry/limits/limits-checkers");
const array_mesh_object_callback_1 = require("./array-mesh-object-callback");
class MeshObjImpl {
    constructor() {
        /**
         * The name that identifies this mesh object
         */
        _MeshObjImpl_name.set(this, void 0);
        /**
         * The "mesh" data of this object.
         * It can be obtained, for example, loading ad '.obj' file using the 'loadMesh' function
         * provided by 'load_mesh.js'.
         * This object must have this interface:
         * ```
         * data = {
         *  mesh: ...,
         *  attributes: ...,
         *  numOfVertices: ...,
         *  uniforms: ...
         * }
         * ```
         */
        _MeshObjImpl_data.set(this, null
        /**
         * The position of this object considering the absolute reference system.
         * By default, it is set to the origin [position = (0, 0, 0)]
         */
        );
        /**
         * The position of this object considering the absolute reference system.
         * By default, it is set to the origin [position = (0, 0, 0)]
         */
        _MeshObjImpl_position.set(this, (0, point_factory_1.origin)(false, false)
        /**
         * The rotation of this object considering the absolute reference system.
         * By default, the object is unrotated [rotation = (0, 0)]
         */
        );
        /**
         * The rotation of this object considering the absolute reference system.
         * By default, the object is unrotated [rotation = (0, 0)]
         */
        _MeshObjImpl_rotation.set(this, (0, number_couple_1.numberCouple)(0, 0)
        /**
         * The scale of this object considering the absolute reference system.
         * By default, the object is unscaled [scale = (1, 1, 1)]
         */
        );
        /**
         * The scale of this object considering the absolute reference system.
         * By default, the object is unscaled [scale = (1, 1, 1)]
         */
        _MeshObjImpl_scale.set(this, (0, number_trio_1.numberTrio)(1, 1, 1)
        /**
         * The limits that constraint the movement of this object.
         * By default, the object has no limit [limits.type = "unlimited"]
         */
        );
        /**
         * The limits that constraint the movement of this object.
         * By default, the object has no limit [limits.type = "unlimited"]
         */
        _MeshObjImpl_limitChecker.set(this, limits_checkers_1.LimitsCheckers.unlimited()
        /**
         * A container for all the callbacks of this object about translation, rotation and scale
         */
        );
        /**
         * A container for all the callbacks of this object about translation, rotation and scale
         */
        _MeshObjImpl_callbacks.set(this, new array_mesh_object_callback_1.ArrayMeshObjectCallbackContainer());
    }
}
_MeshObjImpl_name = new WeakMap(), _MeshObjImpl_data = new WeakMap(), _MeshObjImpl_position = new WeakMap(), _MeshObjImpl_rotation = new WeakMap(), _MeshObjImpl_scale = new WeakMap(), _MeshObjImpl_limitChecker = new WeakMap(), _MeshObjImpl_callbacks = new WeakMap();
//# sourceMappingURL=mesh-obj-impl.js.map