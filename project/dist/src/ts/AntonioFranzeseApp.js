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
const menu_controls_1 = require("./controls/menu-controls");
const user_inputs_1 = require("./controls/user-inputs");
const L = 3;
log_1.Log.enableLog();
let MyApp = class MyApp extends webgl_application_1.WebGLApplication {
    constructor() {
        super();
    }
    beforeStart() {
        // Light Set up
        let light = this.getMeshObjectDrawer().getSlManager();
        light.setFar(200);
        light.setProjHeight(200);
        light.setProjWidth(200);
        light.setLightPosition(20, 20, 100);
        light.setLightTarget(20, 20, 0);
        light.setShadows(true);
        //Camera Set up
        let camera = this.getCamera();
        camera.setPosition(15, 0, 5);
        this.getMeshObjectDrawer().zFar = 700;
        camera.startFollowingObject(this.Furgoncino);
        this.menu = new menu_controls_1.MenuControls(this);
        this.menu.setup();
        this.userInputs = new user_inputs_1.UserInputs(this);
        this.userInputs.setTarget(this.Furgoncino);
        this.userInputs.attachHandlers();
    }
    main(args) {
        console.log("Hello world! [" + this.applicationName + "]");
        this.drawScene();
    }
};
__decorate([
    (0, webgl_application_1.WebGLMesh)("./assets/Consegna_fiori/Saviano2.obj")
], MyApp.prototype, "Saviano", void 0);
__decorate([
    (0, webgl_application_1.WebGLMesh)("./assets/Consegna_fiori/furgoncino.obj"),
    (0, webgl_application_1.ObjScale)(0.7, 0.7, 0.7),
    (0, webgl_application_1.ObjPosition)(0, 0, 1)
], MyApp.prototype, "Furgoncino", void 0);
MyApp = __decorate([
    (0, webgl_application_1.WebGL)("test-app", "my_Canvas", {
        main: ["vertex-shader", "fragment-shader"],
        color: ["color-vertex-shader", "color-fragment-shader"]
    })
], MyApp);
//# sourceMappingURL=AntonioFranzeseApp.js.map