"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const webgl_application_1 = require("./webgl/webgl-application");
const log_1 = require("./log/log");
const menu_controls_1 = require("./controls/menu_controls");
const L = 3;
log_1.Log.enableLog();
let MyApp = class MyApp extends webgl_application_1.WebGLApplication {
    constructor() {
        super();
    }
    main(args) {
        console.log("Hello world! [" + this.applicationName + "]");
        this.menu = new menu_controls_1.MenuControls(this);
        this.menu.setup();
        this.drawScene();
    }
};
__decorate([
    (0, webgl_application_1.WebGLMesh)("./assets/LuchettoObj/world_decimate.obj")
], MyApp.prototype, "world", void 0);
__decorate([
    (0, webgl_application_1.WebGLMesh)("./assets/LuchettoObj/truck_final.obj")
], MyApp.prototype, "helmet", void 0);
MyApp = __decorate([
    (0, webgl_application_1.WebGL)("test-app", "my_Canvas", ["vertex-shader", "fragment-shader"])
], MyApp);
//# sourceMappingURL=test.js.map