"use strict";
var _MeshObj_name, _MeshObj_data, _MeshObj_position, _MeshObj_rotation, _MeshObj_scale, _MeshObj_limitChecker;
Object.defineProperty(exports, "__esModule", { value: true });
const point_factory_1 = require("../geometry/point/point-factory");
const number_couple_1 = require("../types/numbers/number-couple");
const number_trio_1 = require("../types/numbers/number-trio");
const limits_checkers_1 = require("../geometry/limits/limits-checkers");
class MeshObj {
    constructor() {
        /**
         * The name that identifies this mesh object
         */
        _MeshObj_name.set(this, void 0);
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
        _MeshObj_data.set(this, null
        /**
         * The position of this object considering the absolute reference system.
         * By default, it is set to the origin [position = (0, 0, 0)]
         */
        );
        /**
         * The position of this object considering the absolute reference system.
         * By default, it is set to the origin [position = (0, 0, 0)]
         */
        _MeshObj_position.set(this, (0, point_factory_1.origin)(false, false)
        /**
         * The rotation of this object considering the absolute reference system.
         * By default, the object is unrotated [rotation = (0, 0)]
         */
        );
        /**
         * The rotation of this object considering the absolute reference system.
         * By default, the object is unrotated [rotation = (0, 0)]
         */
        _MeshObj_rotation.set(this, (0, number_couple_1.numberCouple)(0, 0)
        /**
         * The scale of this object considering the absolute reference system.
         * By default, the object is unscaled [scale = (1, 1, 1)]
         */
        );
        /**
         * The scale of this object considering the absolute reference system.
         * By default, the object is unscaled [scale = (1, 1, 1)]
         */
        _MeshObj_scale.set(this, (0, number_trio_1.numberTrio)(1, 1, 1)
        /**
         * The limits that constraint the movement of this object.
         * By default, the object has no limit [limits.type = "unlimited"]
         */
        );
        /**
         * The limits that constraint the movement of this object.
         * By default, the object has no limit [limits.type = "unlimited"]
         */
        _MeshObj_limitChecker.set(this, limits_checkers_1.LimitsCheckers.unlimited());
    }
}
_MeshObj_name = new WeakMap(), _MeshObj_data = new WeakMap(), _MeshObj_position = new WeakMap(), _MeshObj_rotation = new WeakMap(), _MeshObj_scale = new WeakMap(), _MeshObj_limitChecker = new WeakMap();
//# sourceMappingURL=mesh-obj.js.map