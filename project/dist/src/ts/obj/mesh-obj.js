"use strict";
var _MeshObj_name, _MeshObj_path, _MeshObj_data, _MeshObj_position;
Object.defineProperty(exports, "__esModule", { value: true });
const point_factory_1 = require("../geometry/point/point-factory");
class MeshObj {
    constructor() {
        _MeshObj_name.set(this, void 0);
        _MeshObj_path.set(this, void 0);
        _MeshObj_data.set(this, null);
        _MeshObj_position.set(this, (0, point_factory_1.origin)(false, false));
    }
}
_MeshObj_name = new WeakMap(), _MeshObj_path = new WeakMap(), _MeshObj_data = new WeakMap(), _MeshObj_position = new WeakMap();
//# sourceMappingURL=mesh-obj.js.map