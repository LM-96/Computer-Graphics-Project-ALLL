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
const SHADERS = {
    main: ["vertex-shader", "fragment-shader"],
    color: ["color-vertex-shader", "color-fragment-shader"]
};
let GothamApp = class GothamApp extends webgl_application_1.WebGLApplication {
    constructor() {
        super();
        this.userInputs = new user_inputs_1.UserInputs(this);
    }
    onMouseDown(e) {
        log_1.Log.log("WebGLApplication | capturing mouse down [event type: " + e.type + "]");
        this.userInputs.mouseDown(e);
    }
    onMouseUp(e) {
        log_1.Log.log("WebGLApplication | capturing mouse up [event type: " + e.type + "]");
        this.userInputs.mouseUp1(e);
    }
    onMouseMove(e) {
        log_1.Log.log("WebGLApplication | capturing mouse move [event type: " + e.type + "]");
        this.userInputs.mouseMove1(e);
    }
    onKeyDown(e) {
        log_1.Log.log("WebGLApplication | capturing key down [event type: " + e.type +
            ", key: " + e.key + "]");
        this.userInputs.keydownMap(e);
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
        camera.setPosition(25, 0, 20);
        this.getMeshObjectDrawer().zFar = 700;
        camera.startFollowingObject(this.batMoto);
        this.menu = new menu_controls_1.MenuControls(this);
        this.menu.setup();
        this.userInputs.setTarget(this.batMoto);
        this.userInputs.attachHandlers();
    }
    main(args) {
        console.log("Hello world! [" + this.applicationName + "]");
        this.renderScene();
        this.renderScene();
    }
};
__decorate([
    (0, webgl_application_1.WebGLMesh)("./assets/objs/city_marchegiani.obj"),
    (0, webgl_application_1.ObjScale)(0.7, 0.7, 0.7)
], GothamApp.prototype, "world", void 0);
__decorate([
    (0, webgl_application_1.WebGLMesh)("./assets/objs/batmoto.obj"),
    (0, webgl_application_1.ObjPosition)(0, 0, 1),
    (0, webgl_application_1.ObjScale)(0.3, 0.3, 0.3)
], GothamApp.prototype, "batMoto", void 0);
__decorate([
    (0, webgl_application_1.OnCanvasTouchEvent)("mousedown"),
    (0, webgl_application_1.OnCanvasTouchEvent)("touchstart")
], GothamApp.prototype, "onMouseDown", null);
__decorate([
    (0, webgl_application_1.OnCanvasMouseEvent)("mouseup"),
    (0, webgl_application_1.OnCanvasTouchEvent)("touchend"),
    (0, webgl_application_1.OnCanvasMouseEvent)("mouseout")
], GothamApp.prototype, "onMouseUp", null);
__decorate([
    (0, webgl_application_1.OnCanvasMouseEvent)("mousemove"),
    (0, webgl_application_1.OnCanvasTouchEvent)("touchmove")
], GothamApp.prototype, "onMouseMove", null);
__decorate([
    (0, webgl_application_1.OnKeyboardEvent)("keydown")
], GothamApp.prototype, "onKeyDown", null);
GothamApp = __decorate([
    (0, webgl_application_1.WebGL)("gotham-app", "my_Canvas", SHADERS)
], GothamApp);
//# sourceMappingURL=LucaMarchegianiApp.js.map