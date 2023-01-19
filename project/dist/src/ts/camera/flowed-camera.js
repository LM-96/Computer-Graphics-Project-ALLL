"use strict";
var _FlowedCamera_position, _FlowedCamera_up, _FlowedCamera_target, _FlowedCamera_fov, _FlowedCamera_distanceFromTarget, _FlowedCamera_lookingAtObject, _FlowedCamera_followObjectTranslation, _FlowedCamera_targetObject, _FlowedCamera_positionFlow, _FlowedCamera_upFlow, _FlowedCamera_targetFlow, _FlowedCamera_fovFlow, _FlowedCamera_distanceFromTargetFlow, _FlowedCamera_lookingAtObjectFlow, _FlowedCamera_followObjectTranslationFlow, _FlowedCamera_targetObjectFlow;
Object.defineProperty(exports, "__esModule", { value: true });
const point_factory_1 = require("../geometry/point/point-factory");
class FlowedCamera {
    constructor() {
        _FlowedCamera_position.set(this, (0, point_factory_1.mutablePoint3D)(0, 0, 0));
        _FlowedCamera_up.set(this, void 0);
        _FlowedCamera_target.set(this, void 0);
        _FlowedCamera_fov.set(this, void 0);
        _FlowedCamera_distanceFromTarget.set(this, void 0);
        _FlowedCamera_lookingAtObject.set(this, void 0);
        _FlowedCamera_followObjectTranslation.set(this, void 0);
        _FlowedCamera_targetObject.set(this, void 0);
        _FlowedCamera_positionFlow.set(this, void 0);
        _FlowedCamera_upFlow.set(this, void 0);
        _FlowedCamera_targetFlow.set(this, void 0);
        _FlowedCamera_fovFlow.set(this, void 0);
        _FlowedCamera_distanceFromTargetFlow.set(this, void 0);
        _FlowedCamera_lookingAtObjectFlow.set(this, void 0);
        _FlowedCamera_followObjectTranslationFlow.set(this, void 0);
        _FlowedCamera_targetObjectFlow.set(this, void 0);
    }
}
exports.default = FlowedCamera;
_FlowedCamera_position = new WeakMap(), _FlowedCamera_up = new WeakMap(), _FlowedCamera_target = new WeakMap(), _FlowedCamera_fov = new WeakMap(), _FlowedCamera_distanceFromTarget = new WeakMap(), _FlowedCamera_lookingAtObject = new WeakMap(), _FlowedCamera_followObjectTranslation = new WeakMap(), _FlowedCamera_targetObject = new WeakMap(), _FlowedCamera_positionFlow = new WeakMap(), _FlowedCamera_upFlow = new WeakMap(), _FlowedCamera_targetFlow = new WeakMap(), _FlowedCamera_fovFlow = new WeakMap(), _FlowedCamera_distanceFromTargetFlow = new WeakMap(), _FlowedCamera_lookingAtObjectFlow = new WeakMap(), _FlowedCamera_followObjectTranslationFlow = new WeakMap(), _FlowedCamera_targetObjectFlow = new WeakMap();
//# sourceMappingURL=flowed-camera.js.map