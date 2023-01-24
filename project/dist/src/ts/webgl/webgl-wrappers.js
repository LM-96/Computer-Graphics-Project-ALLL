"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedUniforms = void 0;
class SharedUniforms {
    constructor() {
        this.u_ambientLight = [0.2, 0.2, 0.2];
        this.u_colorLight = [1.0, 1.0, 1.0];
        this.u_view = M4.identity();
        this.u_projection = M4.identity();
        this.u_lightDirection = [2, 2, 2];
        this.u_bias = 0.001;
        this.texture_matrix = M4.identity();
        this.u_projectedTexture = null;
        this.u_colorMult = [1, 1, 1, 1];
    }
}
exports.SharedUniforms = SharedUniforms;
//# sourceMappingURL=webgl-wrappers.js.map