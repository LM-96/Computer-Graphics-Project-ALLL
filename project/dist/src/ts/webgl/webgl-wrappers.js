"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedUniforms = void 0;
class SharedUniforms {
    constructor() {
        this.u_ambientLight = [0.2, 0.2, 0.2];
        this.u_colorLight = [1.0, 1.0, 1.0];
        this.u_view = M4.identity();
        this.u_projection = M4.identity();
    }
}
exports.SharedUniforms = SharedUniforms;
//# sourceMappingURL=webgl-wrappers.js.map