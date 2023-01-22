"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const webgl_application_1 = require("./webgl/webgl-application");
const limits_checkers_1 = require("./geometry/limits/limits-checkers");
const log_1 = require("./log/log");
const options_1 = require("./signals/options");
const L = 3;
log_1.Log.enableLog();
let MyApp = class MyApp extends webgl_application_1.WebGLApplication {
    constructor() {
        super();
    }
    handler(signal) {
        console.log("Handler called (obj: " + signal.source.getName() + ", translation: " +
            signal.data.translationVector.toString() + ")");
    }
    main(args) {
        console.log("Hello world! [" + this.applicationName + "]");
        this.drawScene();
    }
};
__decorate([
    (0, webgl_application_1.WebGLMesh)("./assets/cubo_con_assi.obj"),
    (0, webgl_application_1.ObjPosition)(0, 0, 0.25),
    (0, webgl_application_1.ObjScale)(0.25, 0.25, 0.25),
    (0, webgl_application_1.ObjLimitsChecker)(limits_checkers_1.LimitsCheckers.linear(-L + 0.25, L - 0.25, -L + 0.25, L - 0.25, 3, 3))
], MyApp.prototype, "cube", void 0);
__decorate([
    (0, options_1.onSignal)("mesh-objects.cube.translation")
], MyApp.prototype, "handler", null);
MyApp = __decorate([
    (0, webgl_application_1.WebGL)("test-app", "my_Canvas", ["vertex-shader", "fragment-shader"])
], MyApp);
//# sourceMappingURL=test.js.map